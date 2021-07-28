import View from "./krouter-view";
import Link from "./krouter-link";

let Vue;
// 挂载$router

class KVueRouter {
    constructor(options) {
        this.$options = options;
        
        // 需要创建响应式的current属性
        // 利用Vue提供的defineReactive做响应化
        // 这样将来current变化的时候，依赖的组件会重新render

        Vue.util.defineReactive(this, "current", "/");

        // this.app = new Vue({
        //   data() {
        //     return {
        //       current: '/'
        //     }
        //   }
        // })
        // this.current = "/";

        // 监听url变化
        window.addEventListener("hashchange", this.onHashChange.bind(this));
        window.addEventListener("load", this.onHashChange.bind(this));

        // 创建个路由映射表
        this.routeMap = {};
        options.routes.forEach(route => {
            this.routeMap[route.path] = route;
        })
    }
    onHashChange() {
        // console.log(window.location.hash);
        this.current = window.location.hash.slice(1);
    }
}

// install注册组件
/**
 * install(Vue,option){
 *  
 *  1.组件 (添加全局方法或属性)
 * Vue.myGlobalMethod = function () {}
 * 
 * Vue.component('myComponent',{
 *  不能使用template,因为处于运行时，dom还未渲染
 *      render(h) {}
 * })
 *  
 *  2.指令(添加全局资源)
 *  Vue.directive('myDirective', {
 *      bind (el, binding, vnode, oldVnode) {}
 *  })
 * 
 *  3.混入(注入组件)
 *  Vue.mixin({
 *      created: function () {}
 *  })
 * 
 *  4.挂载vue原型(添加实例方法)
 *  Vue.prototype.$myMethod = function (methodOptions) {}
 * }
 */

  
KVueRouter.install = function(_Vue) {
    // 保存构造函数，在KVueRouter里面使用
    Vue = _Vue;

    // 挂载$router
    // 怎么获取根实例中的router选项
    Vue.mixin({
        beforeCreate() {
            // 确保有根实例才执行,this.$router就指向KVueRouter
            if(this.$options.router) {
                Vue.prototype.$router = this.$options.router;
            }
        }
    })

    // 实现两个全局组件router-link和router-view
    // Vue.component("router-link", {
    //     props: {
    //         to: {
    //             type: String,
    //             required: true
    //         }
    //     },
    //     render(h) {
    //         console.log(this.$slots)
    //         // return h("a",{attrs:{herf: "#"+this.to,class:"router-link"}},this.$slots.default) 两种class都可以
    //         return h("a",{attrs:{href: "#"+this.to},class:"router-link"},this.$slots.default)
    //     }
    // })

    // Vue.component("router-view", {
    //     // 获取path对应的component
    //     render(h) {
    //         const { routeMap, current } = this.$router
    //         let component = routeMap[current].component || null;
    //         // console.log(this.$router)
    //         // this.$router.$options.routes.forEach(route => {
    //         //     if(route.path === this.$router.current) {
    //         //         component = route.component
    //         //     }
    //         // })
    //         return h(component)
    //     }
    // })
    Vue.component("router-link", Link);
    Vue.component("router-view", View);
}

export default KVueRouter