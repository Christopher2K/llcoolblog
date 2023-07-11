import { error } from '@sveltejs/kit'

import { DEFAULT_LANGAUGE, LANG_COOKIE_NAME } from '@app/i18n'
import { getArticle } from '@app/models/article'

import type { PageServerLoad } from './$types'

export const load = (async ({ cookies, params }) => {
  const currentLang = cookies.get(LANG_COOKIE_NAME) ?? DEFAULT_LANGAUGE
  const article = await getArticle(currentLang, params.slug)

  if (!article) throw error(404)

  return { article }
}) satisfies PageServerLoad
