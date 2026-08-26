import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Render } from '@measured/puck/rsc'
import type { Data } from '@measured/puck'
import { puckConfig } from '@/puck/config'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })

  const page = result.docs[0]
  if (!page) return {}

  return {
    title: page.meta?.title ?? `${page.title} | SOMI Klinikken`,
    description: page.meta?.description ?? undefined,
    alternates: {
      canonical: `https://somiklinikken.no/${slug}`,
    },
  }
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })

  const page = result.docs[0]
  if (!page) notFound()

  const puckData = page.puckData as Data | null
  const hasPuckContent = puckData && Array.isArray(puckData.content) && puckData.content.length > 0


  return (
    <>

      <main style={{ paddingTop: '26px', paddingBottom: 64 }}>
        <div className="container">
          {hasPuckContent ? (
            <Render config={puckConfig} data={puckData} />
          ) : (
            <h1 className="h1">{page.title}</h1>
          )}
        </div>
      </main>

    </>
  )
}
