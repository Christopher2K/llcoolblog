import { z } from 'zod'

export const articleMetadata = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  publishingDate: z.coerce.date(),
  heroImageUrl: z.string(), // Displayed as a hero section in the blog page
  heroImageCaption: z.string(),
  thumbnailImageUrl: z.string(), // Displayed in the article list
  thumbnailImageAlt: z.string(),
})

export type ArticleMetadata = z.infer<typeof articleMetadata>

export type Article = ArticleMetadata & {
  slug: string
}

export type ArticleWithContent = Article & {
  content: string
}

export type ArticleMdFile = {
  metadata: ArticleMetadata
  default: { render: () => { html: string }; $$render: () => unknown }
}

export type ExtraMetadata = {
  filename: string
  lang: string
  slug: string
}

export function getExtraMetadataFromPathname(
  pathname: string,
): ExtraMetadata | undefined {
  // File are always named like "article-name_lang.extension"
  const filename = pathname.split('/').at(-1)

  const [slug, _lng] = filename?.split('_') ?? [undefined, undefined]
  const lang = _lng?.split('.')?.at(0)

  if (filename && slug && lang) {
    return { filename, lang, slug }
  }
}

export function getArticleList(lang: string): Article[] {
  return Object.entries(
    import.meta.glob(`../lib/server/content/blog/**/*.mdx`, {
      eager: true,
    }) as unknown as Record<string, ArticleMdFile>,
  ).reduce((list, [pathname, obj]) => {
    const metadata = getExtraMetadataFromPathname(pathname)
    if (!metadata || metadata.lang !== lang) return list

    return [...list, { ...articleMetadata.parse(obj.metadata), slug: metadata.slug }]
  }, [] as Article[])
}

export async function getArticle(
  lang: string,
  slug: string,
): Promise<ArticleWithContent | undefined> {
  try {
    const file = (await import(
      `../lib/server/content/blog/${slug}_${lang}.mdx`
    )) as ArticleMdFile

    return {
      ...articleMetadata.parse(file.metadata),
      slug,
      content: file.default.render().html,
    }
  } catch (e) {
    return undefined
  }
}
