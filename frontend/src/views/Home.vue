<template>
  <div v-if="user">
    <CardUser title="Current User" :subtitle="user.username" :text="user.is_superuser"/>
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
      user: null
    }
  },
  methods: {
    async getUser() {
      userService.getCurrentUser()
      .then((response) => {
          this.user = response.data
      })
    }
  },
  mounted () {
    this.getUser()
  }
};
</script>