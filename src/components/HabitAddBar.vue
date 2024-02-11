<template>
  <div
    class="w-1/6 h-screen bg-gray-200 border-l-2 border-l-gray-300 p-5 text-center"
  >
    <div class="flex flex-row-reverse mt-2 mb-4">
      <div
        class="rounded-full hover:bg-gray-300 flex flex-row-reverse w-1/6 p-2 duration-150 cursor-pointer"
        @click="$emit('closed')"
      >
        <img src="../assets/hamburger.svg" />
      </div>
    </div>
    <h1 class="text-2xl my-4">Add habits</h1>
    <form @submit.prevent="addHabit(currentId, habitName, habitRep)">
      <InputBar
        in_type="text"
        in_placeholder="e.g. cleaning the house"
        v-model="habitName"
      />
      <select
        class="w-full mt-2 text-lg mx-auto px-2 py-1 rounded-lg outline-none border-2 border-gray-300 hover:bg-none"
        v-model="habitRep"
        name="frequency"
      >
        <option value="daily" selected>Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <DefaultButton in_text="Add" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true,
      currentId: 1,
      habitName: null,
      habitRep: null,
      isDone: false,
    };
  },
  methods: {
    addHabit(id, name, rep) {
      if (this.habitName && this.habitRep) {
        this.$emit("added", id, name, rep, this.isDone);
        this.currentId++;
        this.habitName = null;
        this.habitRep = null;
      } else {
        alert("Please give a valid name and frequency!");
      }
    },
  },
};
</script>

<style></style>
