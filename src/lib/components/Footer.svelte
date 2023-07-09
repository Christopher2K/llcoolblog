<script lang="ts">
  import i18next, { t } from 'i18next'
  import Typography from './Typography.svelte'
  import Socials from './Socials.svelte'
  import type { ChangeEventHandler } from 'svelte/elements'

  const onSelectLang: ChangeEventHandler<HTMLSelectElement> = event => {
    const element = event.target as HTMLSelectElement
    document.location.href = document.location.href + '?lang=' + element.value
  }
</script>

<footer class="w-full bg-primary-900 dark:bg-secondary-900">
  <div class="max-w-[1000px] w-full p-10 mx-auto">
    <Typography variant="subheading1" class="mb-3 text-light" disableColorClasses
      >Christopher N. Katoyi Kaba | LL Cool Chris_</Typography
    >

    <div class="mb-6">
      <Socials size="lg" theme="light" />
    </div>

    <select
      class="py-2 px-4 mb-6 hint2 border-2 border-light rounded-md bg-primary-700 dark:bg-secondary-700 text-light"
      on:change={onSelectLang}
    >
      <option selected={i18next.language === 'en'} value="en">English</option>
      <option selected={i18next.language === 'fr'} value="fr">Français</option>
    </select>

    <Typography class="text-light" disableColorClasses>{t('footer:copyright')}</Typography
    >
  </div>
</footer>
