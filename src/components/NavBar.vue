<template>
  <div class="flex flex-col w-1/6 text-center text-lg h-screen bg-gray-200">
    <div>
      <img src="../assets/vue.svg" class="mx-auto w-24 my-3" />
    </div>
    <router-link
      v-for="link in links"
      :key="link.id"
      class="p-2 bg-gray-200 hover:bg-gray-300 duration-150"
      :to="link.path"
    >
      <div>
        {{ link.name }}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          id: 1,
          name: "Home",
          path: "/",
        },
        {
          id: 2,
          name: "Habits",
          path: "/habits",
        },
      ],
    };
  },
};
</script>

<style scoped>
.router-link-active {
  background: #ababab;
}
</style>
