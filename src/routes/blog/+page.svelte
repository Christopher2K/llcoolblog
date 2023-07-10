<script lang="ts">
  import { t } from 'i18next'
  import Img from '@zerodevx/svelte-img'
  import Hero from '@app/lib/components/Hero.svelte'

  import shelfImage from '$lib/assets/images/shelf.png?run&lqip=0'
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

<!-- {
    latestArticle && (
      <Section title={t('blog:latestArticleSection.title')}>
        <ArticleShowcase
          title={latestArticle.data.title}
          description={latestArticle.data.description}
          date={latestArticle.data.publishingDate}
          href={localizePath(`/blog/${getArticleSlug(latestArticle.slug)}`)}
        >
          <Image
            class="rounded-lg w-full mb-5 md:mb-0 md:max-w-[40%] flex-shrink-0"
            src={latestArticle.data.thumbnailImageUrl}
            alt={latestArticle.data.thumbnailImageAlt}
            width={1080}
            height={1920}
            aspectRatio="9:16"
          />
        </ArticleShowcase>
      </Section>
    )
  }

  {
    shouldShowPreviousSection && (
      <Section title={t('blog:previousArticlesSection.title')}>
        <ArticleContainer class="mb-10">
          {recentArticles.map(({ data, slug }) => (
            <Article
              href={localizePath(`/blog/${getArticleSlug(slug)}`)}
              title={data.title}
              date={data.publishingDate}
            >
              <Image
                slot="image"
                class="rounded-lg"
                src={data.thumbnailImageUrl}
                alt={data.thumbnailImageAlt}
                width={1080}
                height={1920}
                aspectRatio="9:16"
              />
            </Article>
          ))}
        </ArticleContainer>

        {shouldShowMoreBtn && (
          <SectionCenteredFooter>
            <Button label={t('blog:previousArticlesSection.seeMoreButton')} />
          </SectionCenteredFooter>
        )}
      </Section>
    )
  } -->
