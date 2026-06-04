/**
 * Migrates existing Payload block data → Puck JSON format.
 * Writes puckData directly to MongoDB (bypasses Payload schema validation).
 * richText blocks are skipped — user will re-author those in Puck.
 *
 * Run: node migrate-to-puck.mjs
 */

import { MongoClient } from 'mongodb'

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1/somi-klinikken'
const DB_NAME = DATABASE_URL.split('/').pop().split('?')[0]

let idCounter = 1
function uid(type) { return `${type}-${idCounter++}` }

function blocksToPuck(layout) {
  if (!Array.isArray(layout) || layout.length === 0) return null

  const content = []

  for (const block of layout) {
    switch (block.blockType) {

      case 'hero':
        content.push({
          type: 'Hero',
          props: {
            id: uid('Hero'),
            kicker:      block.kicker      ?? '',
            heading:     block.heading     ?? '',
            subheading:  block.subheading  ?? '',
            body:        block.body        ?? '',
            buttons:     (block.buttons    ?? []).map(b => ({ label: b.label ?? '', url: b.url ?? '', primary: b.primary ?? false })),
            features:    (block.features   ?? []).map(f => ({ kicker: f.kicker ?? '', title: f.title ?? '', desc: f.desc ?? '' })),
            quote:       block.quote       ?? '',
            quoteAuthor: block.quoteAuthor ?? '',
          },
        })
        break

      case 'teamGrid':
        content.push({
          type: 'TeamGrid',
          props: {
            id: uid('TeamGrid'),
            members: (block.members ?? []).map(m => ({
              name:     m.name     ?? '',
              role:     m.role     ?? '',
              bio:      m.bio      ?? '',
              bio2:     m.bio2     ?? '',
              quote:    m.quote    ?? '',
              imageSrc: m.imageSrc ?? '',
              ctaLabel: m.ctaLabel ?? 'Bestill time',
              ctaUrl:   m.ctaUrl   ?? 'https://somi.bestille.no/',
              featured: m.featured ?? false,
            })),
          },
        })
        break

      case 'gallery':
        content.push({
          type: 'Gallery',
          props: {
            id: uid('Gallery'),
            albums: (block.albums ?? []).map(a => ({
              title: a.title ?? '',
              items: (a.items ?? []).map(it => ({
                mediaType: it.mediaType ?? 'img',
                src:       it.src       ?? '',
                alt:       it.alt       ?? '',
              })),
            })),
          },
        })
        break

      case 'blogList':
        content.push({
          type: 'BlogList',
          props: {
            id: uid('BlogList'),
            posts: (block.posts ?? []).map(p => ({
              kicker: p.kicker ?? '',
              title:  p.title  ?? '',
              desc:   p.desc   ?? '',
              href:   p.href   ?? '#',
            })),
          },
        })
        break

      case 'contactInfo':
        content.push({
          type: 'ContactInfo',
          props: {
            id:       uid('ContactInfo'),
            phone:    block.phone    ?? '',
            email:    block.email    ?? '',
            address:  block.address  ?? '',
            city:     block.city     ?? '',
            hours:    block.hours    ?? '',
            mapEmbed: block.mapEmbed ?? '',
          },
        })
        break

      case 'giftCard':
        content.push({
          type: 'GiftCard',
          props: {
            id:       uid('GiftCard'),
            intro:    block.intro    ?? '',
            options:  (block.options ?? []).map(o => ({ label: o.label ?? '', price: o.price ?? '', desc: o.desc ?? '' })),
            note:     block.note     ?? '',
            ctaLabel: block.ctaLabel ?? 'Bestill gavekort',
            ctaUrl:   block.ctaUrl   ?? 'https://somi.bestille.no/',
          },
        })
        break

      case 'richText':
        // Skip — user will re-author richText content in Puck's RichText block
        console.log(`  ⚠ Skipping richText block (will need manual re-authoring)`)
        break

      default:
        console.log(`  ⚠ Unknown block type: ${block.blockType}`)
    }
  }

  if (content.length === 0) return null

  return { content, root: { props: {} } }
}

// ─── Run migration ────────────────────────────────────────────────────────────

const client = new MongoClient(DATABASE_URL)
await client.connect()
const db = client.db(DB_NAME)
const col = db.collection('pages')

const pages = await col.find({}).toArray()
console.log(`Found ${pages.length} pages`)

for (const page of pages) {
  idCounter = 1  // reset per-page so IDs are stable
  const layout = page.layout ?? []

  if (layout.length === 0 && !page.puckData) {
    console.log(`Skipping /${page.slug} (no layout data)`)
    continue
  }

  if (page.puckData?.content?.length > 0) {
    console.log(`Skipping /${page.slug} (already has puckData)`)
    continue
  }

  console.log(`Migrating /${page.slug} (${layout.length} blocks)...`)
  const puckData = blocksToPuck(layout)

  if (puckData) {
    await col.updateOne({ _id: page._id }, { $set: { puckData } })
    console.log(`  ✓ Wrote ${puckData.content.length} Puck components`)
  } else {
    console.log(`  — Nothing to migrate (all blocks were skipped)`)
  }
}

await client.close()
console.log('\nMigration complete.')
process.exit(0)
