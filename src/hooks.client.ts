import LanguageDetector from 'i18next-browser-languagedetector'

import { COOKIE_NAME, initialize } from '@app/i18n'

const languageDetector = new LanguageDetector(null, {
  order: ['cookie', 'navigator'],
  lookupCookie: COOKIE_NAME,
  caches: ['cookie'],
})

await initialize(languageDetector)
