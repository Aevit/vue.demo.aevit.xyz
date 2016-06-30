<template>
  <p>{{ message }}</p>
  <input v-model="message">
</template>

<style>
</style>

<script>

export default {
    el() {
        return '#app'
    },
    data() {
        return {
            message: 'Hello Vue.js!'
        }
    }
}
</script>
