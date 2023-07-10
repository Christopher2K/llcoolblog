<script lang="ts">
  import { t } from 'i18next'
  import Img from '@zerodevx/svelte-img'

  import Hero from '@app/lib/components/Hero.svelte'
  import Section from '@app/lib/components/Section.svelte'
  import Timeline from '@app/lib/components/Timeline.svelte'

  import avatarImage from '$lib/assets/images/avatar.png?run&lqip=0'
</script>

<Hero
  title={[t('about:heroTitle.base'), t('about:heroTitle.highlight')]}
  tagLines={t('about:heroTagLines', { returnObjects: true })}
  arrowLabel={t('about:heroArrowLabel')}
>
  <Img
    class="hidden sm:block h-[20rem] w-auto mx-auto"
    src={avatarImage}
    alt={t('about:heroImageAlt')}
    width={800}
    height={800}
  />
</Hero>

<Section title={t('about:timelineSection.title')}>
  <Timeline />
</Section>
