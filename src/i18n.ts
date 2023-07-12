import i18next, { type Module } from 'i18next'

import aboutEn from '@app/locales/en/about.json'
import blogEn from '@app/locales/en/blog.json'
import commonEn from '@app/locales/en/common.json'
import footerEn from '@app/locales/en/footer.json'
import homeEn from '@app/locales/en/home.json'
import seoEn from '@app/locales/en/seo.json'

import aboutFr from '@app/locales/fr/about.json'
import blogFr from '@app/locales/fr/blog.json'
import commonFr from '@app/locales/fr/common.json'
import footerFr from '@app/locales/fr/footer.json'
import homeFr from '@app/locales/fr/home.json'
import seoFr from '@app/locales/fr/seo.json'

export const SUPPORTED_LANGUAGES = ['en', 'fr'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]
export const DEFAULT_LANGAUGE = 'en'
export const LANG_COOKIE_NAME = 'i18next'
export const LOCALE_FULL_NAME: Record<SupportedLanguage, string> = {
  en: 'en_US',
  fr: 'fr_FR',
}

export const resources = {
  en: {
    about: aboutEn,
    blog: blogEn,
    common: commonEn,
    footer: footerEn,
    home: homeEn,
    seo: seoEn,
  },
  fr: {
    about: aboutFr,
    blog: blogFr,
    common: commonFr,
    footer: footerFr,
    home: homeFr,
    seo: seoFr,
  },
} as const

export let initialized = false
export async function initialize(languageDetectorModule: Module | undefined = undefined) {
  if (initialized) return

  const config = {
    debug: true,
    supportedLngs: SUPPORTED_LANGUAGES,
    ns: ['about', 'blog', 'common', 'footer', 'home', 'seo'],
    resources,
    fallbackLng: 'en',
  }

  if (languageDetectorModule) {
    await i18next.use(languageDetectorModule).init(config)
  } else {
    await i18next.init(config)
  }

  initialized = true
}
