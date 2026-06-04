import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

const BOOKING = '/booking'

// ─── Block type shapes ────────────────────────────────────────────────────────

type Button = { label: string; url: string; primary?: boolean }
type Feature = { kicker?: string; title?: string; desc?: string }

type HeroBlock = {
  blockType: 'hero'
  kicker?: string
  heading: string
  subheading?: string
  body?: string
  buttons?: Button[]
  features?: Feature[]
  quote?: string
  quoteAuthor?: string
}

type RichTextBlock = {
  blockType: 'richText'
  content?: unknown
}

type TeamMember = {
  name: string
  role?: string
  bio?: string
  bio2?: string
  quote?: string
  imageSrc?: string
  ctaLabel?: string
  ctaUrl?: string
  featured?: boolean
}

type TeamGridBlock = {
  blockType: 'teamGrid'
  members?: TeamMember[]
}

type GalleryItem = { mediaType?: 'img' | 'video'; src: string; alt?: string }
type Album = { title: string; items?: GalleryItem[] }

type GalleryBlock = {
  blockType: 'gallery'
  albums?: Album[]
}

type BlogPost = { kicker?: string; title: string; desc?: string; href?: string }

type BlogListBlock = {
  blockType: 'blogList'
  posts?: BlogPost[]
}

type ContactInfoBlock = {
  blockType: 'contactInfo'
  phone?: string
  email?: string
  address?: string
  city?: string
  hours?: string
  mapEmbed?: string
}

type GiftCardOption = { label: string; price?: string; desc?: string }

type GiftCardBlock = {
  blockType: 'giftCard'
  intro?: string
  options?: GiftCardOption[]
  note?: string
  ctaLabel?: string
  ctaUrl?: string
}

type AnyBlock = HeroBlock | RichTextBlock | TeamGridBlock | GalleryBlock | BlogListBlock | ContactInfoBlock | GiftCardBlock

// ─── Renderers ────────────────────────────────────────────────────────────────

function Hero({ b }: { b: HeroBlock }) {
  return (
    <section style={{ marginBottom: 22 }}>
      {b.kicker && <div className="kicker">{b.kicker}</div>}
      <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(36px,5.2vw,58px)', lineHeight: 1.03, margin: '10px 0 12px', letterSpacing: '-0.01em' }}>
        {b.heading}
      </h1>
      {b.subheading && (
        <p style={{ fontSize: 'clamp(16px,2.2vw,22px)', fontStyle: 'italic', letterSpacing: '.02em', color: 'rgba(56,56,56,.78)', margin: '6px 0 16px' }}>
          {b.subheading}
        </p>
      )}
      {b.body && <p className="muted" style={{ maxWidth: '74ch', lineHeight: 1.65 }}>{b.body}</p>}
      {b.buttons && b.buttons.length > 0 && (
        <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {b.buttons.map((btn, i) => (
            <a key={i} className={`btn${btn.primary ? ' btn--primary' : ''}`} href={btn.url} target={btn.url.startsWith('http') ? '_blank' : undefined} rel={btn.url.startsWith('http') ? 'noopener' : undefined}>
              {btn.label}
            </a>
          ))}
        </div>
      )}
      {b.features && b.features.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginTop: 22 }}>
          {b.features.map((f, i) => (
            <div key={i} className="tile">
              {f.kicker && <div className="kicker">{f.kicker}</div>}
              {f.title && <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 20, margin: '6px 0 8px' }}>{f.title}</h3>}
              {f.desc && <p className="muted">{f.desc}</p>}
            </div>
          ))}
        </div>
      )}
      {b.quote && (
        <blockquote style={{ marginTop: 16, padding: 18, borderRadius: 22, background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(56,56,56,0.10)', boxShadow: '0 14px 34px rgba(0,0,0,0.06)' }}>
          <p className="muted" style={{ lineHeight: 1.75 }}>{b.quote}</p>
          {b.quoteAuthor && <footer style={{ marginTop: 10, color: 'rgba(56,56,56,.68)', fontSize: 14 }}>{b.quoteAuthor}</footer>}
        </blockquote>
      )}
    </section>
  )
}

function RichTextRenderer({ b }: { b: RichTextBlock }) {
  if (!b.content) return null
  return (
    <section style={{ marginBottom: 22 }}>
      <div className="rich-text">
        <RichText data={b.content as Parameters<typeof RichText>[0]['data']} />
      </div>
    </section>
  )
}

function TeamGrid({ b }: { b: TeamGridBlock }) {
  const members = b.members ?? []
  return (
    <section style={{ marginBottom: 22 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 16 }}>
        {members.map((m, i) => (
          m.featured ? (
            <article key={i} style={{ gridColumn: '1 / -1', borderRadius: 22, background: 'rgba(255,255,255,0.76)', border: '1px solid rgba(56,56,56,0.12)', boxShadow: '0 14px 34px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)', gap: 0 }}>
              {m.imageSrc && (
                <div style={{ padding: '18px 18px 14px' }}>
                  <img src={m.imageSrc} alt={m.name} style={{ width: '100%', aspectRatio: '5/4', maxHeight: 260, objectFit: 'cover', borderRadius: 18, border: '1px solid rgba(56,56,56,0.08)', display: 'block' }} loading="lazy" />
                </div>
              )}
              <div style={{ padding: '24px 22px', display: 'grid', gap: 14, alignContent: 'start' }}>
                {m.role && <div className="kicker">{m.role}</div>}
                <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 28, lineHeight: 1.05, margin: '0' }}>{m.name}</h2>
                {m.bio && <p className="muted" style={{ fontSize: 15 }}>{m.bio}</p>}
                {m.bio2 && <p className="muted" style={{ fontSize: 15 }}>{m.bio2}</p>}
                {m.quote && <p className="muted" style={{ fontSize: 15, fontStyle: 'italic' }}>{m.quote}</p>}
                {m.ctaUrl && <a className="btn" href={m.ctaUrl} target="_blank" rel="noopener" style={{ alignSelf: 'start', justifyContent: 'center' }}>{m.ctaLabel ?? 'Bestill time'}</a>}
              </div>
            </article>
          ) : (
            <article key={i} style={{ borderRadius: 22, background: 'rgba(255,255,255,0.76)', border: '1px solid rgba(56,56,56,0.12)', boxShadow: '0 14px 34px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'grid', alignContent: 'start' }}>
              <div style={{ padding: '18px 18px 0' }}>
                {m.role && <div className="kicker">{m.role}</div>}
                <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 26, lineHeight: 1.05, margin: '6px 0 14px' }}>{m.name}</h2>
                {m.imageSrc && <img src={m.imageSrc} alt={m.name} style={{ width: '100%', aspectRatio: '5/4', maxHeight: 200, objectFit: 'cover', borderRadius: 18, border: '1px solid rgba(56,56,56,0.08)', display: 'block' }} loading="lazy" />}
              </div>
              <div style={{ padding: '14px 18px 18px', display: 'grid', gap: 12 }}>
                {m.bio && <p className="muted" style={{ fontSize: 15 }}>{m.bio}</p>}
                {m.bio2 && <p className="muted" style={{ fontSize: 15 }}>{m.bio2}</p>}
                {m.ctaUrl && <a className="btn" href={m.ctaUrl} target="_blank" rel="noopener" style={{ justifyContent: 'center' }}>{m.ctaLabel ?? 'Bestill time'}</a>}
              </div>
            </article>
          )
        ))}
      </div>
    </section>
  )
}

function Gallery({ b }: { b: GalleryBlock }) {
  const albums = b.albums ?? []
  return (
    <section style={{ marginBottom: 22 }}>
      <div style={{ display: 'grid', gap: 24 }}>
        {albums.map((album, ai) => (
          <div key={ai} className="card" style={{ padding: 18 }}>
            <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 22, margin: '0 0 14px' }}>{album.title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
              {(album.items ?? []).map((item, ii) => (
                <figure key={ii} style={{ margin: 0, borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(56,56,56,0.10)' }}>
                  {item.mediaType === 'video' ? (
                    <video src={item.src} controls style={{ width: '100%', display: 'block', maxHeight: 240, objectFit: 'cover' }} />
                  ) : (
                    <img src={item.src} alt={item.alt ?? album.title} loading="lazy" style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
                  )}
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function BlogList({ b }: { b: BlogListBlock }) {
  const posts = b.posts ?? []
  return (
    <section style={{ marginBottom: 22 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
        {posts.map((post, i) => (
          <a key={i} href={post.href ?? '#'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <article className="card" style={{ padding: 18, height: '100%', display: 'grid', alignContent: 'start', gap: 8 }}>
              {post.kicker && <div className="kicker">{post.kicker}</div>}
              <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 20, lineHeight: 1.2, margin: 0 }}>{post.title}</h2>
              {post.desc && <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{post.desc}</p>}
              <span style={{ fontSize: 13, color: 'rgba(56,56,56,.6)', marginTop: 4 }}>Les mer →</span>
            </article>
          </a>
        ))}
      </div>
    </section>
  )
}

function ContactInfo({ b }: { b: ContactInfoBlock }) {
  return (
    <section style={{ marginBottom: 22 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="kicker">Praktisk</div>
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 28, lineHeight: 1.08, margin: '8px 0 12px' }}>Adresse og kontakt</h2>
          {b.address && <p className="muted"><strong>Adresse</strong><br />{b.address}{b.city ? `, ${b.city}` : ''}</p>}
          {b.phone && <p className="muted" style={{ marginTop: 10 }}><strong>Telefon</strong><br /><a href={`tel:${b.phone.replace(/\s/g, '')}`} style={{ color: 'inherit' }}>{b.phone}</a></p>}
          {b.email && <p className="muted" style={{ marginTop: 10 }}><strong>E-post</strong><br /><a href={`mailto:${b.email}`} style={{ color: 'inherit' }}>{b.email}</a></p>}
          {b.hours && <p className="muted" style={{ marginTop: 10 }}><strong>Åpningstider</strong><br />{b.hours}</p>}
          <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a className="btn btn--primary" href={BOOKING} target="_blank" rel="noopener">Book time</a>
          </div>
        </div>
        {b.mapEmbed && (
          <div className="card" style={{ padding: 0, overflow: 'hidden', minHeight: 260 }}>
            <iframe src={b.mapEmbed} width="100%" height="100%" style={{ border: 0, minHeight: 260, display: 'block' }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" title="Kart" />
          </div>
        )}
      </div>
    </section>
  )
}

function GiftCard({ b }: { b: GiftCardBlock }) {
  const options = b.options ?? []
  return (
    <section style={{ marginBottom: 22 }}>
      {b.intro && <p className="muted" style={{ maxWidth: '72ch', lineHeight: 1.65, marginBottom: 18 }}>{b.intro}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
        {options.map((opt, i) => (
          <div key={i} className="card" style={{ padding: 18, display: 'grid', gap: 8 }}>
            <div className="kicker">Gavekort</div>
            <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 22, margin: 0 }}>{opt.label}</h3>
            {opt.price && <p style={{ fontWeight: 600, fontSize: 18, margin: 0 }}>{opt.price}</p>}
            {opt.desc && <p className="muted" style={{ fontSize: 14, margin: 0 }}>{opt.desc}</p>}
          </div>
        ))}
      </div>
      {b.note && <p className="muted" style={{ marginTop: 14, fontSize: 13 }}>{b.note}</p>}
      {b.ctaUrl && (
        <div style={{ marginTop: 16 }}>
          <a className="btn btn--primary" href={b.ctaUrl} target="_blank" rel="noopener">{b.ctaLabel ?? 'Bestill gavekort'}</a>
        </div>
      )}
    </section>
  )
}

// ─── Main renderer ─────────────────────────────────────────────────────────────

export function BlockRenderer({ blocks }: { blocks: AnyBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case 'hero':        return <Hero key={i} b={block} />
          case 'richText':    return <RichTextRenderer key={i} b={block} />
          case 'teamGrid':    return <TeamGrid key={i} b={block} />
          case 'gallery':     return <Gallery key={i} b={block} />
          case 'blogList':    return <BlogList key={i} b={block} />
          case 'contactInfo': return <ContactInfo key={i} b={block} />
          case 'giftCard':    return <GiftCard key={i} b={block} />
          default:            return null
        }
      })}
    </>
  )
}
