// Lang initialization
import type { Cookies, Handle } from '@sveltejs/kit'
import i18next from 'i18next'

import { initialize, SUPPORTED_LANGUAGES, DEFAULT_LANGAUGE, LANG_COOKIE_NAME } from '@app/i18n'

await initialize()

function setLangCookie(cookies: Cookies, lang: string) {
  cookies.set(LANG_COOKIE_NAME, lang, {
    httpOnly: false,
    path: '/',
    sameSite: 'strict',
  })
}

export const handle: Handle = async ({ event, resolve }) => {
  const request = event.request
  const userLang = event.url.searchParams.get('lang')

  let usedLang = DEFAULT_LANGAUGE

  if (userLang) {
    usedLang = userLang
    console.log('User Lang', userLang)
    setLangCookie(event.cookies, userLang)
    await i18next.changeLanguage(userLang)
  } else {
    // Language selection
    const currentLanguage = i18next.language
    const cookieLanguage = event.cookies.get('i18next')
    const headerLanguages = (request.headers.get('Accept-Langage') ?? '').split(';')

    if (currentLanguage !== cookieLanguage) {
      if (!cookieLanguage) {
        let maybeHeaderLng = SUPPORTED_LANGUAGES.find(supportedLng =>
          headerLanguages.some(headerLng => headerLng.includes(supportedLng)),
        )

        usedLang = maybeHeaderLng ?? usedLang
      } else {
        usedLang = cookieLanguage ?? usedLang
      }

      setLangCookie(event.cookies, usedLang)
      await i18next.changeLanguage(usedLang)
    }
  }

  const response = resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', usedLang),
  })
  return response
}
