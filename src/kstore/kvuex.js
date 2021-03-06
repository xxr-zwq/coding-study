// 保存构造函数引用，避免import
let Vue;
class Store {
    constructor(options) {
        // this.$options = options;
        // this.state = new Vue({
        //     data: options.state
        // })
        this._vm = new Vue({
            data: {
                // 加两个$符，vue不做代理
                $$state: options.state
            }
        })

        this._mutations = options.mutations;
        this._actions = options.actions;

        // 绑定commit、dispatch的上下文为store实例
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    // 存储器
    get state() {
        console.log(this._vm)
        return this._vm._data.$$state;
    }

    set state(v) {
        console.error("你违规操作了")
    }

    // type: mutation的类型
    // payload: 载荷，是参数
    commit(type, payload) {
        const entry = this._mutations[type];
        if(entry) {
            entry(this.state,payload)
        }
    }

    dispatch(type, payload) {
        const entry = this._actions[type];
        if(entry) {
            entry(this,payload)
        }
    }
}

function install(_Vue) {
    Vue = _Vue;

    Vue.mixin({
        beforeCreate() {
            if(this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
    
}
export default {
    Store,
    install
}