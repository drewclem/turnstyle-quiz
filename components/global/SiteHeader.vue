<template>
  <header class="px-6 lg:px-0 py-3">
    <div class="container flex justify-between items-center">
      <nuxt-link to="/">
        <SirenLogo class="w-32" />
        <span class="sr-only">Go to homepage</span>
      </nuxt-link>

      <nav>
        <ul class="nav-list">
          <li class="nav-item">
            <a href="https://github.com/drewclem">
              Github
              <ExternalLink />
            </a>
          </li>
          <li class="nav-item">
            <a href="https://drewclem.com">
              Hire me
              <ExternalLink />
            </a>
          </li>
          <li class="nav-item">
            <button class="btn" @click="toggleMode" type="button">
              {{ toggleModeText }}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ExternalLink from "@/components/svg/ExternalLink.vue";
import SirenLogo from "@/components/svg/SirenLogo.vue";

export default {
  components: {
    ExternalLink,
    SirenLogo,
  },
  computed: {
    ...mapState("global", ["isDarkMode"]),
    toggleModeText() {
      return this.isDarkMode ? "Light Mode" : "Dark Mode";
    },
  },
  methods: {
    ...mapMutations({ toggleMode: "global/toggleMode" }),
  },
};
</script>

<style lang="postcss" scoped>
.nav-list {
  @apply flex items-center space-x-10;

  & .nav-item a {
    @apply flex items-center tracking-widest;

    & svg {
      @apply h-4 w-4 ml-2 -mt-1;
    }
  }
}
</style>
