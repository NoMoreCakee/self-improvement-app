<template>
  <div
    class="flex flex-col w-1/6 text-center text-lg h-screen bg-gray-200 justify-between"
  >
    <div class="flex flex-col">
      <div>
        <img src="../assets/vue.svg" class="mx-auto w-24 mt-3" />
      </div>
      <div
        class="flex flex-col items-center gap-1 border-b-2 border-gray-300 py-3"
      >
        <p class="font-medium text-xl">
          {{ this.$store.state.session.user.username }}
        </p>
        <span
          class="bg-gray-300 border-gray-400 border px-2 rounded-full w-1/5 mx-auto font-medium hover:bg-gray-400 duration-150"
          >{{ this.$store.state.session.user.points }}</span
        >
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
    <DefaultButton in_text="Logout" class="mx-auto" @click="logout" />
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
          path: "/home",
        },
        {
          id: 2,
          name: "Habits",
          path: "/habits",
        },
        {
          id: 3,
          name: "Goals",
          path: "/goals",
        },
      ],
    };
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.router-link-active {
  background: #ababab;
}
</style>
