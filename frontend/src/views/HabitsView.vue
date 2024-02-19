<template>
  <div class="flex">
    <NavBar id="navbar" />
    <div class="w-5/6 flex">
      <div class="w-1/6">
        <HabitAddBar @added="appendHabit" @refresh-habits="getHabits" />
      </div>
      <div class="w-5/6">
        <div
          v-if="isLoading"
          class="h-screen text-center justify-center flex flex-col text-2xl"
        >
          <p>Loading...</p>
        </div>
        <div v-else>
          <div
            v-if="habits.length == 0"
            class="h-screen text-center justify-center flex flex-col text-2xl"
          >
            <h1>No habits yet...</h1>
          </div>
          <HabitPanel
            v-for="habit in habits"
            :key="habit.habit_id"
            :object="habit"
            @done="doneHabit"
            @delete="deleteHabit"
            v-else
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HabitAddBar from "../components/HabitAddBar.vue";
import HabitPanel from "../components/HabitPanel.vue";
export default {
  components: { HabitAddBar, HabitPanel },
  async created() {
    console.log(this.$store.state.session);
    const result = await fetch("http://127.0.0.1:3080/habits", {
      method: "POST",
      body: JSON.stringify({ user_id: this.$store.state.session.user.id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
    });
    const data = await result.json();
    console.log(data);
    this.habits = data;
    console.log(this.habits);
    this.isLoading = false;
  },
  data() {
    return {
      isLoading: true,
      habits: [],
    };
  },
  methods: {
    sortByBool(a, b) {
      if (a.isDone && !b.isDone) {
        return 1;
      }
      if (!a.isDone && b.isDone) {
        return -1;
      }
      return 0;
    },
    appendHabit(id, name, rep, isDone) {
      this.habits.push({ id: id, name: name, rep: rep, isDone: isDone });
      console.log(id);
    },
    doneHabit(id) {
      console.log(id);
      const current_habit = this.habits.find((h) => h.id === id);
      if (current_habit) {
        current_habit.isDone = !current_habit.isDone;
      }
    },
    async deleteHabit(id) {
      const result = await fetch("http://127.0.0.1:3080/deleteHabit", {
        method: "POST",
        body: JSON.stringify({ habit_id: id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
      });
      this.getHabits();
    },
    logout() {
      this.$emit("logout");
    },
    async getHabits() {
      const result = await fetch("http://127.0.0.1:3080/habits", {
        method: "POST",
        body: JSON.stringify({ user_id: this.$store.state.session.user.id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
      });
      const data = await result.json();
      this.habits = data;
      console.log(this.habits);
    },
  },
};
</script>
