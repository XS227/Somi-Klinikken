import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'

type Props = { params: Promise<{ slug: string }> }

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' })
}

function extractPlainText(content: unknown): string {
  if (!content || typeof content !== 'object') return ''
  const root = (content as { root?: { children?: unknown[] } }).root
  if (!root?.children) return ''
  const texts: string[] = []
  function walk(nodes: unknown[]) {
    for (const node of nodes) {
      const n = node as { type?: string; text?: string; children?: unknown[] }
      if (n.type === 'text' && n.text) texts.push(n.text)
      if (n.children) walk(n.children)
    }
  }
  walk(root.children)
  return texts.join(' ')
}

function RichTextRenderer({ content }: { content: unknown }) {
  if (!content || typeof content !== 'object') return null
  const root = (content as { root?: { children?: unknown[] } }).root
  if (!root?.children) return null

  function renderNodes(nodes: unknown[]): React.ReactNode[] {
    return nodes.map((node, i) => {
      const n = node as {
        type?: string; text?: string; format?: number; children?: unknown[];
        tag?: string; fields?: { url?: string; newTab?: boolean; doc?: unknown }
        value?: { url?: string; alt?: string; width?: number; height?: number }
      }
      if (n.type === 'text') {
        let el: React.ReactNode = n.text
        if (n.format && n.format & 1) el = <strong key={i}>{el}</strong>
        if (n.format && n.format & 2) el = <em key={i}>{el}</em>
        return <React.Fragment key={i}>{el}</React.Fragment>
      }
      if (n.type === 'paragraph') {
        const children = renderNodes(n.children ?? [])
        return <p key={i} style={{ marginTop: 18, marginBottom: 0 }}>{children}</p>
      }
      if (n.type === 'heading') {
        const tag = n.tag ?? 'h2'
        const fs = tag === 'h2' ? 26 : tag === 'h3' ? 21 : 18
        return React.createElement(tag, {
          key: i,
          style: { fontFamily: 'Georgia,serif', fontSize: fs, lineHeight: 1.3, margin: '32px 0 8px' },
        }, renderNodes(n.children ?? []))
      }
      if (n.type === 'list') {
        const Tag = n.tag === 'ol' ? 'ol' : 'ul'
        return <Tag key={i} style={{ paddingLeft: 24, marginTop: 16 }}>{renderNodes(n.children ?? [])}</Tag>
      }
      if (n.type === 'listitem') {
        return <li key={i} style={{ marginBottom: 6, lineHeight: 1.65 }}>{renderNodes(n.children ?? [])}</li>
      }
      if (n.type === 'link') {
        const url = n.fields?.url ?? '#'
        return <a key={i} href={url} target={n.fields?.newTab ? '_blank' : undefined} rel="noopener" style={{ color: '#6B7B8D', textDecoration: 'underline' }}>{renderNodes(n.children ?? [])}</a>
      }
      if (n.type === 'upload' && n.value?.url) {
        return (
          <figure key={i} style={{ margin: '24px 0' }}>
            <Image src={n.value.url} alt={n.value.alt ?? ''} width={n.value.width ?? 800} height={n.value.height ?? 500}
              style={{ width: '100%', height: 'auto', borderRadius: 12, display: 'block' }} />
          </figure>
        )
      }
      if (n.children) return <React.Fragment key={i}>{renderNodes(n.children)}</React.Fragment>
      return null
    })
  }

  return <>{renderNodes(root.children)}</>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    const post = result.docs[0] as {
      title: string; excerpt?: string | null; content?: unknown; published?: boolean
      meta?: { title?: string | null; description?: string | null } | null
      featuredImage?: { url?: string | null } | null
    } | undefined
    if (!post) return {}

    const plainText = extractPlainText(post.content)
    const desc = post.meta?.description ?? post.excerpt ?? plainText.slice(0, 155)
    const ogImage = post.featuredImage?.url ?? undefined
    const isDraft = post.published === false

    return {
      title: post.meta?.title ?? `${post.title} | SOMI Klinikken Sandnes`,
      description: desc,
      openGraph: {
        type: 'article',
        title: post.meta?.title ?? post.title,
        description: desc ?? undefined,
        images: ogImage ? [ogImage] : ['/img/brand/logo.png'],
      },
      alternates: isDraft ? undefined : {
        canonical: `https://somiklinikken.no/blogg/${slug}`,
      },
      robots: isDraft ? { index: false, follow: false } : undefined,
    }
  } catch {
    return {}
  }
}

export const revalidate = 60

export default async function BloggPostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  const post = result.docs[0] as {
    id: string; title: string; slug: string; excerpt?: string | null
    content?: unknown; publishedDate?: string | null; author?: string | null; published?: boolean
    featuredImage?: { url?: string | null; alt?: string | null; width?: number | null; height?: number | null } | null
  } | undefined

  if (!post) notFound()

  const relatedResult = await payload.find({
    collection: 'posts',
    where: { slug: { not_equals: slug }, published: { not_equals: false } },
    limit: 3,
    sort: '-publishedDate',
    depth: 1,
  })
  const related = relatedResult.docs as typeof post[]

  const plainText = extractPlainText(post.content)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt ?? plainText.slice(0, 155),
    author: { '@type': 'Organization', name: post.author ?? 'SOMI Klinikken' },
    publisher: {
      '@type': 'Organization',
      name: 'SOMI Klinikken',
      logo: { '@type': 'ImageObject', url: 'https://somiklinikken.no/img/brand/logo.png' },
    },
    datePublished: post.publishedDate ?? undefined,
    image: post.featuredImage?.url ?? 'https://somiklinikken.no/img/brand/logo.png',
    url: `https://somiklinikken.no/blogg/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main style={{ paddingTop: 0, paddingBottom: 64 }}>

        {post.published === false && (
          <div style={{
            background: '#DDB3B3', color: '#383838', textAlign: 'center',
            padding: '10px 16px', fontSize: 14, fontWeight: 600,
          }}>
            Kladd – ikke publisert offentlig. Kun synlig via denne lenken.
          </div>
        )}

        {/* Hero */}
        {post.featuredImage?.url ? (
          <div style={{ height: 420, position: 'relative', overflow: 'hidden' }}>
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt ?? post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55))',
            }} />
          </div>
        ) : (
          <div style={{
            height: 220, background: 'linear-gradient(135deg,#ede5dd 0%,#ddb3b3 100%)',
          }} />
        )}

        <div className="container" style={{ maxWidth: 780 }}>

          {/* Header */}
          <header style={{ marginTop: 40, marginBottom: 32 }}>
            <div className="kicker">
              {post.author ?? 'SOMI Klinikken'}{post.publishedDate ? ` · ${formatDate(post.publishedDate)}` : ''}
            </div>
            <h1 className="h1" style={{ marginTop: 10 }}>{post.title}</h1>
            {post.excerpt && (
              <p style={{ marginTop: 16, fontSize: 19, color: 'rgba(56,56,56,0.72)', lineHeight: 1.65 }}>
                {post.excerpt}
              </p>
            )}
          </header>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(56,56,56,0.10)', marginBottom: 32 }} />

          {/* Content */}
          <div style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--c-text)' }}>
            <RichTextRenderer content={post.content} />
          </div>

          {/* CTA */}
          <div style={{
            marginTop: 48, padding: '32px 28px', borderRadius: 22,
            background: 'linear-gradient(135deg,rgba(237,229,221,0.6),rgba(221,179,179,0.18))',
            border: '1px solid rgba(221,179,179,0.35)', display: 'grid', gap: 12,
          }}>
            <div className="kicker">Klar for behandling?</div>
            <h2 className="h2" style={{ margin: 0 }}>Book time hos SOMI Klinikken</h2>
            <p className="muted" style={{ maxWidth: '50ch' }}>
              Vi gir deg en gratis konsultasjon der vi vurderer hudtype, anbefaler teknikk og
              svarer på alle spørsmål.
            </p>
            <div className="cta-row" style={{ marginTop: 6 }}>
              <a className="btn btn--primary" href="/booking">Book time nå</a>
              <a className="btn" href="/priser">Se priser</a>
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <section style={{ marginTop: 64 }}>
              <h2 className="h2" style={{ marginBottom: 24 }}>Les også</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20 }}>
                {related.map((rel) => rel && (
                  <a
                    key={rel.id}
                    href={`/blogg/${rel.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <article style={{
                      borderRadius: 16, border: '1px solid rgba(56,56,56,0.08)',
                      background: '#fff', padding: 18, display: 'grid', gap: 8,
                      boxShadow: '0 6px 18px rgba(0,0,0,0.04)',
                      transition: 'transform 180ms ease',
                    }}>
                      <h3 style={{ fontFamily: 'Georgia,serif', fontSize: 16, lineHeight: 1.3, margin: 0 }}>
                        {rel.title}
                      </h3>
                      {rel.excerpt && (
                        <p style={{ fontSize: 13, color: 'rgba(56,56,56,0.65)', lineHeight: 1.5, margin: 0 }}>
                          {rel.excerpt.slice(0, 90)}…
                        </p>
                      )}
                      <span style={{ fontSize: 13, color: '#6B7B8D', fontWeight: 600 }}>Les mer →</span>
                    </article>
                  </a>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </>
  )
}
