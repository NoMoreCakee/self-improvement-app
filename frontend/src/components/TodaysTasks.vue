<template>
  <div
    class="xl:w-1/4 w-full mx-auto border-2 border-gray-300 rounded-lg bg-gray-200 my-3 px-3 dark:bg-gray-800 dark:border-gray-700"
  >
    <h1 class="text-2xl font-medium my-3 text-center">Agenda</h1>
    <div
      v-if="isLoading"
      class="text-center my-5 text-lg font-medium bg-white rounded-lg w-1/2 mx-auto py-3 border-gray-300 dark:bg-gray-700"
    >
      Loading
    </div>
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="flex justify-between px-4 my-3 w-full bg-white rounded-lg py-3 border-gray-300 border-2 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600"
      v-else
    >
      <div @click="markDone(todo)" class="w-full">
        <h1 class="text-xl">{{ todo.habit_name }}</h1>
        <div class="flex justify-between">
          <p class="text-lg">
            <span class="font-medium">Due:</span>
            {{ todo.habit_time }}
          </p>
          <p class="text-lg">
            {{ todo.point_value }}
            <span class="font-medium">points</span>
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="todos.length == 0 && !isLoading"
      class="bg-white text-center rounded-lg py-4 mb-3 mt-6 dark:bg-gray-700"
    >
      <p class="text-xl">No tasks for today</p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.todos = []
    this.getHabits()
  },
  data() {
    return {
      todos: [],
      isLoading: true,
    }
  },
  methods: {
    async getHabits() {
      const result = await fetch('http://127.0.0.1:3080/habits', {
        method: 'POST',
        body: JSON.stringify({ user_id: this.$store.state.session.user.id }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const data = await result.json()
      this.todos = this.filterHabits(data)
      this.isLoading = false
    },
    //create a function that filters habits for today
    filterHabits(habits) {
      let filtered_todos = []
      for (let i = 0; i < habits.length; i++) {
        const today = new Date()
        const formattedDate = `${new Date().getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`
        const formattedHabitDate = `${new Date(
          habits[i].last_appeared,
        ).getFullYear()}-${
          new Date(habits[i].last_appeared).getMonth() + 1
        }-${new Date(habits[i].last_appeared).getDate()}`
        if (formattedHabitDate !== formattedDate) {
          if (habits[i].habit_frequency === 'daily') {
            filtered_todos.push(habits[i])
          } else if (habits[i].habit_frequency === 'weekly') {
            //turn every element or habit_days to a number
            habits[i].habit_days = habits[i].habit_days.split('')

            habits[i].habit_days.forEach((day) =>
              habits[i].habit_days.push(Number(day)),
            )

            if (habits[i].habit_days.includes(new Date().getDay())) {
              filtered_todos.push(habits[i])
            }
          }
        }
      }
      // filter for habits where last_appeared is not today
      filtered_todos = filtered_todos.filter(
        (habit) => habit.last_appeared !== new Date(),
      )
      return filtered_todos
    },

    async markDone(todo) {
      const result = await fetch('http://127.0.0.1:3080/doneHabit', {
        method: 'POST',
        body: JSON.stringify({
          habit_id: todo.habit_id,
          user_id: this.$store.state.session.user.id,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      this.$store.commit('addPoints', todo.point_value)
      todo.last_appeared = new Date().toDateString()
      this.getHabits()
    },
  },
}
</script>

<style></style>
