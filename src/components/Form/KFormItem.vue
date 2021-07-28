<template>
  <div>
      <label v-if="label">{{label}}</label>
      <slot></slot>
      <div v-if="error">{{error}}</div>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
    inject: ["form"],
    data() {
        return {
            error: "",
        }
    },
    props: {
        label: {
            type: String,
            default: "",
        },
        prop: {
            type: String
        }
    },
    mounted() {
        this.$on("validate",() => {
            this.validate();
        })
    },
    methods: {
        validate() {
            const rules = this.form.rules[this.prop];
            const value = this.form.model[this.prop];
            const descriptor = {
                [this.prop]: rules
            }
            const schema = new Schema(descriptor);
            return schema.validate({[this.prop]: value},(errors) => {
                if(errors) {
                    this.error = errors[0].message;
                } else {
                    this.error = "";
                }
            })
        }
    }
}
</script>

<style>

</style>