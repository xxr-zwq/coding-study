<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <Form></Form> -->
    <p @click="$store.commit('add')">counter:{{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">asyc couter: {{$store.state.counter}}</p>
    <!-- <p>doubleCounter: {{$store.getters.doubleCounter}}</p> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import Form from "@/components/Form"

export default {
  name: 'Home',
  components: {
    // Form
  },
  // mounted() {
  //   this.$store.state = {}
  // }
}
</script>
