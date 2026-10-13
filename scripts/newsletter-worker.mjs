import 'dotenv/config'

if (!process.env.NEWSLETTER_WORKER_SECRET || process.env.NEWSLETTER_WORKER_SECRET.length < 32) {
  console.error('NEWSLETTER_WORKER_SECRET is not configured.')
  process.exit(1)
}
try {
  const response = await fetch(`http://127.0.0.1:${process.env.PORT || 3002}/api/nyhetsbrev/worker`, {
    method: 'POST', headers: { Authorization: `Bearer ${process.env.NEWSLETTER_WORKER_SECRET}` }, signal: AbortSignal.timeout(100000),
  })
  const result = await response.json()
  if (!response.ok) throw Error(result.error || 'Worker request failed')
  console.log(JSON.stringify({ processed: result.processed || 0, busy: result.busy || false }))
} catch (err) { console.error(err instanceof Error ? err.message : 'Worker failed'); process.exit(1) }
