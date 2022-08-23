<template>
  <div>
    <div class="flex justify-center py-24">
      <div class="flex flex-col justify-center space-y-8 text-center">
        <h1 class="text-3xl xl:text-6xl">
          A trip down your<br />
          musical memory lane
        </h1>
        <p class="max-w-xl mx-auto opacity-75">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
        <div>
          <a class="btn" href="#quiz"> Start the Quiz </a>
        </div>
      </div>
    </div>

    <div class="container max-w-3xl px-6 lg:px-0">
      <Quiz />
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      form: {
        name: "",
      },
    };
  },
};
</script>
