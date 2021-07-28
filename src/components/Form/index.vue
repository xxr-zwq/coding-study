<template>
  <div>
    <KForm :model="userInfo" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="userInfo.username" placeholder="请输入用户名"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput
          type="password"
          v-model="userInfo.password"
          placeholder="请输入密码"
        ></KInput>
      </KFormItem>
      <KFormItem>
        <button @click="login">登录</button>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import KInput from "@/components/Form/KInput.vue";
import KForm from "@/components/Form/KForm.vue";
import KFormItem from "@/components/Form/KFormItem.vue";
// import Notice from "@/components/Notice";
export default {
  components: {
    KInput,
    KForm,
    KFormItem,
  },
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate((valid) => {
          // const notice = this.$create(Notice, {
          //   title: "社会你杨哥喊你来搬砖",
          //   message: valid ? "请求登录!" : "校验失败!",
          //   duration: 1000,
          // });
          const notice = this.$notice({
            title: "社会你杨哥喊你来搬砖",
            message: valid ? "请求登录!" : "校验失败!",
            duration: 1000,
          });
          notice.show();
        // if(valid) {
        //   alert("submit")
        // } else {
        //   console.log("error");
        //   return false;
        // }
      });
    },
  },
};
</script>

<style></style>
