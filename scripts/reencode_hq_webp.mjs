/**
 * Re-encode all media from original JPGs/PNGs (git 2525fb6) at higher WebP quality.
 * Keeps full resolution up to 2560px; quality 92 (hero/key: 100).
 */
import sharp from 'sharp'
import { execSync } from 'node:child_process'
import { mkdirSync, readdirSync, statSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { join, extname, basename } from 'node:path'

const ROOT = process.cwd()
const OUT_DIR = join(ROOT, 'public', 'media', 'wuilt')
const TMP = join(ROOT, '.tmp-reencode')
const COMMIT = '2525fb6'
const MAX_DIM = 2560
const QUALITY = 92
const HERO_QUALITY = 100

const HERO_BASES = new Set([
  '070220260306366a45d5bce2061', // homepage hero
  '070220260306366a45d5bce2061-hq', // q100 hero alias
  '070220260043256a45b42dcfb8c', // about office / lobby
  '070320262340366a4848742be4a', // building
  '070520261749366a4a993087b3c', // logo
])

rmSync(TMP, { recursive: true, force: true })
mkdirSync(TMP, { recursive: true })

const list = execSync(`git ls-tree -r --name-only ${COMMIT} -- public/media/wuilt`, { encoding: 'utf8' })
  .trim()
  .split(/\r?\n/)
  .filter((f) => /\.(jpe?g|png)$/i.test(f))

console.log(`Restoring ${list.length} originals from ${COMMIT}...`)
for (const rel of list) {
  const dest = join(TMP, basename(rel))
  // Use git show so we never dirty the index with restored JPG/PNG originals
  const buf = execSync(`git show ${COMMIT}:${rel.replace(/\\/g, '/')}`, { maxBuffer: 50 * 1024 * 1024 })
  writeFileSync(dest, buf)
}

let converted = 0
let bytesIn = 0
let bytesOut = 0

const files = readdirSync(TMP).filter((f) => /\.(jpe?g|png)$/i.test(f))
for (const file of files) {
  const srcPath = join(TMP, file)
  const base = basename(file, extname(file))
  const outPath = join(OUT_DIR, `${base}.webp`)
  const before = statSync(srcPath).size
  bytesIn += before

  const meta = await sharp(srcPath, { failOn: 'none' }).metadata()
  const q = HERO_BASES.has(base) ? HERO_QUALITY : QUALITY
  const needsResize = (meta.width || 0) > MAX_DIM || (meta.height || 0) > MAX_DIM

  let pipeline = sharp(srcPath, { failOn: 'none' })
  if (needsResize) {
    pipeline = pipeline.resize({
      width: MAX_DIM,
      height: MAX_DIM,
      fit: 'inside',
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3,
    })
  }

  const tmpOut = outPath + '.tmp'
  await pipeline.webp({ quality: q, effort: 6, smartSubsample: true }).toFile(tmpOut)
  const after = statSync(tmpOut).size
  bytesOut += after
  renameSync(tmpOut, outPath)
  converted += 1
  const tag = HERO_BASES.has(base) ? ' HERO' : ''
  console.log(
    `${base}.webp${tag}  q${q}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB  ${meta.width}x${meta.height}`,
  )
}

rmSync(TMP, { recursive: true, force: true })
console.log('---')
console.log(`Converted: ${converted}`)
console.log(`Input:  ${(bytesIn / 1024 / 1024).toFixed(2)} MB`)
console.log(`Output: ${(bytesOut / 1024 / 1024).toFixed(2)} MB`)
