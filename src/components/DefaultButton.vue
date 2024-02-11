<template>
  <button
    class="mt-2 bg-blue-500 w-1/2 p-1 rounded-lg text-white hover:bg-blue-600 duration-150"
  >
    {{ in_text }}
  </button>
</template>

<script>
export default {
  props: ["in_text"],
};
</script>
