<template>
  <div
    class="w-1/2 mx-auto bg-gray-200 border-2 border-gray-300 rounded-lg p-2 my-10 hover:bg-gray-300 duration-150 flex justify-between items-center"
    :class="isOpen ? 'w-2/3' : 'w-1/2'"
  >
    <div
      :class="[object.isDone ? 'line-through' : '']"
      @click="checkTodo"
      class="w-11/12"
    >
      <h1 class="text-xl">{{ object.name }}</h1>
      <p class="text-lg">{{ object.rep }}</p>
    </div>
    <div
      class="py-3 rounded-full hover:bg-gray-400 duration-150"
      @click="deleteTodo"
    >
      <img src="../assets/close.svg" width="50%" class="mx-auto" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["object", "isOpen"],
  methods: {
    checkTodo() {
      this.$emit("done", this.object.id);
    },
    deleteTodo() {
      this.$emit("delete", this.object.id);
    },
  },
};
</script>
