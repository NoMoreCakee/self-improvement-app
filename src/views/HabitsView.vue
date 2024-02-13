<template>
  <div class="flex">
    <NavBar id="navbar" @logout="logout" :session="session" />
    <div class="w-5/6" :class="isOpen ? 'flex' : 'flex flex-col'">
      <HabitAddBar @closed="hmbClosed()" v-if="isOpen" @added="appendHabit" />
      <div v-else class="w-1/6 p-5" id="">
        <div
          class="hover:bg-gray-300 p-2 w-1/6 rounded-full cursor-pointer"
          @click="this.isOpen = true"
        >
          <Transition name="disappear">
            <img src="../assets/hamburger.svg" id="img" />
          </Transition>
        </div>
      </div>
      <div :class="isOpen ? 'w-5/6' : 'w-full'">
        <HabitPanel
          v-for="habit in habits"
          :key="habit.id"
          :object="habit"
          :isOpen="isOpen"
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
  mounted() {
    if (!this.session) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      isOpen: true,
      habits: [],
    };
  },
  methods: {
    hmbClosed() {
      this.isOpen = false;
    },
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
    deleteHabit(id) {
      this.habits = this.habits.filter((h) => h.id != id);
    },
    logout() {
      this.$emit("logout");
    },
  },
  watch: {
    habits: {
      handler(val) {
        this.habits.sort((a, b) => {
          if (a.isDone !== b.isDone) {
            return a.isDone ? 1 : -1;
          } else {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          }
        });
      },
      deep: true,
    },
  },
};
</script>
