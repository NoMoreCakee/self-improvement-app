<template>
  <div class="flex">
    <NavBar id="navbar" @logout="logout" :session="session" />
    <div class="w-5/6 flex">
      <div class="w-1/6">
        <HabitAddBar
          @added="appendHabit"
          :session="session"
          @refresh-habits="getHabits"
        />
      </div>
      <div class="w-5/6">
        <HabitPanel
          v-for="habit in habits[0]"
          :key="habit.habit_id"
          :object="habit"
          @done="doneHabit"
          @delete="deleteHabit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HabitAddBar from "../components/HabitAddBar.vue";
import HabitPanel from "../components/HabitPanel.vue";
export default {
  components: { HabitAddBar, HabitPanel },
  props: ["session"],
  async mounted() {
    if (!this.session) {
      this.$router.push("/");
    } else {
      this.habits = await this.getHabits();
    }
  },
  data() {
    return {
      isOpen: true,
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
      if (result.ok) {
        this.getHabits();
      }
    },
    logout() {
      this.$emit("logout");
    },
    async getHabits() {
      const result = await fetch("http://127.0.0.1:3080/habits", {
        method: "POST",
        body: JSON.stringify({ user_id: this.session.id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
      });
      if (result.ok) {
        const data = await result.json();
        this.habits.push(data);
        console.log(this.habits);
      }
    },
  },
};
</script>
