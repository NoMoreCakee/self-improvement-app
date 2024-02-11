<template>
  <div
    class="bg-gray-100 p-3 border-gray-300 border-2 rounded-lg flex flex-col gap-1"
  >
    <h1 class="text-2xl font-medium">{{ title }}</h1>
    <p class="text-lg">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    text: String,
  },
};
</script>

<style></style>
