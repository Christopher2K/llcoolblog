<script lang="ts" context="module">
  import i18next, { t } from 'i18next'
  import { Cloudinary, Transformation } from '@cloudinary/url-gen'
  import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle'
  import { source } from '@cloudinary/url-gen/actions/overlay'
  import { text } from '@cloudinary/url-gen/qualifiers/source'
  import { northWest } from '@cloudinary/url-gen/qualifiers/compass'
  import { size } from '@cloudinary/url-gen/qualifiers/textFit'
  import { Position } from '@cloudinary/url-gen/qualifiers'
  import { compass } from '@cloudinary/url-gen/qualifiers/gravity'

  import { PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/public'

  export type SEOType = {
    title?: string
    description?: string
    openGraph?: {
      title?: string
      type?: 'website' | 'article'
      description?: string
    }
  }

  const cld = new Cloudinary({ cloud: { cloudName: PUBLIC_CLOUDINARY_CLOUD_NAME } })

  function getPageMetadataImage(title: string) {
    const image = cld.image('christopher2k.dev/open-graph/template.png')
    const transformation = new Transformation().overlay(
      source(
        text(title, new TextStyle('Lato', 54).fontWeight('900'))
          .textColor('#FAFAFA')
          .textFit(size(640, 280)),
      ).position(new Position().gravity(compass(northWest())).offsetX(60).offsetY(92)),
    )
    return image.addTransformation(transformation).toURL()
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
