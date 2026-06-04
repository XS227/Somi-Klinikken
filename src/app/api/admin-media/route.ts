import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

function getFiles(dir: string, urlBase: string): { name: string; path: string; size: number }[] {
  const files: { name: string; path: string; size: number }[] = []
  try {
    const items = readdirSync(dir)
    for (const item of items) {
      const fullPath = join(dir, item)
      const stat = statSync(fullPath)
      if (stat.isDirectory()) {
        files.push(...getFiles(fullPath, `${urlBase}/${item}`))
      } else if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(item)) {
        files.push({ name: item, path: `${urlBase}/${item}`, size: stat.size })
      }
    }
  } catch {
    // Directory not found – return empty
  }
  return files
}

export async function GET() {
  const publicDir = join(process.cwd(), 'public')
  const files = getFiles(join(publicDir, 'img'), '/img')
  return NextResponse.json(files)
}
