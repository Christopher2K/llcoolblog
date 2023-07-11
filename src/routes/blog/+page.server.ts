import { isAfter, isBefore } from 'date-fns'

import { DEFAULT_LANGAUGE, LANG_COOKIE_NAME } from '@app/i18n'
import { type Article, getArticleList } from '@app/models/article'

import type { PageServerLoad } from './$types'

export const load = (async ({ cookies }) => {
  const currentLang = cookies.get(LANG_COOKIE_NAME) ?? DEFAULT_LANGAUGE
  const [showcase, ...articles] = getArticleList(currentLang).sort((a, b) => {
    if (isAfter(a.publishingDate, b.publishingDate)) {
      return -1
    } else if (isBefore(a.publishingDate, b.publishingDate)) {
      return 1
    } else {
      return 0
    }
  })

  return {
    count: articles.length + (showcase ? 1 : 0),
    showcase: showcase as Article | undefined,
    // Get the 3 last articles
    articles: articles.slice(0, 3),
  }
}) satisfies PageServerLoad
