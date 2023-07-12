import i18next from 'i18next'
import { enCA, fr } from 'date-fns/locale/index.js'

const localDict = {
  en: enCA,
  fr,
}

export function getDateLocale(): Locale {
  const lang = i18next.language as keyof typeof localDict
  if (lang in localDict === false)
    throw new Error('Unknow local', { cause: `Loccal being ${lang}` })
  return localDict[lang]
}

export function getArticleSlug(slug: string) {
  return slug
    .split('/')
    .filter((_, index) => index > 0)
    .join('/')
}

export const notypecheck = (x: unknown) => x as {}
