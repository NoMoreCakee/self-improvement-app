<template>
  <div class="flex w-full">
    <NavBar id="navbar" />
    <div class="p-5 w-5/6">
      <TextBox title="Who are we?" text="lorem" />
      <TodoPanel />
    </div>
  </div>
</template>

<script>
import TodoPanel from "../components/TodoPanel.vue";
export default {
  components: { TodoPanel },
};
</script>
