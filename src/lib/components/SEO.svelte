<script lang="ts" context="module">
  import i18next, { t } from 'i18next'

  export type SEOType = {
    title?: string
    description?: string
    openGraph?: {
      title?: string
      type?: 'website' | 'article'
      description?: string
    }
  }

  function getPageMetadataImage(title: string) {
    return `https://res.cloudinary.com/dp84qkgfp/image/upload/c_fit,co_rgb:fafafa,g_north_west,h_280,l_text:Lato_54_900:${encodeURI(
      title,
    )},w_640,x_60,y_92/v1678058612/christopher2k.dev/open-graph/template.png`
  }
</script>

<script lang="ts">
  import { LOCALE_FULL_NAME, type SupportedLanguage } from '@app/i18n'
  import { page } from '$app/stores'

  export let data: SEOType
  export let forceUseDefaultOgTitle = false

  const currentLocaleFullName =
    LOCALE_FULL_NAME[i18next.language as SupportedLanguage] ?? LOCALE_FULL_NAME.en
  $: currentUrl = $page.url.toString()
  $: title = data.title ?? t('seo:defaultTitle')
  $: description = data.description ?? t('seo:defaultDescription')
  $: ogType = data.openGraph?.type ?? 'website'
  $: ogTitle = forceUseDefaultOgTitle ? (t('seo:defaultOgTitle') as string) : title

  $: ogImage = getPageMetadataImage(ogTitle)
  $: ogImageAlt = t('seo:defaultOgImageAlt', { title: ogTitle })
</script>

<svelte:head>
  <title>{t('seo:titleTemplate', { title })}</title>

  <meta name="robots" content="index, follow" />
  <meta name="description" content={description} />

  <meta property="og:type" content={ogType} />
  <meta property="og:title" content={ogTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={currentUrl} />

  <meta property="og:locale" content={currentLocaleFullName} />
  {#each Object.values(LOCALE_FULL_NAME) as localeFullName}
    <meta property="og:locale:alternate" content={localeFullName} />
  {/each}

  <meta property="og:image:url" content={ogImage} />

  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="627" />
  <meta property="og:image:alt" content={ogImageAlt} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@llcoolchris_" />
  <meta name="twitter:creator" content="@llcoolchris_" />
  <meta name="twitter:title" content={ogTitle} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:image:alt" content={ogImageAlt} />
  <meta name="twitter:description" content={description} />
</svelte:head>
