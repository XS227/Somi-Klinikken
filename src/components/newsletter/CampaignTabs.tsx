'use client'
import React, { useEffect, useState } from 'react'
import NewsletterAdmin from './NewsletterAdmin'
export default function CampaignTabs({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState<'plan' | 'newsletter'>('plan')
  useEffect(() => { if (location.hash === '#nyhetsbrev') setTab('newsletter') }, [])
  return <div><div className="nl-tabs" role="tablist" aria-label="Kampanjeverktøy"><button role="tab" id="plan-tab" aria-selected={tab === 'plan'} aria-controls="plan-panel" onClick={() => { setTab('plan'); history.replaceState(null, '', '#plan') }}>Kampanjeplan</button><button role="tab" id="newsletter-tab" aria-selected={tab === 'newsletter'} aria-controls="newsletter-panel" onClick={() => { setTab('newsletter'); history.replaceState(null, '', '#nyhetsbrev') }}>Nyhetsbrev</button></div><div role="tabpanel" id="plan-panel" aria-labelledby="plan-tab" hidden={tab !== 'plan'}>{children}</div><div role="tabpanel" id="newsletter-panel" aria-labelledby="newsletter-tab" hidden={tab !== 'newsletter'}>{tab === 'newsletter' && <NewsletterAdmin />}</div></div>
}
