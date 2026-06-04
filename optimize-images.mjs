/**
 * SOMI Klinikken – image optimization pipeline
 * Usage: node optimize-images.mjs
 */

import sharp from 'sharp'
import { existsSync, mkdirSync, statSync, copyFileSync } from 'fs'
import { extname } from 'path'

const CFG = {
  team:      { maxW: 800,  webpQ: 85, jpgQ: 88 },
  klinikk:   { maxW: 1440, webpQ: 82, jpgQ: 85 },
  resultater:{ maxW: 1000, webpQ: 82, jpgQ: 85 },
}

const images = [
  // ── Team ─────────────────────────────────────────────────────────────────
  { src: '/tmp/katarina-hammer-permanent-makeup-somi-klinikken.jpg',
    name: 'katarina-hammer-permanent-makeup-somi-klinikken',
    destDir: 'public/img/team', cfg: 'team' },
  { src: '/tmp/katarina-hammer-konsultasjon-kunde-somi-klinikken.jpg',
    name: 'katarina-hammer-konsultasjon-kunde-somi-klinikken',
    destDir: 'public/img/team', cfg: 'team' },
  { src: '/tmp/emma-hudpleier-dermalogica-somi-klinikken.jpg',
    name: 'emma-hudpleier-dermalogica-somi-klinikken',
    destDir: 'public/img/team', cfg: 'team' },
  { src: '/tmp/arianna-laserspesialist-somi-klinikken.jpg',
    name: 'arianna-laserspesialist-somi-klinikken',
    destDir: 'public/img/team', cfg: 'team' },

  // ── Klinikk ──────────────────────────────────────────────────────────────
  { src: '/tmp/somi-klinikken-interior-sandnes.jpg',
    name: 'somi-klinikken-interior-sandnes',
    destDir: 'public/img/klinikk', cfg: 'klinikk' },
  { src: '/tmp/somi-klinikken-behandlingsrom.jpg',
    name: 'somi-klinikken-behandlingsrom',
    destDir: 'public/img/klinikk', cfg: 'klinikk' },
  { src: '/tmp/somi-klinikken-kunde-microblading-behandling.jpg',
    name: 'somi-klinikken-kunde-microblading-behandling',
    destDir: 'public/img/klinikk', cfg: 'klinikk' },

  // ── Resultater ───────────────────────────────────────────────────────────
  { src: '/tmp/microblading-resultat-somi-1.jpg',
    name: 'microblading-resultat-somi-klinikken-1',
    destDir: 'public/img/resultater', cfg: 'resultater' },
  { src: '/tmp/microblading-resultat-somi-2.jpg',
    name: 'microblading-resultat-somi-klinikken-2',
    destDir: 'public/img/resultater', cfg: 'resultater' },
  { src: '/tmp/permanent-makeup-resultat-somi-5.jpg',
    name: 'permanent-makeup-resultat-somi-klinikken-5',
    destDir: 'public/img/resultater', cfg: 'resultater' },
  { src: '/tmp/permanent-makeup-resultat-somi-6.jpg',
    name: 'permanent-makeup-resultat-somi-klinikken-6',
    destDir: 'public/img/resultater', cfg: 'resultater' },
]

// PNGs — copy as-is (no conversion)
const logos = [
  { src: '/tmp/somi-klinikken-logo-horizontal.png',
    dest: 'public/img/brand/somi-klinikken-logo-horizontal.png' },
]

// Video — direct copy
const videos = [
  { src: '/tmp/somi-klinikken-interior-video.mp4',
    dest: 'public/v/somi-klinikken-interior.mp4' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function kb(bytes) { return `${Math.round(bytes / 1024)} KB` }
function ensureDir(dir) { if (!existsSync(dir)) mkdirSync(dir, { recursive: true }) }

async function processImage({ src, name, destDir, cfg: cfgKey }) {
  if (!existsSync(src)) {
    console.log(`  ⏭  SKIP     ${name}`)
    return null
  }
  const { maxW, webpQ, jpgQ } = CFG[cfgKey]
  const origSize = statSync(src).size

  let meta
  try {
    meta = await sharp(src).metadata()
    if (!meta.width) throw new Error('invalid')
  } catch {
    console.log(`  ✗  INVALID  ${name}  (not a valid image)`)
    return null
  }

  ensureDir(destDir)
  const webpOut = `${destDir}/${name}.webp`
  const jpgOut  = `${destDir}/${name}.jpg`
  const base = sharp(src).resize({ width: maxW, withoutEnlargement: true })

  await base.clone().webp({ quality: webpQ, effort: 5 }).toFile(webpOut)
  await base.clone().jpeg({ quality: jpgQ, mozjpeg: true }).toFile(jpgOut)

  const webpSize = statSync(webpOut).size
  const jpgSize  = statSync(jpgOut).size
  const pct = Math.round((1 - webpSize / origSize) * 100)

  console.log(`  ✓  ${name}`)
  console.log(`     ${kb(origSize)} (${meta.width}×${meta.height}) → WebP ${kb(webpSize)} (−${pct}%) · JPG ${kb(jpgSize)}`)
  return { name, origSize, webpSize, jpgSize }
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log('SOMI Klinikken – Image Optimization Pipeline\n')
console.log('── Images ───────────────────────────────────')

const results = []
for (const entry of images) {
  const r = await processImage(entry)
  if (r) results.push(r)
}

console.log('\n── Logos (copy as-is) ───────────────────────')
for (const { src, dest } of logos) {
  if (!existsSync(src)) { console.log(`  ⏭  SKIP  ${dest}`); continue }
  ensureDir(dest.split('/').slice(0, -1).join('/'))
  copyFileSync(src, dest)
  console.log(`  ✓  ${dest.split('/').pop()}  (${kb(statSync(dest).size)})`)
}

console.log('\n── Video (copy as-is) ───────────────────────')
for (const { src, dest } of videos) {
  if (!existsSync(src)) { console.log(`  ⏭  SKIP  ${dest}`); continue }
  ensureDir(dest.split('/').slice(0, -1).join('/'))
  copyFileSync(src, dest)
  console.log(`  ✓  ${dest.split('/').pop()}  (${kb(statSync(dest).size)})`)
}

if (results.length) {
  const tot = (k) => results.reduce((s, r) => s + r[k], 0)
  console.log(`\n── Summary ──────────────────────────────────`)
  console.log(`   ${results.length} images processed`)
  console.log(`   Original : ${kb(tot('origSize'))}`)
  console.log(`   WebP     : ${kb(tot('webpSize'))}  (−${Math.round((1 - tot('webpSize') / tot('origSize')) * 100)}% avg)`)
  console.log(`   JPG      : ${kb(tot('jpgSize'))}`)
}
