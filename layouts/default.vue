<template>
  <div
    :class="`${
      isDarkMode ? 'dark-mode' : 'light-mode'
    } flex flex-col min-h-screen`"
  >
    <SiteHeader />

    <main class="flex-grow">
      <Nuxt />
    </main>

    <SiteFooter />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("global", ["isDarkMode"]),
  },
};
</script>

<style lang="postcss" scoped></style>
