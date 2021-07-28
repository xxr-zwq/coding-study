import Vue from "vue";
import Notice from "@/components/Notice";

function create(Component, props) {
    // 组件构造函数如何获取
    // 1.Vue.extend()
    // 2.render函数
    const vm = new Vue({
        render: h => h(Component,{props})
    }).$mount(); // 不指定宿主元素，则会创建真实dom，但是不会追加操作

    document.body.appendChild(vm.$el); // 获取真实dom

    const comp = vm.$children[0];

    comp.remove = () => {
        document.body.removeChild(vm.$el);
        vm.$destroy();
    };

    // const Ctor = Vue.extend(Component);
    // const comp = new Ctor({propsData: props});
    // comp.$mount();
    // document.body.appendChild(Ctor.$el);
    // comp.remove = () => {
    //     document.body.removeChild(Ctor.$el);
    //     Ctor.$destroy();
    // }

    return comp;
}

// export default create
export default {
    install(Vue) {
        Vue.prototype.$notice = function(options) {
            return create(Notice, options)
        }
    }
}