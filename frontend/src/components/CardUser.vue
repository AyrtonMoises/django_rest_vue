<template>
  <div class="d-flex align-center flex-column mt-5">
    <v-card
      width="400"
      :title="title"
      :subtitle="subtitle"
      :text="'is superuser ? ' + text.toString()"
    ></v-card>
  </div>
</template>

<script>
export default {
  props: ["title","subtitle","text"]
}
</script>
