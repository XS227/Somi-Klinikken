// Felles internlenke-kart. Brukes av forsiden, behandlingsoversikten,
// behandlingssidene og blogginnleggene slik at de prioriterte sidene
// (hudpleie, tattoo removal, bryn/vipper og BioRePeel) får flere
// kontekstuelle lenker med beskrivende ankertekst.

export type InternalLink = { href: string; anchor: string; desc: string }

const t = (slug: string, anchor: string, desc: string): InternalLink => ({
  href: `/behandlinger/${slug}`,
  anchor,
  desc,
})

const b = (slug: string, anchor: string, desc: string): InternalLink => ({
  href: `/blogg/${slug}`,
  anchor,
  desc,
})

export const TREATMENT_LINKS = {
  'medisinsk-hudpleie': t('medisinsk-hudpleie', 'Medisinsk hudpleie i Sandnes', 'Microneedling, peel og dyprens for akne, pigment og aldring.'),
  'klassisk-hudpleie': t('klassisk-hudpleie', 'Ansiktsbehandling med Dermalogica', 'Skreddersydd klassisk hudpleie for alle hudtyper.'),
  'laser-tattoo-removal': t('laser-tattoo-removal', 'Laser tatoveringsfjerning i Sandnes', 'Fjern eller lysne tatoveringer og gammel PMU med laser eller saline.'),
  'permanent-makeup': t('permanent-makeup', 'Bryn og vipper – microblading og powderbrows', 'Naturlige bryn, lipblush og eyeliner tilpasset ansiktet ditt.'),
  'biorepeel-cl3': t('biorepeel-cl3', 'BioRePeel CL3 i Sandnes', 'Skånsom medisinsk peeling som gir glød uten nedetid.'),
  'prx-t33': t('prx-t33', 'PRX-T33 biorevitalisering', 'Nålefri behandling som strammer opp og gir huden glød.'),
  'laser-harfjerning': t('laser-harfjerning', 'Laser hårfjerning', 'Varig hårfjerning med sertifisert laserspesialist.'),
  'injeksjonsbehandlinger': t('injeksjonsbehandlinger', 'Rynkebehandling og filler', 'Naturlig foryngelse med erfaren behandler.'),
  'harfjerning-voks-elektrolyse': t('harfjerning-voks-elektrolyse', 'Voksing og elektrolyse', 'Rask og skånsom hårfjerning.'),
  'gratis-konsultasjon': t('gratis-konsultasjon', 'Gratis hudkonsultasjon', 'Uforpliktende vurdering av hud og behandlingsønsker.'),
} satisfies Record<string, InternalLink>

export type TreatmentSlug = keyof typeof TREATMENT_LINKS

export const BLOG_LINKS = {
  'hudpleie-dermalogica-sandnes': b('hudpleie-dermalogica-sandnes', 'Hudpleie med Dermalogica i Sandnes', 'Slik jobber Emma som Dermalogica Expert.'),
  'prx-t33-vs-biorepeel-sandnes': b('prx-t33-vs-biorepeel-sandnes', 'PRX-T33 eller BioRePeel – hva passer deg?', 'Sammenligning av de to peelingene.'),
  'gratis-konsultasjon-hudpleie-sandnes': b('gratis-konsultasjon-hudpleie-sandnes', 'Gratis konsultasjon hudpleie', 'Hva skjer på en gratis hudkonsultasjon?'),
  'laser-tattoo-removal-sandnes': b('laser-tattoo-removal-sandnes', 'Fjern tatovering med laser', 'Slik fungerer laser og saline tattoo removal.'),
  'microblading-sandnes': b('microblading-sandnes', 'Microblading: før og etter', 'Forberedelser og etterpleie for best resultat.'),
  'permanent-makeup-naturlige-bryn': b('permanent-makeup-naturlige-bryn', 'Naturlige bryn med permanent makeup', 'Microblading vs. powderbrows.'),
  'laser-harfjerning-sandnes': b('laser-harfjerning-sandnes', 'Laser hårfjerning i Sandnes', 'Permanent løsning med Arianna.'),
  'injeksjonsbehandlinger-sandnes': b('injeksjonsbehandlinger-sandnes', 'Injeksjonsbehandlinger i Sandnes', 'Naturlig foryngelse – hva kan du forvente?'),
} satisfies Record<string, InternalLink>

type BlogSlug = keyof typeof BLOG_LINKS

/** Prioriterte sider – løftes frem på forsiden og i behandlingsoversikten. */
export const PRIORITY_TREATMENTS: TreatmentSlug[] = [
  'medisinsk-hudpleie',
  'klassisk-hudpleie',
  'laser-tattoo-removal',
  'permanent-makeup',
  'biorepeel-cl3',
]

/** Guider fra bloggen som støtter de prioriterte sidene. */
export const PRIORITY_GUIDES: BlogSlug[] = [
  'prx-t33-vs-biorepeel-sandnes',
  'hudpleie-dermalogica-sandnes',
  'laser-tattoo-removal-sandnes',
  'permanent-makeup-naturlige-bryn',
]

const RELATED: Record<TreatmentSlug, { treatments: TreatmentSlug[]; posts: BlogSlug[] }> = {
  'medisinsk-hudpleie': { treatments: ['biorepeel-cl3', 'prx-t33', 'klassisk-hudpleie'], posts: ['prx-t33-vs-biorepeel-sandnes', 'gratis-konsultasjon-hudpleie-sandnes'] },
  'klassisk-hudpleie': { treatments: ['medisinsk-hudpleie', 'biorepeel-cl3', 'permanent-makeup'], posts: ['hudpleie-dermalogica-sandnes', 'gratis-konsultasjon-hudpleie-sandnes'] },
  'biorepeel-cl3': { treatments: ['prx-t33', 'medisinsk-hudpleie', 'klassisk-hudpleie'], posts: ['prx-t33-vs-biorepeel-sandnes', 'hudpleie-dermalogica-sandnes'] },
  'prx-t33': { treatments: ['biorepeel-cl3', 'medisinsk-hudpleie', 'klassisk-hudpleie'], posts: ['prx-t33-vs-biorepeel-sandnes', 'gratis-konsultasjon-hudpleie-sandnes'] },
  'laser-tattoo-removal': { treatments: ['permanent-makeup', 'laser-harfjerning', 'medisinsk-hudpleie'], posts: ['laser-tattoo-removal-sandnes'] },
  'permanent-makeup': { treatments: ['laser-tattoo-removal', 'klassisk-hudpleie', 'injeksjonsbehandlinger'], posts: ['permanent-makeup-naturlige-bryn', 'microblading-sandnes'] },
  'laser-harfjerning': { treatments: ['harfjerning-voks-elektrolyse', 'laser-tattoo-removal', 'medisinsk-hudpleie'], posts: ['laser-harfjerning-sandnes'] },
  'injeksjonsbehandlinger': { treatments: ['prx-t33', 'biorepeel-cl3', 'medisinsk-hudpleie'], posts: ['injeksjonsbehandlinger-sandnes'] },
  'harfjerning-voks-elektrolyse': { treatments: ['laser-harfjerning', 'permanent-makeup', 'klassisk-hudpleie'], posts: ['laser-harfjerning-sandnes'] },
  'gratis-konsultasjon': { treatments: ['medisinsk-hudpleie', 'biorepeel-cl3', 'laser-tattoo-removal'], posts: ['gratis-konsultasjon-hudpleie-sandnes', 'prx-t33-vs-biorepeel-sandnes'] },
}

export function relatedForTreatment(slug: string): { treatments: InternalLink[]; posts: InternalLink[] } {
  const r = RELATED[slug as TreatmentSlug]
  if (!r) return { treatments: [], posts: [] }
  return {
    treatments: r.treatments.map((s) => TREATMENT_LINKS[s]),
    posts: r.posts.map((s) => BLOG_LINKS[s]),
  }
}

// Blogginnlegg → behandlingssidene artikkelen handler om.
const POST_TREATMENTS: Record<string, TreatmentSlug[]> = {
  'hudpleie-dermalogica-sandnes': ['klassisk-hudpleie', 'medisinsk-hudpleie'],
  'prx-t33-vs-biorepeel-sandnes': ['biorepeel-cl3', 'prx-t33', 'medisinsk-hudpleie'],
  'gratis-konsultasjon-hudpleie-sandnes': ['gratis-konsultasjon', 'medisinsk-hudpleie', 'biorepeel-cl3'],
  'laser-tattoo-removal-sandnes': ['laser-tattoo-removal', 'permanent-makeup'],
  'microblading-sandnes': ['permanent-makeup', 'laser-tattoo-removal'],
  'permanent-makeup-naturlige-bryn': ['permanent-makeup', 'laser-tattoo-removal'],
  'laser-harfjerning-sandnes': ['laser-harfjerning', 'harfjerning-voks-elektrolyse'],
  'injeksjonsbehandlinger-sandnes': ['injeksjonsbehandlinger', 'prx-t33'],
  'moet-jane-kosmetisk-sykepleie-somi': ['injeksjonsbehandlinger', 'medisinsk-hudpleie'],
  'moet-irena-estetisk-medisin-somi': ['injeksjonsbehandlinger', 'biorepeel-cl3'],
}

/** Behandlingslenker for et blogginnlegg; faller tilbake til de prioriterte sidene. */
export function treatmentsForPost(slug: string): InternalLink[] {
  const slugs = POST_TREATMENTS[slug] ?? PRIORITY_TREATMENTS.slice(0, 3)
  return slugs.map((s) => TREATMENT_LINKS[s])
}
