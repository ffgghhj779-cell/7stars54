import { readFileSync, writeFileSync } from 'node:fs'

const files = [
  'src/data/catalog.ts',
  'src/data/homeShowcase.ts',
  'src/data/site.ts',
]

for (const file of files) {
  const before = readFileSync(file, 'utf8')
  const after = before
    .replace(/(\/media\/wuilt\/[0-9a-zA-Z]+)\.(jpe?g|png)/g, '$1.webp')
    .replace(/(m\('[0-9a-zA-Z]+)\.(jpe?g|png)('\))/g, '$1.webp$3')
  if (before !== after) {
    writeFileSync(file, after, 'utf8')
    console.log(`updated: ${file}`)
  } else {
    console.log(`no change: ${file}`)
  }
}
