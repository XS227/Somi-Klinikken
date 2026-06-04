import React from 'react'

export function AdminBrandStyle() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
.nav__brand img, .nav__brand svg { display: none !important; }
.nav__brand::before {
  content: '';
  display: block;
  width: 120px;
  height: 40px;
  background: url('/img/brand/somi-klinikken-logo-horizontal.png') no-repeat center / contain;
  filter: brightness(0) invert(1);
}
`,
      }}
    />
  )
}
