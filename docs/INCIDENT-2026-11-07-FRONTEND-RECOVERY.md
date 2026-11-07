# SOMI – frontend-reserve under VPS-hendelsen 2026-11-07

Dette dokumentet beskriver kun **frontend-kildekode**, ikke private serveradresser, kundedata eller hemmeligheter.

## Verifisert kode
- Repository: `XS227/Somi-Klinikken`
- Produksjonsfronten som ble brukt i reserve: `nextjs-app`, commit `758f144b426786bddf13914bc63da003c204ae7a` (2. november 2026).
- Next.js-frontend: forsiden, Om, Behandlinger, Team, Priser, Booking, Resultater, Gavekort, Blogg, novemberlanding.
- Reservebygg er gjort i **separat arbeidskopi**; CMS/admin og API-rutene ble flyttet ut kun for redningsbygg på maskin med lite RAM. Disse endringene **skal aldri merges eller pushes** som normal applikasjonskode.
- CMS-drevet innhold, databaser, media, nyhetsbrev, kontakt og betalingsintegrasjon er ikke fullt gjenopprettet i denne reserveinstallasjonen.
- To sider har midlertidig fallback: `/kontakt` og `/behandlinger/fjerning-permanent-makeup`. Erstatt med original CMS-visning når riktig database er verifisert.

## Sjekkliste ved tilbakeflytting
- [ ] Ta sikkerhetskopi av virkelig Payload/MongoDB-produksjonsdatabase før endringer.
- [ ] Bruk ny, ren checkout av `nextjs-app` og kontrollér eventuelle nyere commits.
- [ ] Bruk riktig produksjonsmiljøvariabler/hemmeligheter fra sikker lagring; ikke fra en midlertidig rescue-environment.
- [ ] Gjenopprett media, Header/Footer, Pages/Posts, behandlinger og kontakt.
- [ ] Verifiser mobilemeny og forsiden, behandlinger/priser, booking, Blogg, Team, Resultater, Gavekort, november/laser og alle canonical/SEO.
- [ ] Verifiser API/admin/nyhetsbrev/betaling separat og med trygg test. Ingen irreversible databaseoppgaver eller sendinger før eksplisitt godkjenning.
- [ ] Gjør kontroll mot reserve og live etter DNS-endring, med rollback-plan.
- [ ] Ikke slett reserve før innhold og funksjoner er kontrollert.
