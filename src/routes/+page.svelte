<script lang="ts">
  import { t } from 'i18next'
  import Img from '@zerodevx/svelte-img'
  import Hero from '@app/lib/components/Hero.svelte'
  import Typography from '@app/lib/components/Typography.svelte'
  import Section from '@app/lib/components/Section.svelte'
  import ArticleContainer from '@app/lib/components/ArticleContainer.svelte'

  import keyboardImage from '$lib/assets/images/keyboard.png?run&lqip=0'

  let tagLines = t('home:heroTagLines', { returnObjects: true }) as string[]
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

<Section title={t('home:indieStoriesSection.title')}>
  <Typography class="mb-10">{t('home:indieStoriesSection.description')}</Typography>
  <ArticleContainer class="mb-10">
    <!-- {
        lastIndieStories.map(({ slug, data }) => (
          <Article
            href={localizePath(`/indie-stories/${getArticleSlug(slug)}`)}
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
        ))
      } -->
  </ArticleContainer>
  <!-- {
      shouldShowIndieStoriesMoreBtn && (
        <Button
          link={{ href: localizePath('/indie-stories') }}
          label={t('home:indieStoriesSection.seeMore')}
        />
      )
    } -->
</Section>

<Section title={t('home:blogSection.title')}>
  <Typography class="mb-10">{t('home:blogSection.description')}</Typography>
  <ArticleContainer class="mb-10">
    <!-- {
        lastBlogArticles.map(({ slug, data }) => (
          <Article
            href={localizePath(`/blog/${getArticleSlug(slug)}`)}
            title={data.title}
            date={data.publishingDate}
            imageSrc={data.thumbnailImageUrl}
            imageAlt={data.thumbnailImageAlt}
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
        ))
      } -->
  </ArticleContainer>
  <!-- {
      shouldShowBlogMoreBtn && (
        <Button
          link={{ href: localizePath('/blog') }}
          label={t('home:blogSection.seeMore')}
        />
      )
    } -->
</Section>
