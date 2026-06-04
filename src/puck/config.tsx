import React from 'react'
import type { Config } from '@measured/puck'

const BOOKING = '/booking'

// ─── Types ────────────────────────────────────────────────────────────────────

type Button = { label: string; url: string; primary: boolean }
type Feature = { kicker: string; title: string; desc: string }
type TeamMember = {
  name: string; role: string; bio: string; bio2: string; quote: string
  imageSrc: string; ctaLabel: string; ctaUrl: string; featured: boolean
}
type GalleryItem = { mediaType: 'img' | 'video'; src: string; alt: string }
type Album = { title: string; items: GalleryItem[] }
type BlogPost = { kicker: string; title: string; desc: string; href: string }
type GiftCardOption = { label: string; price: string; desc: string }

// ─── Render helpers ───────────────────────────────────────────────────────────

function Section({ children }: { children: React.ReactNode }) {
  return <section style={{ marginBottom: 22 }}>{children}</section>
}

// ─── Puck component config ────────────────────────────────────────────────────

export const puckConfig: Config = {
  components: {

    // ── Hero ─────────────────────────────────────────────────────────────────
    Hero: {
      label: 'Hero-seksjon',
      fields: {
        kicker:      { type: 'text',     label: 'Kicker (liten tekst over tittel)' },
        heading:     { type: 'text',     label: 'Overskrift' },
        subheading:  { type: 'textarea', label: 'Undertekst (kursiv)' },
        body:        { type: 'textarea', label: 'Ingress' },
        buttons: {
          type: 'array', label: 'Knapper',
          arrayFields: {
            label:   { type: 'text', label: 'Knappetekst' },
            url:     { type: 'text', label: 'URL' },
            primary: { type: 'radio', label: 'Primærknapp (mørk)', options: [{ label: 'Ja', value: true }, { label: 'Nei', value: false }] },
          },
          defaultItemProps: { label: 'Book time', url: BOOKING, primary: false },
          getItemSummary: (item: Button) => item.label || 'Knapp',
        },
        features: {
          type: 'array', label: 'Egenskaper (3-kolonne tiles)',
          arrayFields: {
            kicker: { type: 'text',     label: 'Kicker' },
            title:  { type: 'text',     label: 'Tittel' },
            desc:   { type: 'textarea', label: 'Beskrivelse' },
          },
          getItemSummary: (item: Feature) => item.title || 'Egenskap',
        },
        quote:       { type: 'textarea', label: 'Sitat (vises som blockquote)' },
        quoteAuthor: { type: 'text',     label: 'Sitatforfatter' },
      },
      defaultProps: {
        kicker: '', heading: 'Ny overskrift', subheading: '', body: '',
        buttons: [], features: [], quote: '', quoteAuthor: '',
      },
      render: ({ kicker, heading, subheading, body, buttons, features, quote, quoteAuthor }) => (
        <Section>
          {kicker && <div className="kicker">{kicker}</div>}
          <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(36px,5.2vw,58px)', lineHeight: 1.03, margin: '10px 0 12px', letterSpacing: '-0.01em' }}>
            {heading}
          </h1>
          {subheading && (
            <p style={{ fontSize: 'clamp(16px,2.2vw,22px)', fontStyle: 'italic', letterSpacing: '.02em', color: 'rgba(56,56,56,.78)', margin: '6px 0 16px' }}>
              {subheading}
            </p>
          )}
          {body && <p className="muted" style={{ maxWidth: '74ch', lineHeight: 1.65 }}>{body}</p>}
          {buttons && buttons.length > 0 && (
            <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {buttons.map((btn: Button, i: number) => (
                <a key={i} className={`btn${btn.primary ? ' btn--primary' : ''}`} href={btn.url}
                  target={btn.url?.startsWith('http') ? '_blank' : undefined}
                  rel={btn.url?.startsWith('http') ? 'noopener' : undefined}>
                  {btn.label}
                </a>
              ))}
            </div>
          )}
          {features && features.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginTop: 22 }}>
              {features.map((f: Feature, i: number) => (
                <div key={i} className="tile">
                  {f.kicker && <div className="kicker">{f.kicker}</div>}
                  {f.title && <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 20, margin: '6px 0 8px' }}>{f.title}</h3>}
                  {f.desc && <p className="muted">{f.desc}</p>}
                </div>
              ))}
            </div>
          )}
          {quote && (
            <blockquote style={{ marginTop: 16, padding: 18, borderRadius: 22, background: 'rgba(255,255,255,0.70)', border: '1px solid rgba(56,56,56,0.10)', boxShadow: '0 14px 34px rgba(0,0,0,0.06)' }}>
              <p className="muted" style={{ lineHeight: 1.75 }}>{quote}</p>
              {quoteAuthor && <footer style={{ marginTop: 10, color: 'rgba(56,56,56,.68)', fontSize: 14 }}>{quoteAuthor}</footer>}
            </blockquote>
          )}
        </Section>
      ),
    },

    // ── RichText ─────────────────────────────────────────────────────────────
    RichText: {
      label: 'Tekstblokk',
      fields: {
        content: { type: 'textarea', label: 'Innhold (støtter enkel HTML)' },
      },
      defaultProps: { content: '' },
      render: ({ content }) => (
        <Section>
          {/* eslint-disable-next-line react/no-danger */}
          <div className="rich-text" dangerouslySetInnerHTML={{ __html: content ?? '' }} />
        </Section>
      ),
    },

    // ── TeamGrid ─────────────────────────────────────────────────────────────
    TeamGrid: {
      label: 'Team-grid',
      fields: {
        members: {
          type: 'array', label: 'Teammedlemmer',
          arrayFields: {
            name:     { type: 'text',     label: 'Navn' },
            role:     { type: 'text',     label: 'Rolle / tittel' },
            bio:      { type: 'textarea', label: 'Bio (første avsnitt)' },
            bio2:     { type: 'textarea', label: 'Bio (andre avsnitt)' },
            quote:    { type: 'textarea', label: 'Sitat' },
            imageSrc: { type: 'text',     label: 'Bildesti (f.eks. /assets/img/team/katarina.svg)' },
            ctaLabel: { type: 'text',     label: 'Knappetekst' },
            ctaUrl:   { type: 'text',     label: 'Knappelenke' },
            featured: { type: 'radio',    label: 'Fremhevet (hel bredde)', options: [{ label: 'Ja', value: true }, { label: 'Nei', value: false }] },
          },
          defaultItemProps: { name: 'Navn', role: '', bio: '', bio2: '', quote: '', imageSrc: '', ctaLabel: 'Bestill time', ctaUrl: BOOKING, featured: false },
          getItemSummary: (item: TeamMember) => item.name || 'Teammedlem',
        },
      },
      defaultProps: { members: [] },
      render: ({ members }) => (
        <Section>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 16 }}>
            {(members as TeamMember[]).map((m, i) =>
              m.featured ? (
                <article key={i} style={{ gridColumn: '1/-1', borderRadius: 22, background: 'rgba(255,255,255,0.76)', border: '1px solid rgba(56,56,56,0.12)', boxShadow: '0 14px 34px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)' }}>
                  {m.imageSrc && (
                    <div style={{ padding: '18px 18px 14px' }}>
                      <img src={m.imageSrc} alt={m.name} style={{ width: '100%', aspectRatio: '5/4', maxHeight: 260, objectFit: 'cover', borderRadius: 18, border: '1px solid rgba(56,56,56,0.08)', display: 'block' }} loading="lazy" />
                    </div>
                  )}
                  <div style={{ padding: '24px 22px', display: 'grid', gap: 14, alignContent: 'start' }}>
                    {m.role && <div className="kicker">{m.role}</div>}
                    <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 28, lineHeight: 1.05, margin: 0 }}>{m.name}</h2>
                    {m.bio   && <p className="muted" style={{ fontSize: 15 }}>{m.bio}</p>}
                    {m.bio2  && <p className="muted" style={{ fontSize: 15 }}>{m.bio2}</p>}
                    {m.quote && <p className="muted" style={{ fontSize: 15, fontStyle: 'italic' }}>{m.quote}</p>}
                    {m.ctaUrl && <a className="btn" href={m.ctaUrl} target="_blank" rel="noopener" style={{ alignSelf: 'start' }}>{m.ctaLabel || 'Bestill time'}</a>}
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
                    {m.bio  && <p className="muted" style={{ fontSize: 15 }}>{m.bio}</p>}
                    {m.bio2 && <p className="muted" style={{ fontSize: 15 }}>{m.bio2}</p>}
                    {m.ctaUrl && <a className="btn" href={m.ctaUrl} target="_blank" rel="noopener" style={{ justifyContent: 'center' }}>{m.ctaLabel || 'Bestill time'}</a>}
                  </div>
                </article>
              )
            )}
          </div>
        </Section>
      ),
    },

    // ── Gallery ──────────────────────────────────────────────────────────────
    Gallery: {
      label: 'Galleri',
      fields: {
        albums: {
          type: 'array', label: 'Album',
          arrayFields: {
            title: { type: 'text', label: 'Albumtittel' },
            items: {
              type: 'array', label: 'Mediafiler',
              arrayFields: {
                mediaType: { type: 'radio', label: 'Type', options: [{ label: 'Bilde', value: 'img' }, { label: 'Video', value: 'video' }] },
                src: { type: 'text', label: 'Filsti' },
                alt: { type: 'text', label: 'Alt-tekst' },
              },
              defaultItemProps: { mediaType: 'img', src: '', alt: '' },
              getItemSummary: (item: GalleryItem) => item.src || 'Mediafil',
            },
          },
          defaultItemProps: { title: 'Album', items: [] },
          getItemSummary: (item: Album) => item.title || 'Album',
        },
      },
      defaultProps: { albums: [] },
      render: ({ albums }) => (
        <Section>
          <div style={{ display: 'grid', gap: 24 }}>
            {(albums as Album[]).map((album, ai) => (
              <div key={ai} className="card" style={{ padding: 18 }}>
                <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 22, margin: '0 0 14px' }}>{album.title}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
                  {(album.items ?? []).map((item, ii) => (
                    <figure key={ii} style={{ margin: 0, borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(56,56,56,0.10)' }}>
                      {item.mediaType === 'video'
                        ? <video src={item.src} controls style={{ width: '100%', display: 'block', maxHeight: 240, objectFit: 'cover' }} />
                        : <img src={item.src} alt={item.alt ?? album.title} loading="lazy" style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />}
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      ),
    },

    // ── BlogList ─────────────────────────────────────────────────────────────
    BlogList: {
      label: 'Blogg-liste',
      fields: {
        posts: {
          type: 'array', label: 'Innlegg',
          arrayFields: {
            kicker: { type: 'text',     label: 'Kategori / kicker' },
            title:  { type: 'text',     label: 'Tittel' },
            desc:   { type: 'textarea', label: 'Ingress' },
            href:   { type: 'text',     label: 'Lenke' },
          },
          defaultItemProps: { kicker: '', title: 'Nytt innlegg', desc: '', href: '#' },
          getItemSummary: (item: BlogPost) => item.title || 'Innlegg',
        },
      },
      defaultProps: { posts: [] },
      render: ({ posts }) => (
        <Section>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
            {(posts as BlogPost[]).map((post, i) => (
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
        </Section>
      ),
    },

    // ── ContactInfo ──────────────────────────────────────────────────────────
    ContactInfo: {
      label: 'Kontaktinfo',
      fields: {
        phone:    { type: 'text',     label: 'Telefon' },
        email:    { type: 'text',     label: 'E-post' },
        address:  { type: 'text',     label: 'Adresse' },
        city:     { type: 'text',     label: 'Poststed' },
        hours:    { type: 'textarea', label: 'Åpningstider' },
        mapEmbed: { type: 'textarea', label: 'Google Maps embed URL (src til iframe)' },
      },
      defaultProps: { phone: '', email: '', address: '', city: '', hours: '', mapEmbed: '' },
      render: ({ phone, email, address, city, hours, mapEmbed }) => (
        <Section>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
            <div className="card" style={{ padding: 18 }}>
              <div className="kicker">Praktisk</div>
              <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 28, lineHeight: 1.08, margin: '8px 0 12px' }}>Adresse og kontakt</h2>
              {address && <p className="muted"><strong>Adresse</strong><br />{address}{city ? `, ${city}` : ''}</p>}
              {phone   && <p className="muted" style={{ marginTop: 10 }}><strong>Telefon</strong><br /><a href={`tel:${phone.replace(/\s/g,'')}`} style={{ color: 'inherit' }}>{phone}</a></p>}
              {email   && <p className="muted" style={{ marginTop: 10 }}><strong>E-post</strong><br /><a href={`mailto:${email}`} style={{ color: 'inherit' }}>{email}</a></p>}
              {hours   && <p className="muted" style={{ marginTop: 10 }}><strong>Åpningstider</strong><br />{hours}</p>}
              <div style={{ marginTop: 14 }}>
                <a className="btn btn--primary" href={BOOKING} target="_blank" rel="noopener">Book time</a>
              </div>
            </div>
            {mapEmbed && (
              <div className="card" style={{ padding: 0, overflow: 'hidden', minHeight: 260 }}>
                <iframe src={mapEmbed} width="100%" height="100%" style={{ border: 0, minHeight: 260, display: 'block' }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" title="Kart" />
              </div>
            )}
          </div>
        </Section>
      ),
    },

    // ── GiftCard ─────────────────────────────────────────────────────────────
    GiftCard: {
      label: 'Gavekort',
      fields: {
        intro: { type: 'textarea', label: 'Ingress' },
        options: {
          type: 'array', label: 'Gavekort-alternativer',
          arrayFields: {
            label: { type: 'text',     label: 'Tittel' },
            price: { type: 'text',     label: 'Pris (f.eks. «fra kr 500»)' },
            desc:  { type: 'textarea', label: 'Beskrivelse' },
          },
          defaultItemProps: { label: 'Gavekort', price: '', desc: '' },
          getItemSummary: (item: GiftCardOption) => item.label || 'Gavekort',
        },
        note:     { type: 'textarea', label: 'Vilkår / merknad' },
        ctaLabel: { type: 'text',     label: 'Knappetekst' },
        ctaUrl:   { type: 'text',     label: 'Knappelenke' },
      },
      defaultProps: { intro: '', options: [], note: '', ctaLabel: 'Bestill gavekort', ctaUrl: BOOKING },
      render: ({ intro, options, note, ctaLabel, ctaUrl }) => (
        <Section>
          {intro && <p className="muted" style={{ maxWidth: '72ch', lineHeight: 1.65, marginBottom: 18 }}>{intro}</p>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
            {(options as GiftCardOption[]).map((opt, i) => (
              <div key={i} className="card" style={{ padding: 18, display: 'grid', gap: 8 }}>
                <div className="kicker">Gavekort</div>
                <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 22, margin: 0 }}>{opt.label}</h3>
                {opt.price && <p style={{ fontWeight: 600, fontSize: 18, margin: 0 }}>{opt.price}</p>}
                {opt.desc  && <p className="muted" style={{ fontSize: 14, margin: 0 }}>{opt.desc}</p>}
              </div>
            ))}
          </div>
          {note && <p className="muted" style={{ marginTop: 14, fontSize: 13 }}>{note}</p>}
          {ctaUrl && (
            <div style={{ marginTop: 16 }}>
              <a className="btn btn--primary" href={ctaUrl} target="_blank" rel="noopener">{ctaLabel || 'Bestill gavekort'}</a>
            </div>
          )}
        </Section>
      ),
    },

  },
}
