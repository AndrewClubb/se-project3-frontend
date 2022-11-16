<template>
  <v-app>
    <MenuBar></MenuBar>
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script>
import MenuBar from "@/components/MenuBar.vue";
export default {
  name: "app",
  components: {
    MenuBar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
