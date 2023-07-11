import { DEFAULT_LANGAUGE, LANG_COOKIE_NAME } from '@app/i18n'

import type { PageServerLoad } from './$types'

type MarkdownFile = {
  file: string
  lang: string
  slug: string
  metadata: {
    title: string
    description: string
    publishingDate: string
    tags: string[]
    heroImageUrl: string
    heroImageCaption: string
    thumbnailImageUrl: string
    thumbnailImageAlt: string
  }
  default: { render: () => unknown; $$render: () => unknown }
}

type RawMarkdownFile = Omit<MarkdownFile, 'file' | 'lang' | 'slug'>

export const load = (async ({ cookies }) => {
  const currentLang = cookies.get(LANG_COOKIE_NAME) ?? DEFAULT_LANGAUGE

  const files = Object.entries(
    import.meta.glob(`../lib/server/content/blog/*.mdx`, {
      eager: true,
    }) as unknown as Record<string, RawMarkdownFile>,
  ).reduce((list, [filename, obj]) => {
    // FIXME: Typecheck this correctly
    const file = filename.split('/').at(-1)
    const lang = file?.split('-')?.at(-1)?.split('.')[0]
    const slug = file?.split('-')?.at(0)

    if (!file || !lang || !slug || lang !== currentLang) return list

    return [
      ...list,
      {
        file,
        lang,
        slug,
        ...obj,
      },
    ]
  }, [] as MarkdownFile[])

  // Get the 3 last articles
  return {
    count: files.length,
    articles: files.slice(0, 3).map(({ metadata, slug }) => ({
      slug,
      ...metadata,
    })),
  }
}) satisfies PageServerLoad
