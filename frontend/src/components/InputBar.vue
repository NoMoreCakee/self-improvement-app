<template>
  <input
    :type="in_type"
    class="mt-4 text-lg mx-auto px-2 py-1 rounded-lg outline-none border-2 border-gray-300"
    :placeholder="in_placeholder"
    v-model="content"
    @input="handleInput"
    :step="in_step"
    :min="in_min"
    :max="in_max"
  />
</template>

<script>
export default {
  props: ["value", "in_type", "in_placeholder", "in_step", "in_min", "in_max"],
  emits: ["input"],
  data() {
    return {
      content: this.value,
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", this.content);
    },
  },
};
</script>
