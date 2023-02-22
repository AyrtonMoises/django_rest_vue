<template>
  <v-app-bar flat color="blue-lighten-1">
      <v-app-bar-title>
      <v-icon icon="mdi-waves" />
        <router-link to="/">Blue Project</router-link>
      </v-app-bar-title>
    <v-btn v-if="isAdminUser" to="/list-users">List Users</v-btn>
    <v-btn @click="toggleTheme">toggle theme</v-btn>
    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { useAppStore } from "@/store/app";
import { useTheme } from "vuetify";

export default {
  setup() {
    const theme = useTheme();
    const appStore = useAppStore();
    const { logout, isAdminUser } = appStore;
    return {
      logout,
      theme,
      isAdminUser,
      toggleTheme: () =>
        (theme.global.name.value = theme.global.current.value.dark
          ? "light"
          : "dark"),
    };
  },
  methods: {
    async logout() {
      this.logout();
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none; 
  color: inherit;
}
</style>