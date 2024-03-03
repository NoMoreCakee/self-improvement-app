<template>
  <div class="flex flex-col xl:flex-row w-full">
    <MobileNavBar class="xl:hidden" />
    <NavBar id="navbar" class="xl:block hidden" />
    <div class="p-5 lg:w-5/6 h-screen">
      <TodaysTasks />
    </div>
  </div>
</template>

<script>
import TodaysTasks from '../components/TodaysTasks.vue'
export default {
  components: { TodaysTasks },
}
</script>
