<template>
  <div class="flex">
    <NavBar />
    <div class="w-5/6 flex">
      <div class="w-1/6 flex">
        <GoalAddBar @fetchGoals="fetchGoals"/>
      </div>
      <div class="w-5/6">
        <div v-if="isLoading">
        <h1 class="h-screen text-center justify-center flex flex-col text-2xl">Loading...</h1>
      </div>
      <div v-else>
        <div v-if="goals.length == 0">
          <h1 class="h-screen text-center justify-center flex flex-col text-2xl">No goals yet...</h1>
        </div>
        <div v-else>
          <GoalPanel
            v-for="goal in goals"
            :key="goal.goal_id"
            :object="goal"
            @fetchGoals="fetchGoals"
          />
        </div>
      </div></div>
    </div>
  </div>
</template>

<script>
import GoalAddBar from "../components/GoalAddBar.vue";
import GoalPanel from "../components/GoalPanel.vue";
export default {
  async mounted() {
    const goals = await fetch(
      `http://localhost:3080/goals/user/${this.$store.state.session.user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await goals.json();
    this.goals = data;
    this.isLoading = false;
  },
  components: {
    GoalAddBar,
    GoalPanel,
  },
  data() {
    return {
      goals: [],
      isLoading: true,
    };
  },
  methods: {
    async fetchGoals() {
      const goals = await fetch(
        `http://localhost:3080/goals/user/${this.$store.state.session.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await goals.json();
      this.goals = data;
    },
  },
};
</script>

<style></style>
