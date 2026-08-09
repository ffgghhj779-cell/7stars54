# -*- coding: utf-8 -*-
"""Strict structure audit: live Wuilt export vs local React app."""

from __future__ import annotations

import json
import re
import ssl
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CTX = ssl._create_unverified_context()
UA = {"User-Agent": "Mozilla/5.0 (compatible; 7thstar-audit/1.0)"}

EXPECTED_TOP_NAV = ["الرئيسية", "من نحن", "منتجاتنا", "العضوية", "تواصل معنا"]

EXPECTED_PRODUCT_TREE = [
    ("fresh-fruits", "الفواكه الطازجة / الفواكة الطازجة", []),
    (
        "meat",
        "اللحوم",
        [
            ("frozen-chicken", "الدجاج المجمد"),
            ("buffalo", "لحوم البافلو / للحوم البافلو"),
            ("seafood", "الأسماك والأحياء البحرية"),
            ("sawakni", "السواكني"),
        ],
    ),
    (
        "grains",
        "الحبوب",
        [
            ("sesame", "السمسم"),
            ("rice", "الأرز"),
        ],
    ),
    ("vegetables", "الخضروات الطازجة", []),
    ("frozen-produce", "خضروات وفواكه مجمدة", []),
    ("frozen-fries", "بطاطس مجمدة نصف مقلية", []),
    ("eggs", "بيض الدجاج", []),
    ("oils", "زيوت الطبخ", []),
    ("cashew", "كاجو مملح", []),
]


def fetch(url: str, timeout: int = 35):
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as resp:
            body = resp.read()
            return {
                "ok": True,
                "status": resp.getcode(),
                "len": len(body),
                "text": body.decode("utf-8", "replace"),
            }
    except urllib.error.HTTPError as e:
        return {"ok": False, "status": e.code, "len": 0, "text": "", "error": str(e)}
    except Exception as e:
        return {"ok": False, "status": None, "len": 0, "text": "", "error": str(e)}


def parse_catalog_ts(text: str):
    nav_part = text.split("export const CATALOG")[0]
    cat_part = text.split("export const CATALOG")[1].split("export function")[0]
    nav_slugs = re.findall(r'"slug": "([^"]+)"', nav_part)
    # items
    items = []
    for block in re.split(r"\n  \{\n", cat_part):
        if "slug:" not in block:
            continue
        m = re.search(r'slug: "([^"]+)"', block)
        if not m:
            continue
        slug = m.group(1)
        title = re.search(r'title: "([^"]*)"', block)
        gallery = re.search(r"gallery: (\[[^\]]*\])", block)
        details_count = block.count("{ title:")
        parent = re.search(r'parent: "([^"]+)"', block)
        g = []
        if gallery:
            g = re.findall(r'"(/media/wuilt/[^"]+)"', gallery.group(1))
        items.append(
            {
                "slug": slug,
                "title": title.group(1) if title else "",
                "gallery": g,
                "details": details_count,
                "parent": parent.group(1) if parent else None,
            }
        )
    return nav_slugs, items


def media_exists(rel: str) -> bool:
    name = rel.split("/")[-1]
    p = ROOT / "public" / "media" / "wuilt" / name
    return p.exists() and p.stat().st_size > 500


def main() -> None:
    report = []
    deep = json.loads(
        (ROOT / "content/wuilt-export/sections/deep-sections.json").read_text(encoding="utf-8")
    )
    details = json.loads(
        (ROOT / "content/wuilt-export/sections/section-details.json").read_text(encoding="utf-8")
    )
    by_slug = {d["slug"]: d for d in details}
    sections = deep["sections"]

    catalog_ts = (ROOT / "src/data/catalog.ts").read_text(encoding="utf-8")
    nav_slugs, catalog_items = parse_catalog_ts(catalog_ts)
    catalog_by = {i["slug"]: i for i in catalog_items}

    app = (ROOT / "src/App.tsx").read_text(encoding="utf-8")
    navbar = (ROOT / "src/components/Navbar.tsx").read_text(encoding="utf-8")
    footer = (ROOT / "src/components/Footer.tsx").read_text(encoding="utf-8")
    pages = {p.stem for p in (ROOT / "src/pages").glob("*.tsx")}

    print("=== 1) TOP NAV (live expected vs local) ===")
    local_nav_labels = []
    for lab in EXPECTED_TOP_NAV:
        in_nav = lab in navbar or lab in footer or lab in app
        if lab == "الرئيسية":
            in_nav = "'/'" in navbar or '"/"' in navbar
        status = "OK" if in_nav else "MISSING"
        if lab == "العضوية" and not in_nav:
            status = "GAP"
        print(f"  [{status}] {lab}")
        local_nav_labels.append((lab, status))

    print("\n=== 2) PRODUCT TREE ===")
    expected_slugs = []
    for slug, title, children in EXPECTED_PRODUCT_TREE:
        expected_slugs.append(slug)
        in_nav = slug in nav_slugs
        in_cat = slug in catalog_by
        route_ok = "/products/:slug" in app
        item = catalog_by.get(slug)
        live = by_slug.get(slug, {})
        live_ok = bool(live.get("ok", True)) if live else False
        imgs_ok = 0
        imgs_miss = 0
        if item:
            for g in item["gallery"]:
                if media_exists(g):
                    imgs_ok += 1
                else:
                    imgs_miss += 1
        flag = "OK" if in_nav and in_cat else "GAP"
        print(
            f"  [{flag}] {slug} | nav={in_nav} catalog={in_cat} details={item['details'] if item else 0} "
            f"gallery={len(item['gallery']) if item else 0} local_imgs={imgs_ok} missing_files={imgs_miss} "
            f"live_blocks={len(live.get('blocks') or [])}"
        )
        for cslug, ctitle in children:
            expected_slugs.append(cslug)
            citem = catalog_by.get(cslug)
            cin = cslug in nav_slugs and cslug in catalog_by
            parent_ok = citem and citem.get("parent") in {slug}
            clive = by_slug.get(cslug, {})
            imgs_ok = imgs_miss = 0
            if citem:
                for g in citem["gallery"]:
                    if media_exists(g):
                        imgs_ok += 1
                    else:
                        imgs_miss += 1
            cflag = "OK" if cin and parent_ok else "GAP"
            thin = (citem and citem["details"] == 0) or len(clive.get("blocks") or []) <= 4
            note = " THIN_CONTENT" if thin else ""
            print(
                f"    [{cflag}] {cslug} parent={citem.get('parent') if citem else None} "
                f"details={citem['details'] if citem else 0} gallery={len(citem['gallery']) if citem else 0} "
                f"imgs={imgs_ok}{note}"
            )

    extra = [s for s in catalog_by if s not in expected_slugs]
    missing = [s for s in expected_slugs if s not in catalog_by]
    print(f"\n  extra_local_slugs: {extra or '-'}")
    print(f"  missing_expected_slugs: {missing or '-'}")

    print("\n=== 3) CORE PAGES ===")
    for name, route in [
        ("Home", "/"),
        ("About", "/about"),
        ("Products", "/products"),
        ("ProductCategory", "/products/:slug"),
        ("Contact", "/contact"),
        ("Membership", "/membership"),
    ]:
        page_exists = name in pages or (name == "Membership" and False)
        route_in_app = (
            route in app
            or (name == "Home" and 'path="/"' in app)
            or (name == "ProductCategory" and ":slug" in app)
        )
        if name == "Membership":
            print(f"  [GAP] Membership page/route absent (live nav had it; export empty)")
            continue
        print(f"  [{'OK' if page_exists and route_in_app else 'GAP'}] {name} page={page_exists} route={route_in_app}")

    print("\n=== 4) LIVE URL HEALTH (from deep export) ===")
    for sec in sections:
        slug = sec.get("slug")
        if slug in {"products-hub", "home", "about", "contact", "membership"} or sec.get("children"):
            # print parents and specials
            print(
                f"  {slug}: ok={sec.get('ok')} not_found={sec.get('not_found')} url={sec.get('resolved_url')}"
            )
        for ch in sec.get("children") or []:
            print(
                f"    {ch.get('slug')}: ok={ch.get('ok')} not_found={ch.get('not_found')} url={ch.get('resolved_url')}"
            )

    mem = by_slug.get("membership") or next((s for s in sections if s.get("slug") == "membership"), {})
    print(
        f"\n  membership export: blocks={len(mem.get('blocks') or [])} images={len(mem.get('images') or [])} "
        f"ok={mem.get('ok')} not_found={mem.get('not_found')}"
    )

    print("\n=== 5) LOCALHOST SMOKE ===")
    local = fetch("http://127.0.0.1:5173/")
    if not local["ok"]:
        print(f"  [WARN] dev server not reachable: {local.get('error')}")
    else:
        print(f"  [OK] localhost home status={local['status']} len={local['len']}")
        checks = [
            ("/", "Home"),
            ("/about", "About"),
            ("/products", "Products"),
            ("/contact", "Contact"),
            ("/products/fresh-fruits", "fruits"),
            ("/products/meat", "meat"),
            ("/products/frozen-chicken", "chicken"),
            ("/products/buffalo", "buffalo"),
            ("/products/seafood", "seafood"),
            ("/products/sawakni", "sawakni"),
            ("/products/grains", "grains"),
            ("/products/sesame", "sesame"),
            ("/products/rice", "rice"),
            ("/products/vegetables", "vegetables"),
            ("/products/frozen-produce", "frozen-produce"),
            ("/products/frozen-fries", "frozen-fries"),
            ("/products/eggs", "eggs"),
            ("/products/oils", "oils"),
            ("/products/cashew", "cashew"),
            ("/membership", "membership-should-404-or-empty"),
        ]
        for path, label in checks:
            r = fetch(f"http://127.0.0.1:5173{path}")
            # SPA always returns index.html 200
            has_root = "id=\"root\"" in r.get("text", "") or 'id="root"' in r.get("text", "")
            print(f"  [{'OK' if r.get('ok') and has_root else 'FAIL'}] {path} ({label}) status={r.get('status')}")

    print("\n=== 6) LIVE HOME QUICK LABELS ===")
    live = fetch("https://7thstarfood.com/")
    if live["ok"]:
        html = live["text"]
        for lab in EXPECTED_TOP_NAV + ["عربي", "English", "whatsapp", "instagram"]:
            hit = lab.lower() in html.lower() if lab.isascii() else lab in html
            print(f"  [{'YES' if hit else 'NO '}] {lab}")
    else:
        print(f"  [WARN] live home failed: {live.get('error')} status={live.get('status')}")

    print("\n=== 7) FEATURE PARITY EXTRAS ===")
    print(f"  language switcher in Navbar: {'YES' if ('عربي' in navbar or 'English' in navbar) else 'NO'}")
    print(f"  PRODUCT_NAV dropdown in Navbar: {'YES' if 'PRODUCT_NAV' in navbar else 'NO'}")
    print(f"  WhatsApp button component: {(ROOT / 'src/components/WhatsAppButton.tsx').exists()}")
    social_keys = ["instagram", "facebook", "youtube", "linkedin", "tiktok", "snapchat", "twitter"]
    site = (ROOT / "src/data/site.ts").read_text(encoding="utf-8")
    for k in social_keys:
        print(f"  social.{k}: {'YES' if k in site else 'NO'}")

    # Summary gaps
    print("\n=== SUMMARY GAPS ===")
    gaps = []
    if "العضوية" not in navbar:
        gaps.append("Top-nav item missing: العضوية (and no Membership page)")
    if "عربي" not in navbar and "English" not in navbar:
        gaps.append("Language switcher missing (present on live)")
    thin = [i["slug"] for i in catalog_items if i["details"] == 0]
    if thin:
        gaps.append("Thin/empty detail pages: " + ", ".join(thin))
    # gallery missing files
    miss_files = []
    for i in catalog_items:
        for g in i["gallery"]:
            if not media_exists(g):
                miss_files.append(g)
    if miss_files:
        gaps.append(f"Missing local image files: {len(miss_files)}")
    if missing:
        gaps.append("Missing product slugs: " + ", ".join(missing))
    if not gaps:
        print("  No structural gaps found.")
    else:
        for g in gaps:
            print(f"  - {g}")


if __name__ == "__main__":
    main()
