# -*- coding: utf-8 -*-
"""Generate src/data/catalog.ts from section-details.json"""

from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "content" / "wuilt-export" / "sections" / "section-details.json"
MEDIA = ROOT / "public" / "media" / "wuilt"
OUT = ROOT / "src" / "data" / "catalog.ts"

NOISE_TITLE = re.compile(
    r"(keyframes|shimmer|جميع الحقوق|عزيزنا الزائر|نحن هنا لل|إن القيام|@|صيانة|"
    r"الفواكة الطازجة اللحوم|اطلب الان|البوم صور)",
    re.I,
)

# Site chrome / social icons that appear on nearly every Wuilt page
CHROME_NAMES = {
    "04062022141415624da0375b11c.jpg",
    "04062022150210624dab7240e00.jpg",
    "04062022164249624dc309b5043.jpg",
    "0408202210341862500faa2b06c.jpg",
    "0408202212352862502c10754e4.jpg",
    "0408202212502662502f923b53d.jpg",
    "04092022085413625149b5589ff.jpg",
    "0508202602192269fd482a85d84.png",
    "03242024121725660019d54d791.png",
}

BLURB_FALLBACK = {
    "fresh-fruits": "أصناف موسمية بمعايير تصدير وتعبئة للتوريد بالجملة.",
    "meat": "نقوم باستيراد اللحوم المجمدة والمبردة حسب المواصفات والمقاييس العالمية.",
    "frozen-chicken": "دجاج مجمد حلال بأحجام وأجزاء متنوعة للتوزيع والتصدير بالجملة.",
    "buffalo": "لحوم بافلو مجمدة ضمن محفظة التوريد التجاري.",
    "seafood": "أسماك ومأكولات بحرية طازجة ومستزرعة بجودة تصدير.",
    "sawakni": "لحوم سواكني ضمن منتجات التوريد المبرّد.",
    "grains": "نستورد الحبوب مثل الأرز والسمسم للتوريد بالجملة.",
    "sesame": "سمسم للتوريد التجاري والاستخدام الصناعي والغذائي.",
    "rice": "أرز بسماتي ومواصفات تعبئة وشحن للتوريد بالجملة.",
    "vegetables": "خضروات طازجة بفرز وتعبئة مناسبة للتصدير.",
    "frozen-produce": "خضروات وفواكه مجمدة جاهزة للتوزيع التجاري.",
    "frozen-fries": "بطاطس مجمدة نصف مقلية فاخرة خالية من المواد الحافظة.",
    "eggs": "بيض دجاج للتوريد التجاري والتصدير.",
    "oils": "زيوت طبخ للتوريد والاستخدام التجاري.",
    "cashew": "كاجو مملح ضمن منتجات المكسرات.",
}


def clean_lines(lines: list[str]) -> list[str]:
    out: list[str] = []
    for ln in lines:
        ln = ln.replace('\\"', '"').replace("\\\\", "").strip()
        ln = re.sub(r"\s+", " ", ln)
        if len(ln) < 2:
            continue
        if "keyframes" in ln or "background-position" in ln:
            continue
        if NOISE_TITLE.search(ln) and len(ln) < 80:
            continue
        if ln in out:
            continue
        out.append(ln)
    return out


def useful_blocks(blocks: list[dict]) -> list[dict]:
    """Keep original page order; drop chrome/noise only."""
    useful: list[dict] = []
    seen: set[str] = set()
    for b in blocks:
        title = re.sub(r"\s+", " ", b.get("title") or "").strip()
        if len(title) < 2:
            continue
        if NOISE_TITLE.search(title):
            continue
        if "الفواكة الطازجة اللحوم" in title:
            continue
        lines = clean_lines(b.get("lines") or [])
        if not lines:
            lines = [title]
        # Drop tiny chrome labels; keep product names and real copy
        same = lines == [title]
        is_product_label = any(
            k in title
            for k in (
                "طازج",
                "طــازج",
                "SPINACH",
                "OKRA",
                "CORN",
                "BROCCOLI",
                "مجمد",
                "بسماتي",
                "استيراد",
                "اسـتيراد",
                "منتجات",
                "المميزات",
            )
        )
        if same and len(title) < 22 and not is_product_label:
            continue
        if same and len(title) < 12:
            continue
        key = title + "||" + "||".join(lines[:3])
        if key in seen:
            continue
        seen.add(key)
        useful.append({"title": title[:120], "lines": lines[:50]})
        if len(useful) >= 30:
            break
    return useful


def filename(url_or_path: str) -> str:
    return url_or_path.rstrip("/").split("/")[-1].split("?")[0]


def local_exists(name: str) -> bool:
    p = MEDIA / name
    return p.exists() and p.stat().st_size > 500


def collect_images(row: dict, shared_count: Counter[str]) -> list[str]:
    """Prefer unique product images that exist locally."""
    candidates: list[str] = []
    for src in (row.get("local_images") or []) + (row.get("images") or []):
        name = filename(src)
        if not name or name in CHROME_NAMES:
            continue
        if shared_count.get(name, 0) >= 10:
            continue
        if name not in candidates:
            candidates.append(name)

    existing = [f"/media/wuilt/{n}" for n in candidates if local_exists(n)]
    if existing:
        return existing[:12]

    # fallback: any local non-chrome from list
    for n in candidates:
        path = f"/media/wuilt/{n}"
        if path not in existing:
            existing.append(path)
        if len(existing) >= 8:
            break
    return existing


def pick_blurb(slug: str, title: str, blocks: list[dict]) -> str:
    if slug in BLURB_FALLBACK:
        return BLURB_FALLBACK[slug]
    for b in blocks:
        for ln in b["lines"]:
            if len(ln) >= 35 and ln != b["title"] and not NOISE_TITLE.search(ln):
                return ln[:160]
        if len(b["title"]) >= 35 and not NOISE_TITLE.search(b["title"]):
            return b["title"][:160]
    return title


def ts_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def main() -> None:
    rows = json.loads(SRC.read_text(encoding="utf-8"))
    by_slug = {r["slug"]: r for r in rows}

    shared: Counter[str] = Counter()
    for r in rows:
        for u in r.get("images") or []:
            shared[filename(u)] += 1

    order = [
        "fresh-fruits",
        "meat",
        "frozen-chicken",
        "buffalo",
        "seafood",
        "sawakni",
        "grains",
        "sesame",
        "rice",
        "vegetables",
        "frozen-produce",
        "frozen-fries",
        "eggs",
        "oils",
        "cashew",
    ]

    nav = [
        {"slug": "fresh-fruits", "title": "الفواكه الطازجة"},
        {
            "slug": "meat",
            "title": "اللحوم",
            "children": [
                {"slug": "frozen-chicken", "title": "الدجاج المجمد"},
                {"slug": "buffalo", "title": "لحوم البافلو"},
                {"slug": "seafood", "title": "الأسماك والأحياء البحرية"},
                {"slug": "sawakni", "title": "السواكني"},
            ],
        },
        {
            "slug": "grains",
            "title": "الحبوب",
            "children": [
                {"slug": "sesame", "title": "السمسم"},
                {"slug": "rice", "title": "الأرز"},
            ],
        },
        {"slug": "vegetables", "title": "الخضروات الطازجة"},
        {"slug": "frozen-produce", "title": "خضروات وفواكه مجمدة"},
        {"slug": "frozen-fries", "title": "بطاطس مجمدة نصف مقلية"},
        {"slug": "eggs", "title": "بيض الدجاج"},
        {"slug": "oils", "title": "زيوت الطبخ"},
        {"slug": "cashew", "title": "كاجو مملح"},
    ]

    title_map = {
        "buffalo": "لحوم البافلو",
        "seafood": "الأسماك والأحياء البحرية",
        "frozen-produce": "خضروات وفواكه مجمدة",
        "fresh-fruits": "الفواكه الطازجة",
        "meat": "اللحوم",
        "grains": "الحبوب",
        "vegetables": "الخضروات الطازجة",
        "frozen-fries": "بطاطس مجمدة نصف مقلية",
        "eggs": "بيض الدجاج",
        "oils": "زيوت الطبخ",
        "cashew": "كاجو مملح",
        "frozen-chicken": "الدجاج المجمد",
        "sesame": "السمسم",
        "rice": "الأرز",
        "sawakni": "السواكني",
    }

    fallback_image = {
        "fresh-fruits": "070320260038196a47047bc4704.jpg",
        "meat": "070220260419336a45e6d56e6c3.jpg",
        "frozen-chicken": "070220260431456a45e9b132e9c.jpg",
        "buffalo": "070220260420166a45e700c7d48.jpg",
        "seafood": "070220260420426a45e71a6a776.jpg",
        "sawakni": "070220260419336a45e6d56e6c3.jpg",
        "grains": "070220260421016a45e72d4b4c1.jpg",
        "sesame": "070220260409026a45e45e8fab2.jpg",
        "rice": "070220260426396a45e87f48aed.jpg",
        "vegetables": "070220260109206a45ba403361a.jpg",
        "frozen-produce": "070220260331536a45dba98f2da.jpg",
        "frozen-fries": "070320260035266a4703ce0c67d.jpg",
        "eggs": "070220260425576a45e8556ba57.jpg",
        "oils": "070220260429036a45e90fcf008.jpg",
        "cashew": "070220260032276a45b19b6f929.jpg",
    }

    parts: list[str] = []
    parts.append("/* Auto-generated from Wuilt deep extract — do not hand-edit */")
    parts.append("export type CatalogBlock = { title: string; lines: string[] }")
    parts.append(
        "export type CatalogItem = {\n"
        "  slug: string\n"
        "  title: string\n"
        "  blurb: string\n"
        "  image: string\n"
        "  gallery: string[]\n"
        "  details: CatalogBlock[]\n"
        "  parent?: string\n"
        "}"
    )
    parts.append("export type NavNode = { slug: string; title: string; children?: NavNode[] }")
    parts.append(f"export const PRODUCT_NAV: NavNode[] = {json.dumps(nav, ensure_ascii=False, indent=2)}")

    items = []
    for slug in order:
        r = by_slug.get(slug) or {}
        title = title_map.get(slug) or r.get("title") or slug
        images = collect_images(r, shared)
        if not images:
            fb = fallback_image.get(slug, "070520261749366a4a993087b3c.png")
            images = [f"/media/wuilt/{fb}"]
        blocks = useful_blocks(r.get("blocks") or [])
        blurb = pick_blurb(slug, title, blocks)
        parent = None
        if slug in {"frozen-chicken", "buffalo", "seafood", "sawakni"}:
            parent = "meat"
        if slug in {"sesame", "rice"}:
            parent = "grains"
        items.append(
            {
                "slug": slug,
                "title": title,
                "blurb": blurb,
                "image": images[0],
                "gallery": images,
                "details": blocks,
                **({"parent": parent} if parent else {}),
            }
        )

    parts.append("export const CATALOG: CatalogItem[] = [")
    for it in items:
        parts.append("  {")
        parts.append(f"    slug: {ts_str(it['slug'])},")
        parts.append(f"    title: {ts_str(it['title'])},")
        parts.append(f"    blurb: {ts_str(it['blurb'])},")
        parts.append(f"    image: {ts_str(it['image'])},")
        parts.append(f"    gallery: {json.dumps(it['gallery'], ensure_ascii=False)},")
        if it.get("parent"):
            parts.append(f"    parent: {ts_str(it['parent'])},")
        parts.append("    details: [")
        for b in it["details"]:
            parts.append(
                f"      {{ title: {ts_str(b['title'])}, lines: {json.dumps(b['lines'], ensure_ascii=False)} }},"
            )
        parts.append("    ],")
        parts.append("  },")
    parts.append("]")
    parts.append("")
    parts.append("/** Top-level categories as shown in the live dropdown (parents only). */")
    parts.append("export const TOP_CATEGORIES = CATALOG.filter((item) => !item.parent)")
    parts.append("")
    parts.append("export function getCatalogItem(slug: string) {")
    parts.append("  return CATALOG.find((item) => item.slug === slug)")
    parts.append("}")
    parts.append("")
    parts.append("export function getChildren(parentSlug: string) {")
    parts.append("  return CATALOG.filter((item) => item.parent === parentSlug)")
    parts.append("}")
    parts.append("")

    OUT.write_text("\n".join(parts) + "\n", encoding="utf-8")
    print("wrote", OUT, "items", len(items))
    for it in items:
        print(it["slug"], "gallery", len(it["gallery"]), "details", len(it["details"]))


if __name__ == "__main__":
    main()
