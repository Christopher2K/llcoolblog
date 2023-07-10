<script lang="ts">
  import { t } from 'i18next'
  import { Sun, Moon, X, Menu, Home, Book, User } from 'lucide-svelte'
  import { browser } from '$app/environment'
  import { page } from '$app/stores'

  import Typography from './Typography.svelte'
  import RoundedIconButton from './RoundedIconButton.svelte'
  import NavItem from './NavItem.svelte'
  import Socials from './Socials.svelte'

  let menuOpen = false
  let mode: 'light' | 'dark' | undefined = undefined

  let path: string
  $: path = $page.url.pathname

  function openMenu() {
    menuOpen = true
  }

  function closeMenu() {
    menuOpen = false
  }

  function turnLightModeOn() {
    mode = 'light'
    localStorage.setItem('theme', 'light')
    document.documentElement.classList.remove('dark')
  }

  function turnDarkModeOn() {
    mode = 'dark'
    localStorage.setItem('theme', 'dark')
    document.documentElement.classList.add('dark')
  }

  $: if (browser) {
    mode = (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light'
  }
</script>

<nav
  class="w-full sticky top-0 left-0 p-4 h-fit md:flex md:flex-col md:justify-start md:items-center md:gap-10 bg-light dark:bg-dark z-40"
>
  <div
    class="h-[72px] md:h-auto lg:w-full flex flex-row md:flex-col md:gap-3 justify-between items-center"
  >
    <div class="flex flex-row justify-start items-end gap-4">
      <Typography variant="subheading2" class="md:hidden">
        <a href={'/'}>Christopher</a>
      </Typography>
    </div>

    <div
      class="flex flex-col lg:flex-row-reverse justify-start lg:justify-between items-center md:gap-10 lg:gap-6 lg:w-full"
    >
      <div class="flex flex-row justify-start items-center gap-4">
        <RoundedIconButton
          class="md:hidden"
          label={menuOpen ? t('common:nav.closeMenu') : t('common:nav.openMenu')}
          type="button"
          on:click={menuOpen ? closeMenu : openMenu}
        >
          {#if menuOpen}
            <X class="h-6 text-neutral-50" aria-hidden="true" />
          {:else}
            <Menu class="h-6 text-neutral-50" aria-hidden="true" />
          {/if}
        </RoundedIconButton>

        {#if mode !== undefined}
          <RoundedIconButton
            label={mode === 'light'
              ? t('common:nav.darkModeToggle')
              : t('common:nav.lightModeToggle')}
            type="button"
            on:click={mode === 'light' ? turnDarkModeOn : turnLightModeOn}
          >
            {#if mode === 'dark'}
              <Sun class="h-6 text-neutral-50" aria-hidden="true" />
            {:else}
              <Moon class="h-6 text-neutral-50" aria-hidden="true" />
            {/if}
          </RoundedIconButton>
        {/if}
      </div>

      <img
        class="hidden md:block rounded-full h-16 w-16"
        src="/images/chris.jpg"
        alt={t('common:nav.profilePictureAlt')}
      />
    </div>
  </div>

  <section class="hidden self-start lg:flex flex-col gap-4">
    <div>
      <Typography>Christopher N. Katoyi Kaba</Typography>
      <Typography variant="hint2">@LLCoolChris_</Typography>
    </div>
    <div>
      <Typography>{t('common:nav.job')}</Typography>
      <Typography>{t('common:nav.streamer')}</Typography>
    </div>
    <Typography variant="hint2">Toronto, Canada</Typography>
  </section>

  <section class="hidden self-start lg:flex flex-row justify-start items-start gap-4">
    <Socials />
  </section>

  <!-- Nav menu -->
  <div
    class:hidden={!menuOpen}
    class:flex={menuOpen}
    class="md:flex absolute z-50 md:relative flex-col justify-start items-start gap-5 bg-light dark:bg-dark sm:bg-transparent px-4 md:px-0 top-full md:top-auto left-0 md:left-auto right-0 md:right-auto h-[calc(100vh-72px-theme(space.4)-theme(space.4))] md:h-auto w-full"
  >
    <NavItem
      hideTextOnTablet
      label={t('common:nav.links.home')}
      href="/"
      currentPath={path}
      absolute
    >
      <Home slot="icon" />
    </NavItem>
    <NavItem
      hideTextOnTablet
      label={t('common:nav.links.blog')}
      href="/blog"
      currentPath={path}
    >
      <Book slot="icon" />
    </NavItem>
    <NavItem
      hideTextOnTablet
      label={t('common:nav.links.aboutMe')}
      href="/about"
      currentPath={path}
    >
      <User slot="icon" />
    </NavItem>
  </div>
</nav>
