<template>
<v-app style="height: 100%; background-color: #1867C0">
  <v-card class="mx-auto ma-8" width="350">

    <template v-slot:title> Register </template>
    <v-btn color="info" class="ml-4" @click="$router.back()"> Back </v-btn>
    <v-card-text class="text-center">

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

        <v-btn color="info" class="mr-4" @click="validate"> Register </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</v-app>
</template>


<script>
import { userService } from '../services/user';
import { createToast } from 'mosha-vue-toastify';

export default {
  data: () => ({
    valid: true,
    username: "",
    usernameRules: [
      (v) => !!v || "Username is required",
      (v) => (v && v.length >= 3) || "Username must be more than 2 character",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 3) || "Password must be more than 2 character",
    ],
  }),
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();
      if(valid){
        const data = {
            "username": this.username,
            "password": this.password
        }
        userService.create(data)
        .then((response) => {
            this.$router.push('/login');
        }).catch(() => {
            createToast("User creation failure ", {type: 'danger'})
        })
      }
    }
  },
};
</script>