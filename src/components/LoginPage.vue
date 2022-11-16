<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Welcome! Login to see your calendar.</v-toolbar-title>
    </v-toolbar>
    <br /><br />
    <SocialLogin />
    <br /><br />
  </v-container>
</template>

<script>
import SocialLogin from "@/components/SocialLogin";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  components: {
    SocialLogin,
  },
};
</script>
