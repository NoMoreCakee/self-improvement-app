<template>
  <button
    class="my-10 bg-blue-500 w-1/2 p-1 rounded-lg text-white hover:bg-blue-600 duration-150"
    :type="in_type"
  >
    {{ in_text }}
  </button>
</template>

<script>
export default {
  props: ["in_text", "in_type"],
};
</script>
