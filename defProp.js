const obj = {};

// 对传入obj进行访问拦截
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key,{
        get() {
                console.log("get" + key);
                return val;
            },
            set(newVal) {
                if (newVal !== val) {
                    console.log("set" + newVal);
                    newVal = val;
                }
            }
    })
}

defineReactive(obj, "foo", "foo");
obj.foo;
obj.foo = "fospaslfoi";