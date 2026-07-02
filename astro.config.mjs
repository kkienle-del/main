// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // TODO: Auf die finale Kampagnen-Domain ändern, z. B. https://angebot.zapf-gmbh.de
  site: 'https://example.com',
  output: 'static',
  compressHTML: true,
});
