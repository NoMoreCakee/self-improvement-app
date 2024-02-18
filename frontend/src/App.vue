<template>
  <div class="max-h-screen">
    <router-view
      @emitData="setSession"
      :session="
        this.$cookies.isKey('user') ? this.$cookies.get('user') : undefined
      "
      @logout="logout"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      session: undefined,
    };
  },
  mounted() {
    if (this.$cookies.isKey("user")) {
      console.log("session found");
      this.session = this.$cookies.get("user");
      this.$router.push("/home");
    }
  },
  methods: {
    setSession(data) {
      this.session = data;
      this.$cookies.set("user", this.session.user, "7d");
      console.log(this.$cookies.get("user"));
    },
    logout() {
      this.session = undefined;
      this.$cookies.remove("user");
    },
  },
};
</script>
