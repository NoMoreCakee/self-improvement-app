<template>
  <div class="w-1/4 border-2 border-gray-300 rounded-lg bg-gray-200 my-3 px-3">
    <h1 class="text-2xl font-medium my-3 text-center">Todos</h1>
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="flex justify-between px-14 my-3 w-full bg-white rounded-lg py-3 border-gray-300 border-2 hover:bg-gray-100"
    >
      <div class="text-center" @click="markDone(todo)">
        <h1 class="text-xl">{{ todo.name }}</h1>
        <p class="text-lg">
          <span class="font-medium">Due: </span>{{ todo.due }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoPanel",
  data() {
    return {
      todos: [
        {
          id: 1,
          name: "lorem ipsum dolor sit amasadadet asdfasf",
          due: "date here",
          isDone: false,
        },
        {
          id: 2,
          name: "lorem ipsum dolor sit amasadadet asdfasf",
          due: "date here",
          isDone: false,
        },
      ],
    };
  },
  methods: {
    markDone(todo) {
      todo.isDone = true;
      console.log(this.todos[todo.id]);
      this.todos = this.todos.filter((x) => !x.isDone);
      console.log(this.todos);
    },
  },
};
</script>

<style></style>
