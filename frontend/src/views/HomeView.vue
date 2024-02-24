<template>
  <div class="flex w-full">
    <NavBar id="navbar" />
    <div class="p-5 w-5/6">
      <TodaysTasks />
    </div>
  </div>
</template>

<script>
import TodaysTasks from "../components/TodaysTasks.vue";
export default {
  components: { TodaysTasks },
};
</script>
