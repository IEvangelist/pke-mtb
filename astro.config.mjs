// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://ievangelist.github.io/pke-mtb/
export default defineConfig({
  site: 'https://ievangelist.github.io',
  base: '/pke-mtb',
  trailingSlash: 'ignore',
  // Static redirect destinations must include the GitHub Pages base path.
  redirects: {
    '/week-12-ups-and-downs/': '/pke-mtb/week-13-ups-and-downs/',
    '/week-13-trailside-fixes/': '/pke-mtb/week-14-trailside-fixes/',
    '/week-14-pre-ride-the-course/': '/pke-mtb/week-15-pre-ride-the-course/',
    '/week-15-cold-weather-prep/': '/pke-mtb/week-16-cold-weather-prep/',
    '/week-16-championship-mindset/': '/pke-mtb/week-17-championship-mindset/',
    '/week-17-gratitude-and-season-wrap/': '/pke-mtb/week-18-gratitude-and-season-wrap/',
  },
});
