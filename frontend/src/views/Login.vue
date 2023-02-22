<template>
<v-app style="height: 100%; background-color: #1867C0">
  <div class="text-center">
    <v-card class="mx-auto mt-15" width="350">
      <v-toolbar>
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-card-text>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Username"
          required
          autocomplete="off"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
          required
          autocomplete="off"
        ></v-text-field>

        <v-btn color="info" class="mr-2" @click="loginWithUsername"> Login </v-btn>
        <v-btn color="info" class="mr-2" to="/register"> Register </v-btn>

        <v-card-subtitle class="my-3"> Sign In or Sign Up </v-card-subtitle>
        <v-btn color="info" prepend-icon="mdi-google" @click="loginWithGoogle">Google</v-btn>

      </v-form>

      </v-card-text>
    </v-card>
  </div>
</v-app>
</template>

<script>
import { useAppStore } from "@/store/app";


export default {
  name: "Login",
  setup() {
    const appStore = useAppStore();
    const { loginGoogle, loginUsername } = appStore;
    return {
      loginGoogle, loginUsername
    };
  },
  data: () => ({
    valid: true,
    username: "",
    usernameRules: [
      (v) => !!v || "Username is required",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
    ],
  }),
  methods: {
    async loginWithUsername() {
      const { valid } = await this.$refs.form.validate();
      if(valid){
        const data = {
            "username": this.username,
            "password": this.password
        }
        this.loginUsername(data)
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    async loginWithGoogle() {
      this.loginGoogle();
    },
  },
};
</script>

