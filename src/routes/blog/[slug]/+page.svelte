<script lang="ts">
  import { format } from 'date-fns'

  import '@app/styles/prism.css'
  import Typography from '@app/lib/components/Typography.svelte'
  import { getDateLocale } from '@app/lib/utils'
  import SEO from '@app/lib/components/SEO.svelte'

  import type { PageData } from './$types'

  export let data: PageData
  $: article = data.article
</script>

<SEO
  data={{
    title: article.title,
    description: article.description,
    openGraph: {
      type: 'article',
    },
  }}
  forceUseDefaultOgTitle
/>

<Typography class="capitalize my-8"
  >{format(article.publishingDate, 'PPPP', { locale: getDateLocale() })}</Typography
>
<div class="flex flex-row justify-start items-start gap-2 flex-wrap mb-8">
  {#each article.tags as tag}
    <Typography
      disableColorClasses
      tag="span"
      class="bg-neutral-500 px-2 rounded-md text-neutral-50"
    >
      {tag}
    </Typography>
  {/each}
</div>
<Typography tag="h1" variant="heading2" class="mb-8">{article.title}</Typography>
<div class="flex flex-col justify-start items-center">
  <img
    class="rounded-md mb-2 aspect-video"
    src={article.heroImageUrl}
    alt={article.heroImageCaption}
    width={1920}
    height={1080}
  />

  <Typography tag="span" variant="hint2" class="mb-8"
    >{article.heroImageCaption}</Typography
  >
</div>

<article class="px-8">
  {@html article.content}
</article>

<style lang="postcss">
  article {
    @apply mb-12 text-dark;

    :global(h2) {
      @apply subheading2 mt-20 mb-12;
    }

    :global(h3) {
      @apply subheading1 mt-16 mb-10;
    }

    :global(h4) {
      @apply bigbody mt-12 mb-8;
    }

    :global(p) {
      @apply body mb-8;
    }

    :global(a) {
      @apply underline;
    }

    :global(li) {
      @apply body;
    }

    :global(ol),
    :global(ul) {
      @apply pl-8 mb-8;
    }

    :global(ul) {
      @apply list-disc list-inside;
    }

    :global(ol) {
      @apply list-decimal list-inside;
    }

    :global(p code) {
      @apply text-neutral-50 bg-neutral-600 rounded-md px-1;
    }

    :global(blockquote) {
      @apply py-8 bg-neutral-200 mb-8 border-l-8 border-l-neutral-500;

      :global(p) {
        @apply bigbody italic pl-8 !important;
      }
    }

    :global(pre) {
      @apply p-5 rounded-lg mb-8;
    }

    /* Specifics */
    :global(p:has(+ ul, + ol, img)) {
      @apply mb-4 bigbody;
    }
  }

  /* Dark mode */
  :global(html.dark) article {
    @apply text-light;

    :global(p code) {
      @apply bg-neutral-50 text-neutral-600;
    }

    :global(blockquote) {
      @apply bg-neutral-700;
    }
  }
</style>
