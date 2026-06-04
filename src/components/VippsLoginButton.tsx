'use client'
import React from 'react'

export function VippsLoginButton() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '28px',
        padding: '24px',
        background: '#f8f7f6',
        borderRadius: '10px',
        border: '1px solid #e0dbd6',
      }}
    >
      <p style={{
        margin: 0,
        fontWeight: 700,
        fontSize: '15px',
        color: '#383838',
        textAlign: 'center',
      }}>
        SOMI Klinikken — Admin
      </p>
      <p style={{
        margin: 0,
        fontSize: '13px',
        color: '#666',
        textAlign: 'center',
        maxWidth: '280px',
      }}>
        Logg inn med Vipps for å administrere nettsideinnhold.
      </p>
      <a
        href="/api/vipps/start"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          backgroundColor: '#FF5B24',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          fontWeight: 700,
          fontSize: '16px',
          padding: '13px 32px',
          borderRadius: '8px',
          textDecoration: 'none',
          width: '100%',
          boxSizing: 'border-box',
          boxShadow: '0 4px 14px rgba(255,91,36,0.30)',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="12" fill="#ffffff" />
          <path
            d="M7 12.5c1.5 2 3 3.5 5 3.5s4-2.5 5-6"
            stroke="#FF5B24"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        Logg inn med Vipps
      </a>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: '8px',
          color: '#aaa',
          fontSize: '12px',
        }}
      >
        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ddd' }} />
        eller e-post og passord nedenfor
        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ddd' }} />
      </div>
    </div>
  )
}

export default VippsLoginButton
