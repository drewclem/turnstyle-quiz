<template>
  <div class="flex flex-col">
    <select
      class="border border-gray-300 p-2"
      v-bind="$attrs"
      v-on="listeners"
      :required="isRequired"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    >
      <option value="" selected disabled>Select</option>

      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners;
      return listeners;
    },
  },
};
</script>
