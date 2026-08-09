# -*- coding: utf-8 -*-
"""Download product images via assets.wuiltweb.com (SSL verify disabled)."""

from __future__ import annotations

import json
import ssl
import time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "content" / "wuilt-export" / "sections" / "section-details.json"
OUT = ROOT / "public" / "media" / "wuilt"
CTX = ssl._create_unverified_context()
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"


def fetch(url: str) -> bytes | None:
    try:
        req = Request(url, headers={"User-Agent": UA, "Accept": "image/*,*/*"})
        with urlopen(req, timeout=30, context=CTX) as resp:
            data = resp.read()
            ctype = (resp.headers.get("content-type") or "").lower()
            if len(data) < 800:
                return None
            if "html" in ctype or "json" in ctype or "text/" in ctype:
                return None
            return data
    except (HTTPError, URLError, TimeoutError, OSError):
        return None


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    rows = json.loads(SRC.read_text(encoding="utf-8"))
    names: list[str] = []
    seen: set[str] = set()
    for r in rows:
        for u in r.get("images") or []:
            name = u.rstrip("/").split("/")[-1].split("?")[0]
            if not name or name in seen:
                continue
            seen.add(name)
            names.append(name)

    ok = fail = skipped = 0
    for i, name in enumerate(names, 1):
        dest = OUT / name
        if dest.exists() and dest.stat().st_size > 800:
            skipped += 1
            continue
        url = f"https://assets.wuiltweb.com/347612/{name}"
        data = fetch(url)
        if data:
            dest.write_bytes(data)
            ok += 1
            print(f"[{i}/{len(names)}] OK {name} ({len(data)} bytes)")
        else:
            fail += 1
            print(f"[{i}/{len(names)}] FAIL {name}")
        time.sleep(0.05)

    print(f"done ok={ok} fail={fail} skipped={skipped} total={len(names)} local={len(list(OUT.glob('*')))}")


if __name__ == "__main__":
    main()
