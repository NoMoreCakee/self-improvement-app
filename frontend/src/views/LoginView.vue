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
        v-model="password"
      />
      <br />
      <br />
      <DefaultButton
        class="w-1/3 py-1 text-xl my-4 font-medium"
        in_text="Login"
      />
    </form>
    <p class="text-center mb-4 text-lg">
      No account?
      <router-link
        to="/register"
        class="text-blue-600 hover:text-blue-700 hover:underline font-medium"
        >Register here!</router-link
      >
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",

      loginData: {
        username: "",
        hashedPass: "",
      },
      wasIncorrect: false,
      emptyData: null,
    };
  },
  methods: {
    async attemptLogin() {
      if (this.loginData.username && this.password) {
        await this.hashPassword(this.password);
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
            this.$store.commit("setSession", data);
            this.$cookies.set("session", data);
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
    async hashPassword(plain_pass) {
      try {
        const hashBuffer = await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(plain_pass)
        );
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashedString = hashArray
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");
        this.loginData.hashedPass = hashedString;
      } catch (error) {
        console.error("Error hashing password:", error);
      }
    },
  },
};
</script>

<style></style>
