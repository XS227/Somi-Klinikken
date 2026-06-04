import sharp from 'sharp'
import path from 'path'

const OUT = '/apps/somi-klinikken/public/img/resultater'

const files = [
  { src: '/tmp/r1.jpg', name: 'microblading-foer-etter-somi-klinikken-sandnes-1' },
  { src: '/tmp/r2.jpg', name: 'microblading-bryn-resultat-somi-klinikken-2' },
  { src: '/tmp/r3.jpg', name: 'permanent-makeup-powder-brows-somi-sandnes-3' },
  { src: '/tmp/r4.jpg', name: 'permanent-makeup-naturlige-bryn-somi-4' },
  { src: '/tmp/r5.jpg', name: 'permanent-makeup-resultat-somi-klinikken-5' },
  { src: '/tmp/r6.jpg', name: 'microblading-shading-kombinasjon-somi-6' },
  { src: '/tmp/r7.jpg', name: 'permanent-makeup-foer-etter-somi-sandnes-7' },
]

for (const f of files) {
  const base = path.join(OUT, f.name)

  await sharp(f.src)
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 82 })
    .withMetadata(false)
    .toFile(`${base}.webp`)

  await sharp(f.src)
    .resize({ width: 1000, withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .withMetadata(false)
    .toFile(`${base}.jpg`)

  console.log(`✓ ${f.name}`)
}

console.log('All images optimized!')
