'use client'

import React, { useCallback } from 'react'
import { Puck, type Data } from '@measured/puck'
import '@measured/puck/puck.css'
import { useField } from '@payloadcms/ui'
import { puckConfig } from '@/puck/config'

const EMPTY_DATA: Data = { content: [], root: { props: {} } }

export function PuckEditorField() {
  const { value, setValue } = useField<Data>({ path: 'puckData' })

  const data: Data =
    value && typeof value === 'object' && 'content' in value
      ? (value as Data)
      : EMPTY_DATA

  const handleChange = useCallback(
    (updated: Data) => { setValue(updated) },
    [setValue],
  )

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{
        position: 'relative',
        height: 'calc(100vh - 180px)',
        minHeight: 600,
        border: '1px solid var(--theme-elevation-150, #e0e0e0)',
        borderRadius: 6,
        overflow: 'hidden',
      }}>
        <Puck
          config={puckConfig}
          data={data}
          onChange={handleChange}
          onPublish={handleChange}
        />
      </div>
    </div>
  )
}
