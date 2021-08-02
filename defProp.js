// const obj = {};

// 对传入obj进行访问拦截
function defineReactive(obj, key, val) {
    // 需对val递归，解决val中嵌套obj的情况
    observe(val);
    // console.log(obj, key, val)
    Object.defineProperty(obj, key, {
        get() {
            console.log("get:" + key);
            return val;
        },
        set(newVal) {
            // 如果传入的newVal是obj，还需要做相应化处理
            if (newVal !== val) {
                console.log("set:" + newVal);
                observe(newVal);
                val = newVal;
            }
        }
    })
}

function observe(obj) {
    if (typeof obj != "object" || obj == null) {
        // 必须传入对象
        return;
    }
    if (Array.isArray(obj)) {
        // 如果是数组, 重写原型
        obj.__proto__ = arrayProto
        // 传入的数据可能是多维度的,也需要执行响应式
        for (let i = 0; i < obj.length; i++) {
            observe(obj[i])

        }
    } else {
        Object.keys(obj).forEach((key) => {
            defineReactive(obj, key, obj[key])
        })
    }

}

function set(obj, key, val) {
    defineReactive(obj, key, val);
}

const orginalProto = Array.prototype;
const arrayProto = Object.create(orginalProto); // 先克隆一份Array的原型出来
const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
methodsToPatch.forEach(method => {
    arrayProto[method] = function () {
        // 执行原始操作
        orginalProto[method].apply(this, arguments)
        console.log('监听赋值成功', method)
    }
})

const obj = {
    foo: "foo",
    angel: "angel",
    count: {
        counta: 3
    },
    arr: [1,2,3]
}
observe(obj)
obj.foo = "fasfa"
obj.angel = "hhda"
obj.count = {
    counta: 20
}
obj.count.counta = 10
// obj.dom = "dom" 不行
set(obj, "dom", "dom")
obj.dom
obj.arr.push(4)

// defineReactive(obj, "foo", "foo");
// obj.foo;
// obj.foo = "fospaslfoi";