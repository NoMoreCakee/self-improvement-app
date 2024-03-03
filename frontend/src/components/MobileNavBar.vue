<template>
  <div class="dark:bg-gray-900">
    <div class="flex w-full items-center justify-between p-5">
      <img src="../assets/vue.svg" alt="" />
      <svg
        width="800px"
        height="800px"
        viewBox="0 -1 20 20"
        class="w-6 h-6 cursor-pointer"
        @click="isOpen = !isOpen"
      >
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
          sketch:type="MSPage"
        >
          <g
            id="Icon-Set"
            sketch:type="MSLayerGroup"
            transform="translate(-210.000000, -887.000000)"
            class="fill-black dark:fill-white"
          >
            <path
              d="M229,895 L211,895 C210.448,895 210,895.448 210,896 C210,896.553 210.448,897 211,897 L229,897 C229.552,897 230,896.553 230,896 C230,895.448 229.552,895 229,895 L229,895 Z M229,903 L211,903 C210.448,903 210,903.448 210,904 C210,904.553 210.448,905 211,905 L229,905 C229.552,905 230,904.553 230,904 C230,903.448 229.552,903 229,903 L229,903 Z M211,889 L229,889 C229.552,889 230,888.553 230,888 C230,887.448 229.552,887 229,887 L211,887 C210.448,887 210,887.448 210,888 C210,888.553 210.448,889 211,889 L211,889 Z"
              id="hamburger"
              sketch:type="MSShapeGroup"
            ></path>
          </g>
        </g>
      </svg>
    </div>
    <div v-if="isOpen" class="flex flex-col">
      <router-link
        v-for="link in links"
        :key="link.name"
        :to="link.path"
        class="text-center p-2 bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700 hover:bg-gray-300 duration-150 text-lg"
      >
        {{ link.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['links'],
  data() {
    return {
      isOpen: false,
    }
  },
}
</script>

<style></style>
