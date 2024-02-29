<template>
  <div class="flex">
    <NavBar />
    <div class="w-5/6">
      <div class="w-1/6 flex">
        <GoalAddBar />
      </div>
    </div>
  </div>
</template>

<script>
import GoalAddBar from "../components/GoalAddBar.vue";
export default {
  components: {
    GoalAddBar,
  },
};
</script>

<style></style>
