/**
 * Seed: oppretter en "Hjemside"-side i Pages-samlingen
 * Kjør: node seed-homepage.mjs
 */
import 'dotenv/config'
import { MongoClient } from 'mongodb'

const url = process.env.DATABASE_URL || 'mongodb://127.0.0.1/somi-klinikken'
const dbName = new URL(url.replace('mongodb://', 'http://')).pathname.slice(1) || 'somi-klinikken'

async function run() {
  const client = new MongoClient(url)
  await client.connect()
  const db = client.db(dbName)
  const col = db.collection('pages')

  const existing = await col.findOne({ slug: 'home' })
  if (existing) {
    console.log('✓ Hjemside-side finnes allerede (slug: home)')
    await client.close()
    return
  }

  const now = new Date()
  await col.insertOne({
    title: 'Hjemside',
    slug: 'home',
    puckData: null,
    meta: {
      title: 'SOMI Klinikken i Sandnes | Microblading, Permanent Makeup, Hud & Laser',
      description: 'SOMI Klinikken i Sandnes tilbyr microblading, permanent makeup, bryn og vipper, hudpleie og laser.',
    },
    createdAt: now,
    updatedAt: now,
  })

  console.log('✓ Hjemside-side opprettet (slug: home)')
  await client.close()
}

run().catch((err) => { console.error(err); process.exit(1) })
