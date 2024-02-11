<template>
  <div class="p-5 w-5/6">
    <TextBox title="Who are we?" text="lorem" />
    <TodoPanel />
  </div>
</template>

<script>
import TodoPanel from "../components/TodoPanel.vue";
export default {
  components: { TodoPanel },
};
</script>
