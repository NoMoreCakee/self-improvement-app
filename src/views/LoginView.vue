<template>
  <div
    class="w-1/3 mx-auto bg-gray-200 border-2 border-gray-300 my-4 rounded-lg"
  >
    <h1 class="text-2xl font-medium text-center my-4">
      Login to *insert name here*
    </h1>
    <form @submit.prevent="attemptLogin()" class="text-center">
      <InputBar
        in_type="text"
        class="w-1/2"
        in_placeholder="Username"
        v-model="loginData.username"
      /><br />
      <InputBar
        in_type="password"
        class="w-1/2"
        in_placeholder="Password"
        v-model="loginData.password"
      />
      <br />
      <br />
      <DefaultButton
        class="w-1/3 py-1 text-xl my-4 font-medium"
        in_text="Login"
      />
      {{ loginData }}
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async attemptLogin() {
      try {
        const response = await fetch("http://127.0.0.1:3080/login", {
          method: "POST",
          body: JSON.stringify(this.loginData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          mode: "cors",
        });
        if (response.ok) {
          // const data = await response.json();
          router.push("/");
        } else {
          throw new Error(
            `Request failed with the status ${response.status}: ${response.statusText}`
          );
        }
      } catch {
        console.error("error during login:", error.message);
      }
    },
  },
};
</script>

<style></style>
