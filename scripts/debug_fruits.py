# -*- coding: utf-8 -*-
import re
import ssl
import urllib.request
from pathlib import Path

CTX = ssl._create_unverified_context()
url = "https://7thstarfood.com/" + urllib.parse.quote("فواكة-طازجة")
import urllib.parse

url = "https://7thstarfood.com/" + urllib.parse.quote("فواكة-طازجة")
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req, timeout=90, context=CTX).read().decode("utf-8", "replace")
Path("content/wuilt-export/sections/debug-fruits.html").write_text(html, encoding="utf-8")
print("len", len(html))
for needle in ["الأصناف", "الاصناف", "تعبئة", "فالنسيا", "خوخ", "شمام", "بطيخ"]:
    print(needle, html.count(needle), html.count(needle.encode("unicode_escape").decode() if False else needle))

# count escaped forms
print("escaped asnaf", html.count("\\u0627\\u0644\\u0623\\u0635\\u0646\\u0627\\u0641"))
print("push count", len(re.findall(r"__next_f\.push", html)))
# find snippet around Valencia if present as unicode
idx = html.find("فالنسيا")
print("idx falan", idx)
if idx < 0:
    # try latin
    idx = html.find("Valencia")
    print("idx Valencia", idx)
# search any strong tags in raw
print("strong count", html.count("<strong"))
print("p style count", html.count("text-align: center"))
# sample pushes containing p style
for m in re.finditer(r'self\.__next_f\.push\(\[1,"(.{0,80}text-align.{0,80})', html):
    print("HIT", m.group(1)[:120])
    break
for m in re.finditer(r'self\.__next_f\.push\(\[1,"(.{0,120})', html):
    s = m.group(1)
    if "p style" in s or "strong" in s:
        print("RAW", s[:150])
        break
