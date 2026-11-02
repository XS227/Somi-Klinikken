'use client'

import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  placement: 'hero' | 'footer'
}

/** Kun en anonym klikkhendelse – ingen behandlingsvalg eller persondata. */
export default function LaserBookingLink({ children, className, placement }: Props) {
  const track = () => {
    const analytics = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
    analytics?.('event', 'laser_campaign_booking_click', {
      campaign_name: 'somi_laser_november_2026',
      placement,
    })
  }

  return (
    <a
      className={className}
      href="https://somi.bestille.no/"
      target="_blank"
      rel="noopener noreferrer"
      onClick={track}
    >
      {children}
    </a>
  )
}
