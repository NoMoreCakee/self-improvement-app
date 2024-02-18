<template>
  <div class="max-h-screen">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    if (!this.$store.state.session && !this.$cookies.get("session")) {
      this.$router.push("/");
    }
    if (this.$cookies.get("session")) {
      this.$store.commit("setSession", this.$cookies.get("session"));
    }
  },
};
</script>
