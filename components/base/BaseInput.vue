<template>
  <div class="flex flex-col">
    <input
      class="border border-gray-300 p-2"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :value="value"
      v-on="listeners"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
      validator: (value) => {
        const validProps = [
          "text",
          "email",
          "tel",
          "url",
          "search",
          "password",
        ];
        return validProps.includes(value);
      },
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
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
