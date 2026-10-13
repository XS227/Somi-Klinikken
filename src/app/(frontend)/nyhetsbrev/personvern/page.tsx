import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Personvern for nyhetsbrev | SOMI Klinikken', robots: { index: false, follow: false } }
export default function NewsletterPrivacy() {
  return <main className="container" style={{ maxWidth: 760, padding: '50px 24px' }}><h1>Personvern for nyhetsbrevet</h1>
    <p>Nyhetsbrevet sendes av SOMI Klinikken, Langgata 31, 4306 Sandnes. Du velger selv å motta nyheter og tilbud fra oss.</p>
    <h2>Opplysninger vi bruker</h2><p>Vi lagrer e-postadressen din og eventuelt fornavn og etternavn. Navn er frivillig. Vi lagrer også tidspunkt og kilde for påmelding, teksten du sa ja til, bekreftelsesstatus og avmelding.</p>
    <h2>Hva opplysningene brukes til</h2><p>Opplysningene brukes til å bekrefte påmeldingen og sende nyhetsbrev, tilbud og informasjon fra SOMI. Ved utsending overføres mottakeradresse og e-postinnhold til vår e-postleverandør, Resend. Leveringsloggen viser om e-posttjenesten har akseptert meldingen. Vi har ikke lagt inn sporingspiksler i nyhetsbrevene.</p>
    <h2>Avmelding og oppbevaring</h2><p>Du kan melde deg av via lenken i hvert nyhetsbrev. Da stopper vi videre utsending. Vi beholder en avmeldingsregistrering for å unngå at adressen legges tilbake i listen ved en senere import. Ubekreftede påmeldinger mottar ikke kampanjer.</p>
    <h2>Kontakt oss</h2><p>For spørsmål, innsyn, retting eller sletting av opplysninger, skriv til <a href="mailto:post@somiklinikken.no">post@somiklinikken.no</a>. Du kan også ringe <a href="tel:+4792939171">929 39 171</a>.</p>
    <p>Oppdatert 13. oktober 2026.</p><a href="/nyhetsbrev">Tilbake til nyhetsbrevet</a>
  </main>
}
