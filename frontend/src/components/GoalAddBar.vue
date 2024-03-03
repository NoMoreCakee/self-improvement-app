<template>
  <div
    class="w-full h-screen bg-gray-200 dark:bg-gray-800 dark:border-x-2 dark:border-gray-700 border-l-2 border-l-gray-300 p-5 text-center"
  >
    <h1 class="text-2xl my-4">Add goals</h1>
    <form
      @submit.prevent="addGoal"
      class="flex flex-col justify-center items-center"
    >
      <InputBar in_type="text" in_placeholder="Name" v-model="goalName" class="w-full"/>
      <select
        class="w-full mt-4 text-lg mx-auto px-2 py-1 rounded-lg outline-none border-2 border-gray-300 hover:bg-none"
        v-model="goalRep"
        name="frequency"
      >
        <option value="daily" selected>Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <InputBar
        in_type="number"
        class="w-full"
        v-model="goalPoints"
        in_step="10"
        in_min="10"
        in_max="1000"
        in_placeholder="Points"
      />
      <InputBar
        in_type="number"
        class="w-full"
        v-model="goalCurrentValue"
        in_step="1"
        in_min="0"
        in_placeholder="Minimum value"
      />
      <InputBar
        in_type="number"
        class="w-full"
        v-model="goalMaxValue"
        in_step="1"
        in_min="0"
        in_placeholder="Maximum value"
      />
      <DefaultButton in_text="Add" in_type="submit"/>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goals: [],
      goalName: "",
      goalRep: "daily",
      goalPoints: 10,
      goalCurrentValue: 0,
      goalMaxValue: 100,
    };
  },
  methods: {
    async addGoal() {
      let res = await fetch(`http://localhost:3080/goals/user/${this.$store.state.session.user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({goal: {
          goal_name: this.goalName,
          goal_rep: this.goalRep,
          goal_points: this.goalPoints,
          goal_current: this.goalCurrentValue,
          goal_max: this.goalMaxValue,
        }}),
      });
      this.$emit("fetchGoals");
    }
  }
};
</script>

<style>
@media (prefers-color-scheme: dark) {
  input, select, button{
    background-color: #1f2937;
  }
}
</style>
