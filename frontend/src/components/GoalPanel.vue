<template>
  <div
    class="flex flex-col w-1/2 mx-auto bg-gray-200 border-2 border-gray-300 rounded-lg p-2 my-10 hover:bg-gray-300 duration-150"
  >
    <div class="flex justify-between items-center">
      <div class="w-11/12" @click="editMode = !editMode">
        <h1 class="text-xl">{{ object.goal_name }}</h1>
        <div class="flex justify-between gap-2">
          <p class="text-lg">{{ object.goal_rep }}</p>
          <div class="flex gap-2 items-center">
            <p>0</p>
            <progress
              :value="object.goal_current"
              :max="object.goal_max"
              class="[&::-webkit-progress-bar]:bg-gray-400"
            ></progress>
            <p>{{ object.goal_max }}</p>
          </div>
        </div>
      </div>
      <div
        class="py-3 rounded-full hover:bg-gray-400 duration-150"
        @click="deleteGoal"
      >
        <img src="../assets/close.svg" width="50%" class="mx-auto" />
      </div>
    </div>
    <div v-if="editMode" class="flex flex-col">
      <hr class="border-black mt-3 mb-2" />
      <div class="flex justify-between">
        <h1>EDIT PROGRESS</h1>
        <div class="flex flex-col">
          <div class="flex items-center gap-2 justify-end">
            <p>Progress value:</p>
            <input
              type="number"
              v-model="object.goal_current"
              class="border-2 border-gray-300 rounded-lg p-1"
              step="1"
            />
          </div>
          <div class="flex gap-2 items-center justify-end">
            <p>Progress goal:</p>
            <input
              type="number"
              v-model="object.goal_max"
              class="border-2 border-gray-300 rounded-lg p-1"
              step="1"
            />
          </div>
        </div>
      </div>
      <DefaultButton
        in_text="Confirm"
        class="my-2 w-1/4 self-end"
        @click="updateGoal"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["object"],
  data() {
    return {
      editMode: false,
    };
  },
  methods: {
    async updateGoal() {
      const res = await fetch(
        `http://localhost:3080/goals/${this.object.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ goal: this.object }),
        }
      );
    },
  },
};
</script>

<style scoped>
progress {
  -webkit-appearance: none;
  appearance: none;
}

progress::-webkit-progress-bar {
  border-radius: 50px;
}

progress::-webkit-progress-value {
  background-color: rgb(59 130 246);
  border-radius: 50px;
}
</style>
