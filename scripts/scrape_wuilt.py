import re
import ssl
import urllib.request
from pathlib import Path

CTX = ssl._create_unverified_context()

PAGES = {
    "products": "https://7thstarfood.com/%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA%D9%86%D8%A7",
    "fruits": "https://7thstarfood.com/%D9%81%D9%88%D8%A7%D9%83%D8%A9-%D8%B7%D8%A7%D8%B2%D8%AC%D8%A9",
    "meat": "https://7thstarfood.com/%D8%A7%D9%84%D9%84%D8%AD%D9%88%D9%85",
    "fries": "https://7thstarfood.com/%D8%A8%D8%B7%D8%A7%D8%B7%D8%B3-%D9%85%D8%AC%D9%85%D8%AF%D8%A9-%D9%86%D8%B5%D9%81-%D9%85%D9%82%D9%84%D9%8A%D8%A9",
    "veg": "https://7thstarfood.com/%D8%A7%D9%84%D8%AE%D8%B6%D8%B1%D9%88%D8%A7%D8%AA",
    "frozen": "https://7thstarfood.com/%D8%AE%D8%B6%D8%B1%D9%88%D8%A7%D8%AA-%D9%88%D9%81%D9%88%D8%A7%D9%83%D8%A9-%D9%85%D8%AC%D9%85%D8%AF%D8%A9",
    "about": "https://7thstarfood.com/%D9%85%D9%86-%D9%86%D8%AD%D9%86",
}

SKIP = {
    "الرئيسية",
    "منتجاتنا",
    "من نحن",
    "تواصل معنا",
    "عربي",
    "خدماتنا",
    "عنا",
}

out = Path("scraped-products.txt")
lines: list[str] = []

for name, url in PAGES.items():
    lines.append(f"\n===== {name} =====\n{url}")
    try:
        html = urllib.request.urlopen(url, timeout=60, context=CTX).read().decode(
            "utf-8", "replace"
        )
    except Exception as exc:  # noqa: BLE001
        lines.append(f"ERROR: {exc}")
        continue

    lines.append(f"html_len={len(html)}")
    next_data = re.search(
        r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',
        html,
    )
    lines.append(f"has_NEXT_DATA={bool(next_data)}")

    imgs = sorted(
        set(
            re.findall(
                r"https://assets\.wuiltweb\.com/347612/[^\"\\\s]+\.(?:png|jpg|jpeg|webp)",
                html,
            )
        )
    )
    lines.append(f"images={len(imgs)}")
    for img in imgs:
        lines.append(f"IMG {img}")

    texts = re.findall(r">([^<]*[\u0600-\u06FF][^<]{2,220})<", html)
    uniq: list[str] = []
    for t in texts:
        t = " ".join(t.split())
        if not t or t in SKIP or t in uniq:
            continue
        if "wuilt" in t.lower():
            continue
        uniq.append(t)
    for t in uniq[:40]:
        lines.append(f"TXT {t}")

out.write_text("\n".join(lines), encoding="utf-8")
print(f"wrote {out} ({out.stat().st_size} bytes)")
