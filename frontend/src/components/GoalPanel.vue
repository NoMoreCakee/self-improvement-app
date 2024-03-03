<template>
  <div
    class="flex flex-col w-1/2 mx-auto bg-gray-200 border-2 border-gray-300 rounded-lg p-2 my-10 hover:bg-gray-300 duration-150 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:border-gray-600"
  >
    <div class="flex justify-between items-center">
      <div class="w-full mx-3" @click="editMode = !editMode">
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
    </div>
    <div v-if="editMode" class="flex flex-col w-full">
      <hr class="border-black dark:border-gray-700 border-2 mt-3 mb-2" />
      <div class="flex flex-col justify-between">
        <h1 class="text-center text-xl mb-5">EDIT PROGRESS</h1>
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
      <div class="flex w-full justify-between mt-10">
        <DefaultButton
          in_text="Delete"
          class="my-2 w-1/4"
          @click="deleteGoal"
        />

        <DefaultButton
          in_text="Confirm"
          class="my-2 w-1/4"
          @click="updateGoal"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['object'],
  data() {
    return {
      editMode: false,
    }
  },
  methods: {
    async updateGoal() {
      console.log(this.object)
      const res = await fetch(
        `http://localhost:3080/goals/${this.object.goal_id}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ goal: this.object }),
        },
      )
      this.editMode = false
    },
    async deleteGoal() {
      const res = await fetch(
        `http://localhost:3080/goals/${this.object.goal_id}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      this.$emit('fetchGoals')
    },
  },
}
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
