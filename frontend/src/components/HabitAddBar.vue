<template>
  <div
    class="w-full h-screen bg-gray-200 border-l-2 border-l-gray-300 p-5 text-center"
  >
    <div class="flex flex-row-reverse mt-2 mb-4"></div>
    <h1 class="text-2xl my-4">Add habits</h1>
    <form @submit.prevent="addHabit">
      <InputBar in_type="text" in_placeholder="Name" v-model="habitName" />
      <select
        class="w-full mt-2 mb-1 text-lg mx-auto px-2 py-1 rounded-lg outline-none border-2 border-gray-300 hover:bg-none"
        v-model="habitRep"
        name="frequency"
      >
        <option value="daily" selected>Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <div
        v-if="habitRep === 'weekly'"
        class="flex justify-center text-lg my-3 flex-wrap gap-2"
      >
        <div
          v-for="day in weekdays"
          :key="day.id"
          class="rounded-full w-1/6 p-1 duration-150"
          :class="
            selectedDays.includes(day.id)
              ? 'bg-blue-400 hover:bg-blue-500'
              : 'bg-gray-300 hover:bg-gray-400'
          "
          @click="selectDay(day)"
        >
          {{ day.name }}
        </div>
      </div>
      <InputBar
        in_type="time"
        class="w-full mt-1"
        v-model="habitTime"
        in_placeholder="Time"
      />
      <InputBar
        in_type="number"
        class="w-full mt-1"
        v-model="habitPoints"
        in_step="10"
        in_min="10"
        in_max="1000"
        in_placeholder="Points"
      />
      <DefaultButton in_text="Add" in_type="submit" />
    </form>
  </div>
</template>

<script>
export default {
  props: ["session"],
  data() {
    return {
      habitName: null,
      habitRep: null,
      habitTime: null,
      habitPoints: 10,
      selectedDays: [],
      weekdays: [
        {
          id: 1,
          name: "M",
        },
        {
          id: 2,
          name: "T",
        },
        {
          id: 3,
          name: "W",
        },
        {
          id: 4,
          name: "T",
        },
        {
          id: 5,
          name: "F",
        },
        {
          id: 6,
          name: "S",
        },
        {
          id: 7,
          name: "S",
        },
      ],
    };
  },
  methods: {
    async addHabit() {
      console.log(this.habitName, this.habitRep, this.habitTime);
      console.log(this.session);
      if (this.habitName && this.habitRep && this.habitTime) {
        if (this.habitRep === "weekly") {
          if (this.selectedDays.length === 0) {
            return alert("Please select at least one day!");
          }
        }
        const sendingData = {
          user_id: this.$store.state.session.user.id,
          habit_name: this.habitName,
          habit_frequency: this.habitRep,
          habit_time: this.habitTime,
          habit_days: this.selectedDays.join(""),
          point_value: this.habitPoints,
        };
        try {
          console.log(sendingData);
          const result = await fetch("http://127.0.0.1:3080/addHabit", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(sendingData),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          if (result.ok) {
            const data = await result.json();
            console.log(data);
            this.$emit("refresh-habits");
            return true;
          } else {
            console.log("valami nem jo gec");
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        return alert("Please fill the spaces to add a habit!");
      }
    },
    selectDay(day) {
      if (this.selectedDays.includes(day.id)) {
        this.selectedDays = this.selectedDays.filter((x) => x != day.id);
      } else {
        this.selectedDays.push(this.weekdays[day.id - 1].id);
      }
    },
  },
};
</script>

<style></style>
