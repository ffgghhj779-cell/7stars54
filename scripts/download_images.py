# -*- coding: utf-8 -*-
import ssl
import urllib.request
from pathlib import Path

CTX = ssl._create_unverified_context()
ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "content" / "wuilt-export" / "images.txt"
DEST = ROOT / "public" / "media" / "wuilt"
DEST.mkdir(parents=True, exist_ok=True)

urls = [u.strip() for u in SRC.read_text(encoding="utf-8").splitlines() if u.strip()]
ok = 0
for url in urls:
    name = url.rstrip("/").split("/")[-1]
    out = DEST / name
    if out.exists() and out.stat().st_size > 1000:
        print("skip", name)
        ok += 1
        continue
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=90, context=CTX) as res:
            data = res.read()
        out.write_bytes(data)
        print("saved", name, len(data))
        ok += 1
    except Exception as exc:  # noqa: BLE001
        print("fail", name, exc)

print(f"done {ok}/{len(urls)} -> {DEST}")
