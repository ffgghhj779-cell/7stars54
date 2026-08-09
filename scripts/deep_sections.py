# -*- coding: utf-8 -*-
"""Deep per-section extract for 7thstarfood product tree."""

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
OUT = ROOT / "content" / "wuilt-export" / "sections"
OUT.mkdir(parents=True, exist_ok=True)

BASE = "https://7thstarfood.com"
UA = {"User-Agent": "Mozilla/5.0", "Accept-Language": "ar,en;q=0.9"}

# Exact nav tree from live site screenshot + known submenus
SECTIONS = [
    {"slug": "products-hub", "title": "منتجاتنا", "paths": ["/منتجاتنا"]},
    {"slug": "fresh-fruits", "title": "الفواكة الطازجة", "paths": ["/فواكة-طازجة"]},
    {
        "slug": "meat",
        "title": "اللحوم",
        "paths": ["/اللحوم"],
        "children": [
            {"slug": "frozen-chicken", "title": "الدجاج المجمد", "paths": ["/الدجاج-المجمد"]},
            {
                "slug": "buffalo",
                "title": "للحوم البافلو",
                "paths": ["/للحوم-البافلو", "/اللحوم-البافلو"],
            },
            {
                "slug": "seafood",
                "title": "منتجات للحوم الأسماك والأحياء البحرية",
                "paths": [
                    "/منتجات-للحوم-الأسماك-والأحياء-البحرية",
                    "/منتجات للحوم الأسماك والأحياء البحرية",
                ],
            },
            {"slug": "sawakni", "title": "السواكني", "paths": ["/السواكني"]},
        ],
    },
    {
        "slug": "grains",
        "title": "الحبوب",
        "paths": ["/الحبوب"],
        "children": [
            {"slug": "sesame", "title": "السمسم", "paths": ["/السمسم"]},
            {"slug": "rice", "title": "الأرز", "paths": ["/الأرز"]},
        ],
    },
    {"slug": "vegetables", "title": "الخضروات الطازجة", "paths": ["/الخضروات"]},
    {
        "slug": "frozen-produce",
        "title": "خضروات و فواكة مجمده",
        "paths": ["/خضروات-وفواكة-مجمدة"],
    },
    {
        "slug": "frozen-fries",
        "title": "بطاطس مجمدة نصف مقلية",
        "paths": ["/بطاطس مجمدة نصف مقلية", "/بطاطس-مجمدة-نصف-مقلية"],
    },
    {"slug": "eggs", "title": "بيض الدجاج", "paths": ["/بيض-الدجاج"]},
    {"slug": "oils", "title": "زيوت الطبخ", "paths": ["/زيوت-الطبخ"]},
    {"slug": "cashew", "title": "كاجو مملح", "paths": ["/كاجو مملح", "/كاجو-مملح"]},
    {"slug": "membership", "title": "العضوية", "paths": ["/العضوية", "/عضوية"]},
    {"slug": "about", "title": "من نحن", "paths": ["/من-نحن"]},
    {"slug": "contact", "title": "تواصل معنا", "paths": ["/تواصل معنا", "/تواصل-معنا"]},
    {"slug": "home", "title": "الرئيسية", "paths": ["/"]},
]


def abs_url(path: str) -> str:
    parts = path.split("/")
    quoted = "/".join(urllib.parse.quote(p, safe="") if p else "" for p in parts)
    return BASE + quoted


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
            s = bytes(raw, "utf-8").decode("unicode_escape")
        except Exception:
            s = raw
        out.append(s.replace('\\"', '"'))
    return out


def strip_tags(html_frag: str) -> str:
    t = unescape(html_frag)
    t = re.sub(r"(?is)<br\s*/?>", "\n", t)
    t = re.sub(r"(?is)</p>", "\n", t)
    t = re.sub(r"(?is)</div>", "\n", t)
    t = re.sub(r"(?is)<[^>]+>", " ", t)
    t = t.replace("\xa0", " ").replace("&nbsp;", " ")
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r"\n+", "\n", t)
    return t.strip()


def extract_images(html: str) -> list[str]:
    found = set(
        re.findall(
            r"https://assets\.wuiltweb\.com/\d+/[^\"'\\\s>]+\.(?:png|jpg|jpeg|webp|gif)",
            html,
            flags=re.I,
        )
    )
    # filter out tiny icons / chat / social if possible later — keep all for now
    return sorted(found)


def extract_detail_blocks(chunks: list[str]) -> list[dict]:
    blocks: list[dict] = []
    keys = (
        "الأصناف",
        "الاصناف",
        "التعبئة",
        "التعبة",
        "المواصفات",
        "الحجم",
        "النقل",
        "التخزين",
        "حاوية",
        "سعة",
        "معايير",
        "الصلاحية",
        "درجة",
    )
    skip = re.compile(
        r"(seventh-star-premium|fonts\.googleapis|opacity:|GTM-|دجاج مجمد, فواكة)",
        re.I,
    )
    for c in chunks:
        if skip.search(c):
            continue
        if "<" not in c:
            continue
        if not any(k in c for k in keys) and "شركة" not in c and "نحن" not in c:
            # still keep long arabic product paragraphs
            plain_probe = strip_tags(c)
            if not (len(plain_probe) > 80 and re.search(r"[\u0600-\u06FF]", plain_probe)):
                continue
        plain = strip_tags(c)
        if len(plain) < 30:
            continue
        if skip.search(plain):
            continue
        lines = [ln.strip(" :") for ln in plain.split("\n") if ln.strip()]
        # dedupe consecutive
        clean: list[str] = []
        for ln in lines:
            if ln and (not clean or clean[-1] != ln):
                clean.append(ln)
        if len(" ".join(clean)) < 30:
            continue
        title = clean[0][:80]
        body = clean[1:] if len(clean) > 1 else clean
        blocks.append({"title": title, "lines": body[:40]})
    # dedupe by title+first line
    uniq: list[dict] = []
    seen: set[str] = set()
    for b in blocks:
        key = b["title"] + "|" + (b["lines"][0] if b["lines"] else "")
        if key in seen:
            continue
        seen.add(key)
        uniq.append(b)
    return uniq[:12]


def extract_headings(html: str, chunks: list[str]) -> list[str]:
    heads: list[str] = []
    for m in re.findall(r"<title>(.*?)</title>", html, flags=re.I | re.S):
        t = strip_tags(m)
        if t:
            heads.append(t)
    for c in chunks:
        for m in re.findall(
            r"<h[1-3][^>]*>(.*?)</h[1-3]>",
            c,
            flags=re.I | re.S,
        ):
            t = strip_tags(m)
            if t and t not in heads:
                heads.append(t)
        # strong green titles often used on Wuilt
        for m in re.findall(
            r"<strong>([^<]{3,80})</strong>",
            c,
        ):
            t = strip_tags(m)
            if t and re.search(r"[\u0600-\u06FF]", t) and t not in heads:
                if t not in {"الأصناف", "الاصناف", "التعبئة", "التعبة القياسية"}:
                    continue
                heads.append(t)
    return heads


def scrape_node(node: dict) -> dict:
    result = {
        "slug": node["slug"],
        "title": node["title"],
        "resolved_url": None,
        "ok": False,
        "not_found": False,
        "title_tag": "",
        "images": [],
        "blocks": [],
        "headings": [],
        "children": [],
    }
    html = None
    used = None
    for path in node["paths"]:
        url = abs_url(path)
        print("GET", node["slug"], url)
        html = fetch(url)
        time.sleep(0.35)
        if not html:
            continue
        used = url
        if "لم نجد هذه الصفحة" in html:
            result["not_found"] = True
            continue
        result["not_found"] = False
        break

    if not html or result["not_found"]:
        # keep last attempt info
        if used:
            result["resolved_url"] = used
        return result

    chunks = decode_chunks(html)
    images = extract_images(html)
    # drop common chrome icons if duplicated everywhere
    chrome = {
        "051920230400056466f44550c07.png",
        "06062023184534647f7ecebab50.png",
        "070520261749366a4a993087b3c.png",
    }
    content_imgs = [i for i in images if i.rstrip("/").split("/")[-1] not in chrome]

    result.update(
        {
            "ok": True,
            "resolved_url": used,
            "title_tag": (extract_headings(html, chunks)[:1] or [""])[0],
            "images": content_imgs or images,
            "all_images": images,
            "blocks": extract_detail_blocks(chunks),
            "headings": extract_headings(html, chunks),
            "html_len": len(html),
        }
    )

    for child in node.get("children", []):
        result["children"].append(scrape_node(child))
    return result


def main() -> None:
    tree = []
    for section in SECTIONS:
        tree.append(scrape_node(section))

    payload = {
        "base": BASE,
        "exported_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "sections": tree,
    }
    out_json = OUT / "deep-sections.json"
    out_json.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    # markdown report
    lines = ["# Deep section extract", ""]
    for s in tree:
        lines.append(f"## {s['title']} (`{s['slug']}`)")
        lines.append(f"- url: {s.get('resolved_url')}")
        lines.append(f"- ok: {s.get('ok')} not_found: {s.get('not_found')}")
        lines.append(f"- images: {len(s.get('images') or [])}")
        for img in s.get("images") or []:
            lines.append(f"  - {img}")
        for b in s.get("blocks") or []:
            lines.append(f"### {b['title']}")
            for ln in b["lines"][:20]:
                lines.append(f"- {ln}")
        for c in s.get("children") or []:
            lines.append(f"### CHILD {c['title']} (`{c['slug']}`)")
            lines.append(f"- url: {c.get('resolved_url')} ok={c.get('ok')} 404={c.get('not_found')}")
            for img in c.get("images") or []:
                lines.append(f"  - {img}")
            for b in c.get("blocks") or []:
                lines.append(f"#### {b['title']}")
                for ln in b["lines"][:20]:
                    lines.append(f"- {ln}")
        lines.append("")

    (OUT / "deep-sections.md").write_text("\n".join(lines), encoding="utf-8")
    print("wrote", out_json)


if __name__ == "__main__":
    main()
