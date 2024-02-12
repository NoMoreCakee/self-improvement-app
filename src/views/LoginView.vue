<template>
  <div
    class="w-1/3 mx-auto bg-gray-200 border-2 border-gray-300 my-4 rounded-lg"
  >
    <h1 class="text-2xl font-medium text-center my-4">
      Login to *insert name here*
    </h1>
    <form @submit.prevent="attemptLogin()" class="text-center">
      <TextBox
        class="bg-red-300 border-red-400 my-4 mx-4 p-0 font-medium"
        text="Wrong credentials!"
        v-if="wasIncorrect"
      />
      <TextBox
        class="bg-red-300 border-red-400 my-4 mx-4 p-0 font-medium"
        text="Empty or incorrect data!"
        v-if="emptyData"
      />
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
      wasIncorrect: false,
      emptyData: null,
    };
  },
  methods: {
    async attemptLogin() {
      if (this.loginData.username && this.loginData.password) {
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
            const data = await response.json();
            this.emitData(data);
            this.$router.push("/home");
            return true;
          } else {
            this.wasIncorrect = true;
            setTimeout(() => {
              this.wasIncorrect = false;
            }, 3000);
          }
        } catch (err) {
          if (err.status !== 403) {
            console.error("error during login: ", err.message);
          }
        }
      } else {
        this.emptyData = true;
        setTimeout(() => {
          this.emptyData = false;
        }, 3000);
      }
    },
    emitData(data) {
      this.$emit("emitData", data);
    },
  },
};
</script>

<style></style>
