<script lang="ts">
  import { t } from 'i18next'
  import Img from '@zerodevx/svelte-img'
  import Hero from '@app/lib/components/Hero.svelte'
  import Section from '@app/lib/components/Section.svelte'
  import Article from '@app/lib/components/Article.svelte'
  import ArticleShowcase from '@app/lib/components/ArticleShowcase.svelte'
  import ArticleContainer from '@app/lib/components/ArticleContainer.svelte'
  import Button from '@app/lib/components/Button.svelte'

  import shelfImage from '$lib/assets/images/shelf.png?run&lqip=0'

  import type { PageData } from './$types'

  export let data: PageData
  $: showcase = data.showcase
  $: articles = data.articles
  $: count = data.count
</script>

<Hero
  title={[t('blog:heroTitle.base'), t('blog:heroTitle.highlight')]}
  tagLines={t('blog:heroTagLines', { returnObjects: true })}
  arrowLabel={t('blog:heroArrowLabel')}
>
  <Img
    class="hidden sm:block w-1/2 h-auto mx-auto"
    src={shelfImage}
    alt={t('blog:heroImageAlt')}
    width={1600}
    height={470}
  />
</Hero>

{#if showcase}
  <Section title={t('blog:latestArticleSection.title')}>
    <ArticleShowcase
      title={showcase.title}
      description={showcase.description}
      date={showcase.publishingDate}
      href={`/blog/${showcase.slug}`}
    >
      <img
        class="rounded-lg w-full mb-5 md:mb-0 md:max-w-[40%] flex-shrink-0 aspect-[9/16]"
        src={showcase.thumbnailImageUrl}
        alt={showcase.thumbnailImageAlt}
        width={1080}
        height={1920}
      />
    </ArticleShowcase>
  </Section>
{/if}

{#if articles.length > 0}
  <Section title={t('blog:previousArticlesSection.title')}>
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
    {#if count > 4}
      <div class="flex flex-col justify-center items-center w-full">
        <Button label={t('blog:previousArticlesSection.seeMoreButton')} />
      </div>
    {/if}
  </Section>
{/if}
