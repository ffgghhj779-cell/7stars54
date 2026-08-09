# -*- coding: utf-8 -*-
"""Honest completeness score: images + structure + content."""

from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / "public" / "media" / "wuilt"
DETAILS = json.loads(
    (ROOT / "content/wuilt-export/sections/section-details.json").read_text(encoding="utf-8")
)
CATALOG = (ROOT / "src/data/catalog.ts").read_text(encoding="utf-8")

CHROME = {
    "04062022141415624da0375b11c.jpg",
    "04062022150210624dab7240e00.jpg",
    "04062022164249624dc309b5043.jpg",
    "0408202210341862500faa2b06c.jpg",
    "0408202212352862502c10754e4.jpg",
    "0408202212502662502f923b53d.jpg",
    "04092022085413625149b5589ff.jpg",
    "0508202602192269fd482a85d84.png",
    "03242024121725660019d54d791.png",
    "051920230400056466f44550c07.png",  # often logo/chrome
    "06062023184534647f7ecebab50.png",
    "070520261749366a4a993087b3c.png",  # logo
}

PRODUCT_SLUGS = {
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
}


def fname(u: str) -> str:
    return u.rstrip("/").split("/")[-1].split("?")[0]


def exists(name: str) -> bool:
    p = MEDIA / name
    return p.exists() and p.stat().st_size > 500


def main() -> None:
    # shared frequency across all section image lists
    freq: Counter[str] = Counter()
    for row in DETAILS:
        for u in row.get("images") or []:
            freq[fname(u)] += 1

    print("=== IMAGE COMPLETENESS (product pages only) ===")
    total_unique = set()
    total_local = set()
    total_missing = set()
    total_in_catalog_gallery = set()
    total_product_remote = set()

    # catalog galleries
    gal_map = {}
    for block in re.split(r"\n  \{\n", CATALOG.split("export const CATALOG")[1]):
        m = re.search(r'slug: "([^"]+)"', block)
        if not m:
            continue
        slug = m.group(1)
        gals = re.findall(r'"(/media/wuilt/[^"]+)"', block.split("details:")[0])
        gal_map[slug] = [x.split("/")[-1] for x in gals]

    for row in DETAILS:
        slug = row["slug"]
        if slug not in PRODUCT_SLUGS:
            continue
        names = []
        for u in row.get("images") or []:
            n = fname(u)
            if not n or n in CHROME:
                continue
            # skip ultra-shared chrome-like assets
            if freq[n] >= 10:
                continue
            names.append(n)
            total_product_remote.add(n)
        # unique preserve
        uniq = []
        for n in names:
            if n not in uniq:
                uniq.append(n)
        local = [n for n in uniq if exists(n)]
        missing = [n for n in uniq if not exists(n)]
        in_gal = gal_map.get(slug, [])
        # how many unique product images made it into shown gallery
        covered = [n for n in uniq if n in in_gal]
        not_in_gal = [n for n in local if n not in in_gal]

        total_unique.update(uniq)
        total_local.update(local)
        total_missing.update(missing)
        total_in_catalog_gallery.update(in_gal)

        print(
            f"{slug:16} remote_unique={len(uniq):2} local={len(local):2} missing={len(missing):2} "
            f"in_ui_gallery={len(in_gal):2} local_not_shown={len(not_in_gal):2}"
        )
        if missing:
            print("  missing:", ", ".join(missing[:8]))
        if not_in_gal[:5]:
            print("  local but not in UI gallery (often capped at 12):", ", ".join(not_in_gal[:5]))

    print("\nTOTAL product unique images (non-chrome):", len(total_unique))
    print("TOTAL local on disk:", len(total_local))
    print("TOTAL missing on disk:", len(total_missing), sorted(total_missing)[:20])
    if total_unique:
        pct = 100.0 * len(total_local) / len(total_unique)
        print(f"Download coverage of product images: {pct:.1f}%")

    # media folder totals
    all_files = [p.name for p in MEDIA.glob("*") if p.is_file()]
    print("All files in public/media/wuilt:", len(all_files))

    print("\n=== CONTENT THINNESS ===")
    for slug, item_gal in gal_map.items():
        if slug not in PRODUCT_SLUGS:
            continue
        # details count
        # crude: find block
        m = re.search(rf'slug: "{slug}",[\s\S]*?details: \[([\s\S]*?)\n    \],', CATALOG)
        details_n = 0
        if m:
            details_n = m.group(1).count("{ title:")
        thin = details_n == 0
        print(f"{slug:16} details_blocks={details_n:2} gallery={len(item_gal):2} {'THIN' if thin else 'OK'}")

    print("\n=== STRUCTURE GAPS (not 100%) ===")
    print("- Membership page: missing locally; live is 404/empty")
    print("- Language switcher: on live, not in local nav")
    print("- Gallery UI capped (~12 imgs/section): some local images may not appear in page")
    print("- Visual polish / Esteem-level design: not claimed complete")
    print("- Cannot guarantee 100% pixel/content parity with Wuilt")


if __name__ == "__main__":
    main()
