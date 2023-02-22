<template>
  <div v-if="users">
      <div v-for="user in users" :key="user.id">
          <CardUser title="User" :subtitle="user.username" :text="user.is_superuser"/>
      </div>
  </div>
</template>


<script>
import { userService } from '../services/user';
import CardUser from '../components/CardUser.vue'


export default {
  components: {
    CardUser
  },
  data() {
    return {
      users: [],
    }
  },
  methods: {
    async getUsers() {
      userService.getAll()
      .then((response) => {
          this.users = response.data
      })
    }
  },
  mounted () {
    this.getUsers()
  }
};
</script>