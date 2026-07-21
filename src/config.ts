/**
 * Zentrale Konfiguration der Landingpage.
 * Werte kommen aus .env (siehe .env.example). Fehlende Werte werden mit
 * sicheren Platzhaltern belegt, damit die Seite auch ohne Konfiguration
 * lauffähig ist (Formular simuliert dann den Versand, Tracking bleibt aus).
 */
const env = import.meta.env;

export const SITE = {
  name: 'ZAPF Fertiggaragen',
  title: 'Fertiggarage vom Marktführer – jetzt unverbindliches Angebot sichern | ZAPF',
  description:
    'Ihre Betonfertiggarage von ZAPF: über 450.000 gebaute Garagen, 100 % Made in Germany, Festpreisgarantie. In 60 Sekunden zum unverbindlichen Angebot.',
} as const;

export const CONTACT = {
  phoneDisplay: env.PUBLIC_PHONE_DISPLAY || '0921 601-0',
  phoneLink: env.PUBLIC_PHONE_LINK || '+4992160100',
} as const;

export const LEGAL = {
  impressum: 'https://www.zapf-gmbh.de/impressum',
  datenschutz: 'https://www.zapf-gmbh.de/datenschutz',
} as const;

export const HUBSPOT = {
  portalId: env.PUBLIC_HUBSPOT_PORTAL_ID || '',
  formGuid: env.PUBLIC_HUBSPOT_FORM_GUID || '',
} as const;

export const TRACKING = {
  ga4Id: env.PUBLIC_GA4_ID || '',
  gadsId: env.PUBLIC_GADS_ID || '',
  gadsConversionLabel: env.PUBLIC_GADS_CONVERSION_LABEL || '',
} as const;
