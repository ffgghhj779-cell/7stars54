# -*- coding: utf-8 -*-
import re
from html import unescape
from pathlib import Path

html = Path("content/wuilt-export/sections/debug-fruits.html").read_text(encoding="utf-8")

# 1) raw arabic windows around key words
for needle in ["الأصناف", "التعبة", "التعبئة", "فالنسيا", "خوخ", "شمام", "بطيخ", "حاوية"]:
    start = 0
    n = 0
    while n < 3:
        idx = html.find(needle, start)
        if idx < 0:
            break
        snippet = html[max(0, idx - 80) : idx + 500]
        plain = re.sub(r"<[^>]+>", " ", unescape(snippet))
        plain = re.sub(r"\s+", " ", plain)
        print("\nNEEDLE", needle, "at", idx)
        print(plain[:400])
        start = idx + len(needle)
        n += 1

# 2) decode ALL \\uXXXX sequences in file and search
def decode_all_u(s: str) -> str:
    def repl(m):
        try:
            return chr(int(m.group(1), 16))
        except Exception:
            return m.group(0)

    return re.sub(r"\\u([0-9a-fA-F]{4})", repl, s)

decoded = decode_all_u(html)
print("\nDECODED len", len(decoded))
# extract p blocks from decoded
paras = re.findall(r"<p[^>]*>(.*?)</p>", decoded, flags=re.I | re.S)
print("paras", len(paras))
for p in paras[:15]:
    t = re.sub(r"<[^>]+>", "\n", unescape(p))
    t = re.sub(r"\n+", "\n", t).strip()
    if len(t) > 30 and re.search(r"[\u0600-\u06FF]", t):
        print("---PARA---")
        print(t[:500])
