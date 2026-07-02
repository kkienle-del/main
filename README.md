# ZAPF Fertiggaragen – Google-Ads-Landingpage

Landingpage zur Leadgenerierung über Google-Ads-Kampagnen. Erstkontakte werden
über einen mehrstufigen Funnel (4 Schritte) erfasst und direkt an ein
**HubSpot-Formular** übermittelt, sodass sie automatisch im HubSpot CRM landen.

**Technik:** [Astro](https://astro.build) (statischer Build, kein Server nötig) ·
selbstgehostete Schriften (DSGVO) · Google Consent Mode v2 · GA4 + Google Ads Conversion-Tracking.

## Schnellstart

```bash
npm install
npm run dev        # Entwicklung: http://localhost:4321
npm run build      # Produktion: statische Dateien in dist/
npm run preview    # Produktions-Build lokal testen
```

Das Deployment ist auf jedem statischen Hosting möglich (z. B. Netlify, Vercel,
Cloudflare Pages oder ein eigener Webserver): einfach den Inhalt von `dist/`
ausliefern.

## Konfiguration (`.env`)

`.env.example` nach `.env` kopieren und ausfüllen:

| Variable | Beschreibung |
| --- | --- |
| `PUBLIC_HUBSPOT_PORTAL_ID` | HubSpot Konto-ID (Einstellungen → Konto & Abrechnung) |
| `PUBLIC_HUBSPOT_FORM_GUID` | ID des HubSpot-Formulars (aus der Formular-URL) |
| `PUBLIC_GADS_ID` | Google-Ads-Konversions-ID, z. B. `AW-123456789` |
| `PUBLIC_GADS_CONVERSION_LABEL` | Conversion-Label des Lead-Events |
| `PUBLIC_GA4_ID` | GA4-Mess-ID, z. B. `G-XXXXXXXXXX` |
| `PUBLIC_PHONE_DISPLAY` / `PUBLIC_PHONE_LINK` | Telefonnummer (Anzeige / `tel:`-Link) |

**Ohne Konfiguration bleibt die Seite voll testbar:** Das Formular simuliert
den Versand (Warnung in der Browser-Konsole), Tracking wird nicht geladen.

### HubSpot einrichten

1. In HubSpot ein normales Formular anlegen mit den Standardfeldern
   **Vorname, Nachname, E-Mail, Telefonnummer, Postleitzahl, Nachricht**.
2. Portal-ID und Form-GUID in die `.env` eintragen.
3. Die Funnel-Antworten (Garagentyp, Zeitrahmen, Stellplatz) sowie
   **gclid/UTM-Parameter** werden strukturiert in das Feld „Nachricht“
   (`message`) geschrieben – so ist keine Custom Property nötig.
   Wer die Antworten lieber als eigene Kontakteigenschaften führen möchte:
   Custom Properties in HubSpot anlegen, dem Formular hinzufügen und in
   `src/components/LeadFunnel.astro` im `payload.fields`-Array ergänzen.

Der `hubspotutk`-Cookie wird – sofern vorhanden – mitgesendet, damit HubSpot
die Analytics-Historie des Kontakts zuordnen kann.

### Tracking & Datenschutz

- **Consent Mode v2:** Alle Google-Signale stehen standardmäßig auf `denied`.
  `gtag.js` wird erst geladen, nachdem im Cookie-Banner „Alle akzeptieren“
  gewählt wurde. Die Auswahl ist über „Cookie-Einstellungen“ im Footer änderbar.
- **Conversion-Messung:** Die Google-Ads-Conversion feuert auf der
  Danke-Seite (`/danke`) – und nur, wenn der Funnel tatsächlich abgeschlossen
  wurde (Session-Flag). In Google Ads als Conversion-Ziel daher entweder das
  Conversion-Event oder einen Zielseitenaufruf von `/danke` verwenden.
- **GA4-Funnel-Analyse:** Jeder abgeschlossene Schritt sendet
  `funnel_step_completed` (Parameter `step`), der Abschluss zusätzlich
  `generate_lead` – damit lässt sich der Absprung pro Schritt auswerten.
- Schriften werden **selbst gehostet** (kein Google-Fonts-CDN).
- Impressum/Datenschutz verlinken auf zapf-gmbh.de (`src/config.ts` → `LEGAL`).

## Inhalte pflegen

| Was | Wo |
| --- | --- |
| Headlines, Hero-Text | `src/components/Hero.astro` |
| Kennzahlen (Garagen, Jahre, Werke) | `src/components/TrustBar.astro` |
| Modelle & Preise | `src/components/GarageTypes.astro` |
| Vorteile („Warum ZAPF“) | `src/components/Benefits.astro` |
| Ablauf-Schritte | `src/components/Process.astro` |
| Kundenstimmen | `src/components/Testimonials.astro` |
| FAQ | `src/components/FAQ.astro` |
| Funnel-Fragen & Optionen | `src/components/LeadFunnel.astro` |
| Farben, Typografie, Abstände | `src/styles/global.css` (CSS Custom Properties) |

### Fotos einsetzen

Die Seite nutzt gestaltete Platzhalter (`.img-slot`, Beschriftung „Foto folgt“).
So werden sie ersetzt:

1. Foto nach `public/images/` legen (Empfehlung: 1200 px Breite, WebP/AVIF).
2. In der jeweiligen Komponente den Platzhalter-Block durch ein `<img>` ersetzen:

```html
<!-- vorher -->
<div class="model__media img-slot" data-image-slot="einzelgarage.jpg">…</div>

<!-- nachher -->
<div class="model__media">
  <img src="/images/einzelgarage.jpg" alt="ZAPF Einzelgarage aus Beton" loading="lazy" width="1200" height="900" />
</div>
```

Benötigte Motive (siehe `data-image-slot`-Attribute): `einzelgarage.jpg`,
`doppelgarage.jpg`, `grossraumgarage.jpg`, `reihengarage.jpg`,
`werk-montage.jpg` (Kran-Montage o. ä. für den „Warum ZAPF“-Block).

## ⚠️ Vor dem Livegang prüfen

- [ ] **Kundenstimmen ersetzen:** Die Zitate in `Testimonials.astro` sind
      Platzhalter und als solche gekennzeichnet. Erfundene Bewertungen sind
      wettbewerbswidrig (UWG) – zwingend durch echte, dokumentierte
      Kundenstimmen ersetzen.
- [ ] **Preise & Kennzahlen freigeben:** „ab 6.500 €“ / „ab 23.100 €“ und die
      Zahlen der Trust-Leiste stammen von zapf-garagen.de (Stand Mitte 2026) –
      mit Marketing/Vertrieb abstimmen.
- [ ] Impressums-/Datenschutz-URLs in `src/config.ts` verifizieren.
- [ ] Telefonnummer in `.env` auf die Kampagnen-Rufnummer setzen
      (ggf. Call-Tracking-Nummer).
- [ ] Finale Domain in `astro.config.mjs` (`site`) eintragen.
- [ ] `robots`-Meta steht auf `noindex` (Kampagnenseite) – falls Indexierung
      gewünscht, in `src/layouts/Base.astro` ändern.
- [ ] HubSpot-Testlead senden und Zuordnung im CRM prüfen.
- [ ] Google-Ads-Conversion mit Tag Assistant testen.
