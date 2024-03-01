<template>
  <div class="flex">
    <NavBar />
    <div class="w-5/6 flex">
      <div class="w-1/6 flex">
        <GoalAddBar />
      </div>
      <div v-for="goal in goals" :key="goal.id" class="w-full">
        <GoalPanel :object="goal" />
      </div>
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
  },
  components: {
    GoalAddBar,
    GoalPanel,
  },
  data() {
    return {
      goals: [],
    };
  },
};
</script>

<style></style>
