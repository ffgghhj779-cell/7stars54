# -*- coding: utf-8 -*-
"""Full extract of 7thstarfood.com (Wuilt) into structured JSON + image list."""

from __future__ import annotations

import json
import re
import ssl
import time
import urllib.error
import urllib.parse
import urllib.request
from html import unescape
from pathlib import Path

CTX = ssl._create_unverified_context()
ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "content" / "wuilt-export"
OUT_DIR.mkdir(parents=True, exist_ok=True)

BASE = "https://7thstarfood.com"

# Known paths from live nav (encoded carefully)
KNOWN_PATHS = [
    "/",
    "/من-نحن",
    "/منتجاتنا",
    "/فواكة-طازجة",
    "/اللحوم",
    "/الدجاج-المجمد",
    "/اللحوم-البافلو",
    "/منتجات-للحوم-الأسماك-والأحياء-البحرية",
    "/السواكني",
    "/الحبوب",
    "/السمسم",
    "/الأرز",
    "/الخضروات",
    "/خضروات-وفواكة-مجمدة",
    "/بطاطس مجمدة نصف مقلية",
    "/بيض-الدجاج",
    "/زيوت-الطبخ",
    "/كاجو مملح",
    "/تواصل معنا",
]

# Also try hyphenated / encoded variants for broken space URLs
EXTRA_PATHS = [
    "/بطاطس-مجمدة-نصف-مقلية",
    "/كاجو-مملح",
    "/تواصل-معنا",
]

UA = {
    "User-Agent": "Mozilla/5.0 (compatible; 7thStarExporter/1.0)",
    "Accept-Language": "ar,en;q=0.8",
}


def fetch(url: str) -> str | None:
    req = urllib.request.Request(url, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=90, context=CTX) as res:
            return res.read().decode("utf-8", "replace")
    except Exception as exc:  # noqa: BLE001
        print(f"FAIL {url}: {exc}")
        return None


def abs_url(path: str) -> str:
    if path.startswith("http"):
        return path
    # urllib quote path segments but keep slashes
    parts = path.split("/")
    quoted = "/".join(urllib.parse.quote(p, safe="") if p else "" for p in parts)
    return BASE + quoted


def decode_next_chunks(html: str) -> list[str]:
    chunks: list[str] = []
    for m in re.finditer(r'self\.__next_f\.push\(\[1,"((?:\\.|[^"\\])*)"\]\)', html):
        raw = m.group(1)
        try:
            s = bytes(raw, "utf-8").decode("unicode_escape")
        except Exception:
            s = raw
        s = s.replace('\\"', '"').replace("\\n", "\n")
        chunks.append(s)
    return chunks


def strip_tags(html_frag: str) -> str:
    t = unescape(html_frag)
    t = re.sub(r"(?is)<script.*?>.*?</script>", " ", t)
    t = re.sub(r"(?is)<style.*?>.*?</style>", " ", t)
    t = re.sub(r"(?is)<br\s*/?>", "\n", t)
    t = re.sub(r"(?is)</p>", "\n", t)
    t = re.sub(r"(?is)<[^>]+>", " ", t)
    t = t.replace("\xa0", " ").replace("&nbsp;", " ")
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r"\n\s*\n+", "\n", t)
    return t.strip()


def extract_images(html: str) -> list[str]:
    imgs = set(
        re.findall(
            r"https://assets\.wuiltweb\.com/\d+/[^\"'\\\s>]+\.(?:png|jpg|jpeg|webp|gif)",
            html,
            flags=re.I,
        )
    )
    # also from next chunks escaped
    for m in re.findall(
        r"https:\\?/\\?/assets\.wuiltweb\.com\\?/\d+\\?/[^\"'\\\s>]+\.(?:png|jpg|jpeg|webp|gif)",
        html,
        flags=re.I,
    ):
        imgs.add(m.replace("\\/", "/").replace("\\", ""))
    return sorted(imgs)


def extract_internal_links(html: str) -> list[str]:
    hrefs = set()
    for m in re.findall(r'href="(/[^"#?]*)"', html):
        if m.startswith("/_next"):
            continue
        hrefs.add(urllib.parse.unquote(m))
    return sorted(hrefs)


def extract_title(html: str) -> str:
    m = re.search(r"<title>(.*?)</title>", html, flags=re.I | re.S)
    if m:
        return strip_tags(m.group(1))
    return ""


def meaningful_texts(chunks: list[str], html: str) -> list[str]:
    texts: list[str] = []
    skip_re = re.compile(
        r"(seventh-star-premium|fonts\.googleapis|__next_f|GTM-|googletagmanager|opacity:|font-family)",
        re.I,
    )
    for c in chunks:
        if skip_re.search(c):
            continue
        if "<" in c and ("أصناف" in c or "الاصناف" in c or "تعبئة" in c or "مواصفات" in c or "حاوية" in c or "الحجم" in c or "النقل" in c or "منتجات" in c or "شركة" in c or "تواصل" in c or "عنوان" in c):
            plain = strip_tags(c)
            if len(plain) > 25:
                texts.append(plain)
        elif re.search(r"[\u0600-\u06FF]{4,}", c) and "<" not in c[:20]:
            plain = strip_tags(c)
            if 8 < len(plain) < 800 and plain not in texts:
                if not skip_re.search(plain):
                    texts.append(plain)

    # direct arabic nodes
    for t in re.findall(r">([^<]*[\u0600-\u06FF][^<]{3,240})<", html):
        t = " ".join(unescape(t).split())
        if len(t) < 6:
            continue
        if t in {
            "الرئيسية",
            "منتجاتنا",
            "من نحن",
            "تواصل معنا",
            "عربي",
            "خدماتنا",
            "عنا",
        }:
            continue
        if "جميع الحقوق" in t or "wuilt" in t.lower():
            continue
        if t not in texts:
            texts.append(t)
    return texts


def crawl() -> dict:
    queue: list[str] = []
    for p in KNOWN_PATHS + EXTRA_PATHS:
        queue.append(abs_url(p))

    seen: set[str] = set()
    pages: dict[str, dict] = {}
    all_images: set[str] = set()

    while queue:
        url = queue.pop(0)
        # normalize
        key = urllib.parse.unquote(url)
        if key in seen:
            continue
        seen.add(key)
        print("GET", key)
        html = fetch(url)
        time.sleep(0.4)
        if not html:
            pages[key] = {"url": key, "ok": False}
            continue

        chunks = decode_next_chunks(html)
        images = extract_images(html)
        all_images.update(images)
        texts = meaningful_texts(chunks, html)
        links = extract_internal_links(html)

        pages[key] = {
            "url": key,
            "ok": True,
            "title": extract_title(html),
            "images": images,
            "texts": texts[:80],
            "links": links,
            "html_len": len(html),
            "not_found": ("لم نجد هذه الصفحة" in html),
        }

        for link in links:
            full = abs_url(link)
            ukey = urllib.parse.unquote(full)
            if ukey not in seen and "7thstarfood.com" in full:
                queue.append(full)

    return {
        "base": BASE,
        "exported_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "page_count": len(pages),
        "image_count": len(all_images),
        "images": sorted(all_images),
        "pages": pages,
    }


def main() -> None:
    data = crawl()
    out_json = OUT_DIR / "full-export.json"
    out_json.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    # flat markdown summary
    md_lines = [
        f"# Wuilt export — {data['base']}",
        f"pages={data['page_count']} images={data['image_count']}",
        "",
    ]
    for url, page in data["pages"].items():
        md_lines.append(f"## {url}")
        if not page.get("ok"):
            md_lines.append("FAILED")
            continue
        if page.get("not_found"):
            md_lines.append("NOT FOUND (404-like)")
        md_lines.append(f"title: {page.get('title','')}")
        md_lines.append("### images")
        for img in page.get("images", []):
            md_lines.append(f"- {img}")
        md_lines.append("### texts")
        for t in page.get("texts", [])[:40]:
            md_lines.append(f"- {t}")
        md_lines.append("")

    (OUT_DIR / "full-export.md").write_text("\n".join(md_lines), encoding="utf-8")
    (OUT_DIR / "images.txt").write_text("\n".join(data["images"]), encoding="utf-8")
    print(f"Wrote {out_json}")
    print(f"pages={data['page_count']} images={data['image_count']}")


if __name__ == "__main__":
    main()
