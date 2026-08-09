import sharp from 'sharp'
import { readdirSync, statSync, unlinkSync, renameSync } from 'node:fs'
import { join, extname, basename } from 'node:path'

const DIR = join(process.cwd(), 'public', 'media', 'wuilt')
const MAX_DIM = 1920
const QUALITY = 78

const files = readdirSync(DIR).filter((f) => /\.(jpe?g|png)$/i.test(f))

let totalBefore = 0
let totalAfter = 0
let converted = 0

for (const file of files) {
  const srcPath = join(DIR, file)
  const before = statSync(srcPath).size
  const outName = basename(file, extname(file)) + '.webp'
  const outPath = join(DIR, outName)

  try {
    const img = sharp(srcPath)
    const meta = await img.metadata()
    const needsResize = (meta.width || 0) > MAX_DIM || (meta.height || 0) > MAX_DIM

    let pipeline = img
    if (needsResize) {
      pipeline = pipeline.resize({
        width: MAX_DIM,
        height: MAX_DIM,
        fit: 'inside',
        withoutEnlargement: true,
      })
    }

    await pipeline.webp({ quality: QUALITY, effort: 5 }).toFile(outPath + '.tmp')

    const after = statSync(outPath + '.tmp').size
    // Only keep conversion if it actually saves space (guards tiny/simple PNGs)
    if (after < before) {
      renameSync(outPath + '.tmp', outPath)
      unlinkSync(srcPath)
      totalBefore += before
      totalAfter += after
      converted += 1
      console.log(`${file} -> ${outName}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`)
    } else {
      unlinkSync(outPath + '.tmp')
      console.log(`${file} kept as-is (webp not smaller)`)
    }
  } catch (err) {
    console.error(`FAILED: ${file}`, err.message)
  }
}

console.log('---')
console.log(`Converted: ${converted}/${files.length}`)
console.log(`Total before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`)
console.log(`Total after:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`)
console.log(`Saved:        ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB`)
