<template>
  <div
    class="w-1/3 mx-auto bg-gray-200 border-2 dark:bg-gray-800 border-gray-300 rounded-lg"
  >
    <h1 class="text-2xl font-medium text-center my-4">
      Register to *insert name here*
    </h1>
    <form
      @submit.prevent="attemptRegister()"
      class="text-center dark:bg-gray-800"
    >
      <TextBox
        class="bg-red-300 border-red-400 my-4 mx-4 p-0 font-medium"
        text="Empty or incorrect data!"
        v-if="emptyData"
      />
      <InputBar
        in_type="text"
        class="w-1/2"
        in_placeholder="Username"
        v-model="registerData.username"
      />
      <br />
      <InputBar
        in_type="password"
        class="w-1/2"
        in_placeholder="Password"
        v-model="password"
      />
      <br />
      <InputBar
        in_type="email"
        class="w-1/2"
        in_placeholder="E-mail"
        v-model="registerData.email"
      />
      <br />
      <br />
      <DefaultButton
        class="w-1/3 py-1 text-xl my-4 font-medium"
        in_text="Register"
      />
    </form>
    <p class="text-center mb-4 text-lg">
      Already have an account?
      <router-link
        to="/"
        class="text-blue-600 hover:text-blue-700 hover:underline font-medium"
      >
        Login here!
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  props: ['session'],
  data() {
    return {
      password: '',
      registerData: {
        username: '',
        hashedPass: '',
        email: '',
      },
      emptyData: null,
    }
  },
  methods: {
    emitData(data) {
      this.$emit('emitData', data)
    },
    async attemptRegister() {
      if (
        this.registerData.username &&
        this.password &&
        this.registerData.email
      ) {
        await this.hashPassword(this.password)
        try {
          const result = await fetch('http://127.0.0.1:3080/register', {
            method: 'POST',
            body: JSON.stringify(this.registerData),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            mode: 'cors',
          })
          if (result.ok) {
            this.$router.push('/')
          }
        } catch (err) {
          console.log('no')
        }
      }
    },
    async hashPassword(plain_pass) {
      try {
        const hashBuffer = await crypto.subtle.digest(
          'SHA-256',
          new TextEncoder().encode(plain_pass),
        )
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashedString = hashArray
          .map((byte) => byte.toString(16).padStart(2, '0'))
          .join('')
        this.registerData.hashedPass = hashedString
      } catch (error) {
        console.error('Error hashing password:', error)
      }
    },
  },
}
</script>

<style></style>
