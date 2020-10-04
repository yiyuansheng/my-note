// 观察者
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb
        this.oldVal = this.getOldVal()
    }
    getOldVal() {
        // 把this挂载到Dep.target上；
        Dep.target = this
        const oldVal = compileUtil.getVal(this.expr, this.vm)
        Dep.target = null
        return oldVal
    }
    update() {
        const newVal = compileUtil.getVal(this.expr, this.vm)
        if(newVal !== this.oldVal) {
            this.cb(newVal)
        }
    }
}
// 收集观察者、添加订阅者和通知变化
class Dep {
    constructor() {
        this.subs = []
    }
    // 收集观察者
    addSub(watcher) {
        this.subs.push(watcher)
    }
    // 通知观察者
    notify() {
        console.log('通知了观察者', this.subs);
        this.subs.forEach(w => w.update())
    }
}

class Observer {
    constructor(data) {
        this.observer(data)
    }
    observer(data) {
        /*
            data: {
                person: {
                    name: '张三'
                }，
                fav: {
                    a: '爱好'
                }
            }
        */
        if(data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key])
            })
        }
    }
    defineReactive(obj, key ,value) {
        // 递归遍历
        this.observer(value)
        const dep = new Dep();
        // 劫持监听所有的属性
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            get() {
                // 订阅数据变化时，往dep中添加观察者，即收集依赖
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set: (newVal) => {
                this.observer(newVal)
                if(newVal !== value) {
                    value = newVal
                }
                // 告诉Dep通知变化
                dep.notify()
            }
        })
    }
}