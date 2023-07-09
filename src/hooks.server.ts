// Lang initialization
import type { Cookies, Handle } from '@sveltejs/kit'
import i18next from 'i18next'

import { initialize, SUPPORTED_LANGUAGES, DEFAULT_LANGAUGE, COOKIE_NAME } from '@app/i18n'

await initialize()

function setLangCookie(cookies: Cookies, lang: string) {
  cookies.set(COOKIE_NAME, lang, {
    httpOnly: false,
    path: '/',
    sameSite: 'strict',
  })
}

export const handle: Handle = async ({ event, resolve }) => {
  const request = event.request
  const userLang = event.url.searchParams.get('lang')

  if (userLang) {
    setLangCookie(event.cookies, userLang)
    await i18next.changeLanguage(userLang)
  } else {
    // Language selection
    const currentLanguage = i18next.language
    const cookieLanguage = event.cookies.get('i18next')
    const headerLanguages = (request.headers.get('Accept-Langage') ?? '').split(';')

    if (currentLanguage !== cookieLanguage) {
      let newLng = DEFAULT_LANGAUGE

      if (!cookieLanguage) {
        let maybeHeaderLng = SUPPORTED_LANGUAGES.find(supportedLng =>
          headerLanguages.some(headerLng => headerLng.includes(supportedLng)),
        )

        newLng = maybeHeaderLng ?? newLng
      } else {
        newLng = cookieLanguage ?? newLng
      }

      setLangCookie(event.cookies, newLng)
      await i18next.changeLanguage(newLng)
    }
  }

  const response = resolve(event)
  return response
}
