<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
      require: true,
    },
    rules: {
      type: Object,
    },
  },
  methods: {
    validate(cb) {
      // 获取所有孩子KFormItem
      const tasks = this.$children
        .filter((item) => item.prop) // 过滤掉无prop的按钮，防止报错
        .map((item) => item.validate());

      // 统一处理所有promise结果
      Promise.all(tasks)
        .then(() => {
          cb(true);
        })
        .catch(() => cb(false));
    },
  },
};
</script>

<style></style>
