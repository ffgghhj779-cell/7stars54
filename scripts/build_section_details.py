# -*- coding: utf-8 -*-
"""Decode Wuilt page payloads into clean section details + all image hosts."""

from __future__ import annotations

import json
import re
import ssl
import time
import urllib.parse
import urllib.request
from html import unescape
from pathlib import Path

CTX = ssl._create_unverified_context()
ROOT = Path(__file__).resolve().parents[1]
SECTIONS = ROOT / "content" / "wuilt-export" / "sections" / "deep-sections.json"
OUT = ROOT / "content" / "wuilt-export" / "sections" / "section-details.json"
MEDIA = ROOT / "public" / "media" / "wuilt"
MEDIA.mkdir(parents=True, exist_ok=True)

UA = {"User-Agent": "Mozilla/5.0"}


def decode_u(s: str) -> str:
    return re.sub(r"\\u([0-9a-fA-F]{4})", lambda m: chr(int(m.group(1), 16)), s)


def strip_tags(html_frag: str) -> str:
    t = unescape(html_frag)
    t = re.sub(r"(?is)<br\s*/?>", "\n", t)
    t = re.sub(r"(?is)</p>", "\n", t)
    t = re.sub(r"(?is)<[^>]+>", " ", t)
    t = t.replace("\xa0", " ")
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r"\n+", "\n", t)
    return t.strip()


def is_noise(text: str) -> bool:
    if "دجاج مجمد, فواكة, خضروات" in text:
        return True
    if text.count(",") > 35 and "هايبر" in text:
        return True
    if "seventh-star-premium" in text or "fonts.googleapis" in text:
        return True
    if "الرئيسية" in text and "منتجاتنا" in text and "تواصل معنا" in text and len(text) < 400:
        return True
    return False


def extract_images(raw: str, decoded: str) -> list[str]:
    imgs = set()
    for src in (raw, decoded):
        imgs.update(
            re.findall(
                r"https://(?:assets\.wuiltweb\.com|d2pi0n2fm836iz\.cloudfront\.net)/\d+/[^\"'\\\s>]+\.(?:png|jpg|jpeg|webp|gif)",
                src,
                flags=re.I,
            )
        )
    chrome = {
        "051920230400056466f44550c07.png",
        "06062023184534647f7ecebab50.png",
        "070520261749366a4a993087b3c.png",
    }
    ordered = []
    for i in sorted(imgs):
        name = i.rstrip("/").split("/")[-1]
        if name in chrome:
            continue
        ordered.append(i)
    return ordered


def extract_blocks(decoded: str) -> list[dict]:
    blocks: list[dict] = []
    paras = re.findall(r"<p[^>]*>(.*?)</p>", decoded, flags=re.I | re.S)
    # also h2 product titles nearby
    for p in paras:
        plain = strip_tags(p)
        if len(plain) < 25:
            continue
        if not re.search(r"[\u0600-\u06FF]", plain):
            continue
        if is_noise(plain):
            continue
        lines = [ln.strip(" :") for ln in plain.split("\n") if ln.strip()]
        clean: list[str] = []
        for ln in lines:
            if clean and clean[-1] == ln:
                continue
            # drop leftover escape junk
            ln = ln.replace('\\"', '"').replace("\\n", " ").strip()
            if len(ln) >= 2:
                clean.append(ln)
        if len(" ".join(clean)) < 25:
            continue
        blocks.append({"title": clean[0][:120], "lines": clean[1:] if len(clean) > 1 else clean})

    # headings that look like product names
    for h in re.findall(r"<h2[^>]*>(.*?)</h2>", decoded, flags=re.I | re.S):
        t = strip_tags(h)
        if 2 < len(t) < 60 and re.search(r"[\u0600-\u06FF]", t):
            if t not in {b["title"] for b in blocks}:
                blocks.append({"title": t, "lines": [t]})

    uniq: list[dict] = []
    seen: set[str] = set()
    for b in blocks:
        key = b["title"] + "|" + "|".join(b["lines"][:2])
        if key in seen:
            continue
        seen.add(key)
        uniq.append(b)
    return uniq


def fetch(url: str) -> str | None:
    req = urllib.request.Request(url, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=90, context=CTX) as res:
            return res.read().decode("utf-8", "replace")
    except Exception as exc:  # noqa: BLE001
        print("FAIL", url, exc)
        return None


def download(url: str) -> str | None:
    name = url.rstrip("/").split("/")[-1]
    dest = MEDIA / name
    if dest.exists() and dest.stat().st_size > 500:
        return f"/media/wuilt/{name}"
    req = urllib.request.Request(url, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=90, context=CTX) as res:
            dest.write_bytes(res.read())
        return f"/media/wuilt/{name}"
    except Exception as exc:  # noqa: BLE001
        print("DL FAIL", url, exc)
        return None


def walk(nodes: list[dict]) -> list[dict]:
    out: list[dict] = []
    for n in nodes:
        out.append(n)
        out.extend(walk(n.get("children") or []))
    return out


def main() -> None:
    data = json.loads(SECTIONS.read_text(encoding="utf-8"))
    results = []
    for node in walk(data["sections"]):
        url = node.get("resolved_url")
        item = {
            "slug": node["slug"],
            "title": node["title"],
            "ok": False,
            "url": url,
            "images": [],
            "local_images": [],
            "blocks": [],
        }
        if not url or not node.get("ok"):
            results.append(item)
            continue
        print("GET", node["slug"])
        html = fetch(url)
        time.sleep(1.0)
        if not html:
            results.append(item)
            continue
        decoded = decode_u(html)
        images = extract_images(html, decoded)
        local = []
        for img in images:
            p = download(img)
            if p:
                local.append(p)
        blocks = extract_blocks(decoded)
        item.update(
            {
                "ok": True,
                "images": images,
                "local_images": local,
                "blocks": blocks,
            }
        )
        print(f"  images={len(images)} blocks={len(blocks)}")
        results.append(item)

    OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    md = ["# Section details (decoded)", ""]
    for r in results:
        md.append(f"## {r['title']} (`{r['slug']}`)")
        md.append(f"ok={r['ok']} images={len(r['images'])} blocks={len(r['blocks'])}")
        for img in r["local_images"]:
            md.append(f"- {img}")
        for b in r["blocks"]:
            md.append(f"### {b['title']}")
            for ln in b["lines"][:30]:
                md.append(f"- {ln}")
        md.append("")
    OUT.with_suffix(".md").write_text("\n".join(md), encoding="utf-8")
    print("wrote", OUT)


if __name__ == "__main__":
    main()
