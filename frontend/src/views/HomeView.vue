<template>
  <div class="flex w-full">
    <NavBar id="navbar" @logout="logout" :session="session" />
    <div class="p-5 w-5/6">
      <TextBox title="Who are we?" text="lorem" />
      <TodoPanel />
    </div>
  </div>
</template>

<script>
import TodoPanel from "../components/TodoPanel.vue";
export default {
  props: ["session"],
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
  mounted() {
    if (!this.session) {
      this.$router.push("/");
      console.log(this.session);
    }
  },
  components: { TodoPanel },
};
</script>
