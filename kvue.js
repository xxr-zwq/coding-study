// 对传入obj进行访问拦截
function defineReactive(obj, key, val) {
    // 需对val递归，解决val中嵌套obj的情况
    observe(val);

    // 创建一个Dep和当前key一一对应
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        get() {
            console.log("get:" + key);
            // 依赖收集在这里
            Dep.target && dep.addDep(Dep.target);
            return val;
        },
        set(newVal) {
            // 如果传入的newVal是obj，还需要做相应化处理
            if (newVal !== val) {
                console.log("set:" + newVal);
                observe(newVal);
                val = newVal;
                // 通知更新
                dep.notify();
            }
        }
    })
}

function observe(obj) {
    if (typeof obj != "object" || obj == null) {
        // 必须传入对象
        return;
    }

    new Observer(obj)

}

function Proxy(vm, soureKey) {
    // vm[soureKey]实质就是vm[$data]
    Object.keys(vm[soureKey]).forEach(key => {
        // 将$data中的key代理到vm属性中
        Object.defineProperty(vm, key, {
            get() {
                return vm[soureKey][key];
            },
            set(newVal) {
                vm[soureKey][key] = newVal;
            }
        })
    })
}

class KVue {
    constructor(options) {
        // 保存选项
        this.$options = options;
        this.$data = options.data;
        // 响应化处理
        observe(options.data);
        // 代理数据，方便用户直接访问$data里面的值
        Proxy(this, "$data");
        // 创建编译器
        new Compiler(options.el,this)
    }
}


// 根据对象类型如何做响应化
class Observer {
    constructor(value) {
        // 临时保存value 便于使用
        this.value == value;
        if(typeof value === "object") {
            this.walk(value);
        }
    }

    // 对象数据响应化
    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    }
    // 数组数据响应化
}

// 观察者:保存更新函数，值发生变化调用更新函数
class Watcher {
    constructor(vm,key,updateFn) {
        this.vm = vm;
        this.key = key;
        this.updateFn = updateFn;
        // Dep.target静态属性上设置为当前watcher实例
        Dep.target = this;
        this.vm[this.key] // 读取触发了getter
        Dep.target = null; // 收集完就置空
    }

    update() {
        this.updateFn.call(this.vm,this.vm[this.key]);
    }
}

// Dep：依赖，管理某个key相关所有Watcher实例
class Dep {
    constructor() {
        this.deps = [];
    }
    addDep(dep) {
        this.deps.push(dep);
    }
    notify() {
        this.deps.forEach(dep => dep.update());
    }
}