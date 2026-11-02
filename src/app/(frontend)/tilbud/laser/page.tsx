import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

// Tidligere lenker fungerer fortsatt, men visningen flyttes til /november.
type Props = { searchParams: Promise<{ forhandsvisning?: string }> }

export default async function PreviousNovemberLink({ searchParams }: Props) {
  const params = await searchParams
  redirect(params.forhandsvisning === '1' ? '/november?forhandsvisning=1' : '/november')
}
