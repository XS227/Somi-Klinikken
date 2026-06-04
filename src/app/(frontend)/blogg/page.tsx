import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Blogg | SOMI Klinikken Sandnes',
  description:
    'Les våre artikler om microblading, permanent makeup, laser hårfjerning og hudpleie hos SOMI Klinikken i Sandnes.',
  openGraph: {
    type: 'website',
    title: 'Blogg – SOMI Klinikken',
    description: 'Faglige artikler om skjønnhetsbehandlinger fra SOMI Klinikken i Sandnes.',
  },
}

export const revalidate = 60

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BloggPage() {
  let posts: { id: string; title: string; slug: string; excerpt?: string | null; publishedDate?: string | null; author?: string | null; featuredImage?: { url?: string | null; alt?: string | null } | null }[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'posts',
      limit: 24,
      sort: '-publishedDate',
      depth: 1,
    })
    posts = result.docs as typeof posts
  } catch {
    // collection not yet available
  }

  return (
    <main style={{ paddingTop: 48, paddingBottom: 64 }}>
      <div className="container">

        <header style={{ marginBottom: 40 }}>
          <div className="kicker">Blogg</div>
          <h1 className="h1" style={{ marginTop: 8 }}>Faglige artikler og råd</h1>
          <p className="muted" style={{ marginTop: 12, maxWidth: '60ch' }}>
            Les om behandlinger, råd og tips fra teamet hos SOMI Klinikken i Sandnes.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="muted">Ingen innlegg ennå. Kom tilbake snart!</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {posts.map((post) => (
              <a
                key={post.id}
                href={`/blogg/${post.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <article
                  className="reveal"
                  style={{
                    borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(56,56,56,0.08)',
                    background: '#fff', boxShadow: '0 8px 22px rgba(0,0,0,0.04)',
                    display: 'grid', transition: 'transform 180ms ease',
                  }}
                >
                  {post.featuredImage?.url ? (
                    <div style={{ height: 200, overflow: 'hidden' }}>
                      <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt ?? post.title}
                        width={600}
                        height={400}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  ) : (
                    <div style={{
                      height: 140, background: 'linear-gradient(135deg,#ede5dd,#ddb3b3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontFamily: 'Georgia,serif', fontSize: 32, color: '#fff', opacity: 0.7 }}>S</span>
                    </div>
                  )}
                  <div style={{ padding: '18px 20px', display: 'grid', gap: 8 }}>
                    <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 18, lineHeight: 1.3, margin: 0 }}>
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p style={{ fontSize: 14, color: 'rgba(56,56,56,0.68)', lineHeight: 1.55, margin: 0 }}>
                        {post.excerpt.slice(0, 120)}{post.excerpt.length > 120 ? '…' : ''}
                      </p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                      <span style={{ fontSize: 13, color: 'rgba(56,56,56,0.5)' }}>
                        {post.author ?? 'SOMI Klinikken'}{post.publishedDate ? ` · ${formatDate(post.publishedDate)}` : ''}
                      </span>
                      <span style={{ fontSize: 13, color: '#6B7B8D', fontWeight: 600 }}>Les mer →</span>
                    </div>
                  </div>
                </article>
              </a>
            ))}
          </div>
        )}

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <a className="btn btn--primary" href="/booking">Book time hos SOMI</a>
        </div>

      </div>
    </main>
  )
}
