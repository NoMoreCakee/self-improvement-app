<template>
  <div class="w-1/4 border-2 border-gray-300 rounded-lg bg-gray-200 my-3 px-3">
    <h1 class="text-2xl font-medium my-3 text-center">Agenda</h1>
    <div
      v-if="isLoading"
      class="text-center my-5 text-lg font-medium bg-white rounded-lg w-1/2 mx-auto py-3 border-gray-300"
    >
      Loading
    </div>
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="flex justify-between px-4 my-3 w-full bg-white rounded-lg py-3 border-gray-300 border-2 hover:bg-gray-100"
      v-else
    >
      <div @click="markDone(todo)" class="w-full">
        <h1 class="text-xl">{{ todo.habit_name }}</h1>
        <div class="flex justify-between">
          <p class="text-lg">
            <span class="font-medium">Due: </span>{{ todo.habit_time }}
          </p>
          <p class="text-lg">
            {{ todo.point_value }} <span class="font-medium">points</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getHabits();
  },
  data() {
    return {
      todos: [],
      isLoading: true,
    };
  },
  methods: {
    async getHabits() {
      const result = await fetch("http://127.0.0.1:3080/habits", {
        method: "POST",
        body: JSON.stringify({ user_id: this.$store.state.session.user.id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await result.json();
      this.todos = data;
      this.isLoading = false;
    },
    async markDone(todo) {
      const result = await fetch("http://127.0.0.1:3080/doneHabit", {
        method: "POST",
        body: JSON.stringify({
          habit_id: todo.habit_id,
          user_id: this.$store.state.session.user.id,
        }),
      });
    },
  },
};
</script>

<style></style>
