<template>
  <div class="flex flex-col w-1/6 text-center text-lg h-screen bg-gray-200">
    <div>
      <img src="../assets/vue.svg" class="mx-auto w-24 my-3" />
    </div>
    <p class="font-medium">
      {{ this.$store.state.session.user.username }} -
      {{ this.$store.state.session.user.points }}
    </p>
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
