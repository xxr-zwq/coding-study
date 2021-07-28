<template>
  <div>
      <!-- v-bind="$attrs"展开$attrs -->
      <!-- {{$attrs}} -->
      <input :type="type" :value="value" @input="onInut" v-bind="$attrs">
  </div>
</template>

<script>
export default {
    inheritAttrs: false, // 设置为false，避免设置到根元素上
    props: {
        value: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "text"
        },
    },
    methods: {
        onInut(e) {
            this.$emit("input",e.target.value);
            this.$parent.$emit("validate")
        }
    }
}
</script>

<style>

</style>