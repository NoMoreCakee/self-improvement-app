<template>
  <div class="flex">
    <NavBar id="navbar" @logout="logout" />
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
  updated() {
    if (!this.session) {
      this.$router.push("/");
    }
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
  components: { TodoPanel },
};
</script>
