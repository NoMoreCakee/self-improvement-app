<script setup></script>

<template>
  <div class="max-h-screen">
    <router-view @emitData="setSession" :session="session" @logout="logout" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      session: undefined,
    };
  },
  methods: {
    setSession(data) {
      this.session = data;
      console.log(this.session.user);
    },
    logout() {
      this.session = undefined;
    },
  },
};
</script>
