# SOMI · Novemberkampanje 2026 (klar til faglig og teknisk godkjenning)

## Bekreftede vilkår fra Katarina 2. november 2026
- 40 % rabatt på ordinære **enkeltbehandlinger** innen laserhårfjerning, laserfjerning av PMU og laser-tatoveringsfjerning.
- **Pakkepriser og klippekort omfattes ikke.**
- Kampanjen er tilgjengelig for timebestilling **9.–30. november 2026**.
- Avtalen/behandlingen må gjennomføres **senest 31. desember 2026**.
- SOMI endrer prisene selv i **somi.bestille.no**. Nettsiden må ikke endre priser eller gjette prisbeløp.
- En mulig forlengelse til desember er **ikke godkjent** og må ikke forhåndspubliseres.

## Teknisk
- Offentlig kampanjeinformasjon: `/tilbud/laser`, med `noindex,follow` og uten oppføring i sitemap.
- Rolig informasjonsbanner vises kun på forside og tre behandlings-URL-er, datostyrt
  fra **2026-11-08 kl. 23:00 UTC** til **2026-11-30 kl. 23:00 UTC**
  (9. nov. 00:00 til 1. des. 00:00 i Norge).
- Bookinglenker til `https://somi.bestille.no/`, ingen nye betalingsfunksjoner.
- Anonyme GA4-hendelser: `laser_campaign_booking_click` med `campaign_name` og `placement`.
  Kontroller at GA4-målingen er aktiv og at hendelsene vises i DebugView.
- Permanente behandlingssider, URL-er, kanoniske tagger og ordinær SEO forblir urørt.
- Eksisterende intern /kampanje-modul og nyhetsbrev er ikke endret.

## Sjekkliste før live / merge
- [ ] Faglig/medisinsk ansvarlig hos SOMI godkjenner tekst, betingelser og utforming.
- [ ] Kontroller at 40 %-påstanden og ordinær referansepris er dokumentert, og at tjenestenes fulle priser kan leses i booking.
- [ ] Katarina bekrefter at prissetting i bookingsystemet omfatter de riktige enkeltbehandlingene, men ikke pakker/klippekort.
- [ ] Bekreft at SOMI har kapasitet til å gjennomføre alle rabatterte timer senest 31. desember.
- [ ] Bygg/test på SOMIs faktiske VPS (vps-5359843), ikke på annen SETAEI-VPS.
- [ ] Test mobil (inkl. smale og foldbare skjermer), hero-bilde, kontrast og bookinglenker.
- [ ] Bekreft robots noindex og at /tilbud/laser ikke dukker opp i sitemap.
- [ ] Bekreft ikke-kampanje-sider og eksisterende PMU-tekst er helt uendret.
- [ ] Slå sammen og deploy før lansering 9. november, etter godkjenning.

## Begrensninger
Kampanjen sendes ikke via e-post/SMS og publiseres ikke i betalte annonser fra dette arbeidet.
Markedsføring av kosmetiske laserbehandlinger må vurderes etter helsepersonellregelverket og
reglene mot kroppspress, og må ikke bruke før-/etterbilder eller aggressivt hastverkspress.

**Etter 30. november:** Banneret slås automatisk av. Kampanjesiden er fortsatt teknisk
tilgjengelig på direkte URL (noindex) frem til den tas ned eller oppdateres manuelt.
