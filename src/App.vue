<template>
  <v-app>
    <MenuBar></MenuBar>
    <v-main>
      <router-view />
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
