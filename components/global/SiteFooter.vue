<template>
  <footer class="container text-center py-8">
    Copyright Siren &copy; {{ year }}
  </footer>
</template>

<script>
export default {
  computed: {
    year() {
      const date = new Date();
      return date.getFullYear();
    },
  },
};
</script>

<style lang="postcss" scoped></style>
