# Wuilt full export archive

Exported from https://7thstarfood.com into this project.

## Files

- `full-export.json` — every crawled page: titles, image URLs, extracted texts, links
- `full-export.md` — human-readable dump
- `images.txt` — unique asset URLs (32)
- `../public/media/wuilt/` — downloaded local copies of those images

## Notes

- Some Wuilt URLs with spaces or wrong slugs return a "page not found" template; content for those sections may still appear nested inside other pages.
- SEO keyword spam appears in Wuilt page payloads; we avoid copying that into the UI.
- Product detail blocks that were successfully parsed (e.g. citrus packing specs, garlic specs) are mapped into `src/data/site.ts`.
