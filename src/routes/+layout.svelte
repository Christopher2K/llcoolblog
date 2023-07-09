<script lang="ts">
  import '@app/styles/app.css'

  import Nav from '@app/lib/components/Nav.svelte'
  import Footer from '@app/lib/components/Footer.svelte'
</script>

<div
  class="max-w-[1340px] mx-auto grid grid-rows-mobile md:grid-rows-none md:grid-cols-tablet lg:grid-cols-desktop"
>
  <Nav />
  <main class="px-4 sm:px-6 min-h-screen">
    <slot />
  </main>
</div>
<Footer />
