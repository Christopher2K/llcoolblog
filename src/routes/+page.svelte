<script lang="ts">
  import { t } from 'i18next'
  import Img from '@zerodevx/svelte-img'
  import Hero from '@app/lib/components/Hero.svelte'
  import Typography from '@app/lib/components/Typography.svelte'
  import Section from '@app/lib/components/Section.svelte'
  import ArticleContainer from '@app/lib/components/ArticleContainer.svelte'
  import Article from '@app/lib/components/Article.svelte'
  import Button from '@app/lib/components/Button.svelte'

  import keyboardImage from '$lib/assets/images/keyboard.png?run&lqip=0'
  import { getArticleSlug } from '$lib/utils'
  import type { PageData } from './$types'

  export let data: PageData
  let tagLines = t('home:heroTagLines', { returnObjects: true }) as string[]

  $: count = data.count
  $: articles = data.articles
</script>

<Hero
  title={[t('home:heroTitle.base'), t('home:heroTitle.highlight')]}
  {tagLines}
  arrowLabel={t('home:heroArrowLabel')}
>
  <Img
    class="hidden sm:block w-1/2 h-auto mx-auto"
    src={keyboardImage}
    alt={t('home:heroImageAlt')}
    width={1100}
    height={530}
  />
</Hero>

<Section title={t('home:videoSection.title')}>
  <iframe
    title="Twitch"
    class="w-full aspect-video"
    src="https://player.twitch.tv?channel=llcoolchris_&parent=localhost&parent=christopher2k.dev"
    allowfullscreen
  />
</Section>

<Section title={t('home:blogSection.title')}>
  <Typography class="mb-10">{t('home:blogSection.description')}</Typography>
  <ArticleContainer class="mb-10">
    {#each articles as article}
      <Article
        href={`/blog/${article.slug}`}
        title={article.title}
        date={article.publishingDate}
      >
        <img
          slot="image"
          class="rounded-lg aspect-[9/16]"
          src={article.thumbnailImageUrl}
          alt={article.thumbnailImageAlt}
          width={1080}
          height={1920}
        />
      </Article>
    {/each}
  </ArticleContainer>
  {#if count > 3}
    <Button link={{ href: '/blog' }} label={t('home:blogSection.seeMore')} />
  {/if}
</Section>
