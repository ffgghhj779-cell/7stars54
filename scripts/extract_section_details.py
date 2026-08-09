# -*- coding: utf-8 -*-
"""Extract rich text/detail blocks from each section page HTML."""

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
SECTIONS_JSON = ROOT / "content" / "wuilt-export" / "sections" / "deep-sections.json"
OUT = ROOT / "content" / "wuilt-export" / "sections" / "section-details.json"

UA = {"User-Agent": "Mozilla/5.0"}


def fetch(url: str) -> str | None:
    req = urllib.request.Request(url, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=90, context=CTX) as res:
            return res.read().decode("utf-8", "replace")
    except Exception as exc:  # noqa: BLE001
        print("FAIL", url, exc)
        return None


def decode_chunks(html: str) -> list[str]:
    out: list[str] = []
    for m in re.finditer(r'self\.__next_f\.push\(\[1,"((?:\\.|[^"\\])*)"\]\)', html):
        raw = m.group(1)
        try:
            s = raw.encode("utf-8").decode("unicode_escape")
        except Exception:
            try:
                s = bytes(raw, "utf-8").decode("unicode_escape")
            except Exception:
                s = raw
        s = s.replace('\\"', '"').replace("\\n", "\n").replace("\\/", "/")
        out.append(s)
    return out


def strip_tags(html_frag: str) -> str:
    t = unescape(html_frag)
    t = re.sub(r"(?is)<br\s*/?>", "\n", t)
    t = re.sub(r"(?is)</p>", "\n", t)
    t = re.sub(r"(?is)</li>", "\n", t)
    t = re.sub(r"(?is)<[^>]+>", " ", t)
    t = t.replace("\xa0", " ")
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r"\n+", "\n", t)
    return t.strip()


def is_noise(text: str) -> bool:
    if "seventh-star-premium" in text or "fonts.googleapis" in text:
        return True
    if text.count(",") > 40 and "هايبر" in text:
        return True
    if "دجاج مجمد, فواكة, خضروات" in text:
        return True
    if "opacity:" in text or "font-family" in text:
        return True
    return False


def extract_blocks(chunks: list[str]) -> list[dict]:
    blocks: list[dict] = []
    for c in chunks:
        if "<p" not in c and "<strong" not in c and "<h" not in c.lower():
            continue
        if is_noise(c):
            continue
        plain = strip_tags(c)
        if len(plain) < 40:
            continue
        if is_noise(plain):
            continue
        if not re.search(r"[\u0600-\u06FF]", plain):
            continue
        lines = [ln.strip(" :\u200f\u200e") for ln in plain.split("\n") if ln.strip()]
        clean: list[str] = []
        for ln in lines:
            if len(ln) < 2:
                continue
            if clean and clean[-1] == ln:
                continue
            clean.append(ln)
        if len(" ".join(clean)) < 40:
            continue
        title = clean[0][:100]
        body = clean[1:] if len(clean) > 1 else clean
        blocks.append({"title": title, "lines": body[:50]})

    uniq: list[dict] = []
    seen: set[str] = set()
    for b in blocks:
        key = (b["title"] + "|" + "|".join(b["lines"][:3]))[:200]
        if key in seen:
            continue
        seen.add(key)
        uniq.append(b)
    return uniq


def walk(nodes: list[dict]) -> list[dict]:
    flat: list[dict] = []
    for n in nodes:
        flat.append(n)
        flat.extend(walk(n.get("children") or []))
    return flat


def main() -> None:
    data = json.loads(SECTIONS_JSON.read_text(encoding="utf-8"))
    results = []
    for node in walk(data["sections"]):
        url = node.get("resolved_url")
        if not url or not node.get("ok"):
            results.append(
                {
                    "slug": node["slug"],
                    "title": node["title"],
                    "ok": False,
                    "blocks": [],
                    "images": node.get("images") or [],
                }
            )
            continue
        print("DETAIL", node["slug"], url)
        html = fetch(url)
        time.sleep(1.2)  # avoid 429
        if not html:
            results.append(
                {
                    "slug": node["slug"],
                    "title": node["title"],
                    "ok": False,
                    "blocks": [],
                    "images": node.get("images") or [],
                }
            )
            continue
        chunks = decode_chunks(html)
        blocks = extract_blocks(chunks)
        results.append(
            {
                "slug": node["slug"],
                "title": node["title"],
                "ok": True,
                "url": url,
                "images": node.get("images") or [],
                "blocks": blocks,
                "chunk_count": len(chunks),
            }
        )
        print("  blocks", len(blocks))

    OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    md = ["# Section details", ""]
    for r in results:
        md.append(f"## {r['title']} (`{r['slug']}`)")
        md.append(f"ok={r.get('ok')} blocks={len(r.get('blocks') or [])}")
        for img in r.get("images") or []:
            md.append(f"- IMG {img}")
        for b in r.get("blocks") or []:
            md.append(f"### {b['title']}")
            for ln in b["lines"]:
                md.append(f"- {ln}")
        md.append("")
    OUT.with_suffix(".md").write_text("\n".join(md), encoding="utf-8")
    print("wrote", OUT)


if __name__ == "__main__":
    main()
