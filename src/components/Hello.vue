<template>
  <div>
    <!-- 属性 -->
    <h3>{{ msg }}</h3>
    <!-- 新增特性 -->
    <p>
      <input type="text" @keydown.enter="addFeature" />
    </p>
    <!-- ts特性列表 -->
    <ul>
      <li v-for="(feature, index) in features" :key="index">
        {{ feature.name }}
      </li>
    </ul>
    <div>特性总数{{ count }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Feature } from "@/types/index";
import { getFeatures } from "@/api/featrue";
@Component
export default class Hello extends Vue {
  // 属性就是data
  // features: string[] = []
  features: Feature[] = [];

  // 括号中的配置是给vue的
  // 变量附近的配置是给ts的(例：msg)
  //   !断言，证明msg一定赋值
  @Prop({ type: String, required: true })
  msg!: string;

  // 函数直接作为回调
  addFeature(e: KeyboardEvent) {
    // target类型EventTarget
    const inp = e.target as HTMLInputElement;
    this.features.push({ id: this.features.length + 1, name: inp.value });
    inp.value = "";
  }
  // 如果和生命周期的钩子同名，就是声明周期
  created() {
    // this.features = ["类型推论","类型注解"];
    getFeatures().then((res) => {
      this.features = res.data;
    });
    // this.$axios.get<Feature[]>("/api/list")
    // this.features = [{id: 1,name:"类型推论"}];
  }
  // 存取器用于计算属性
  get count() {
    return this.features.length;
  }
}
</script>

<style scoped></style>
