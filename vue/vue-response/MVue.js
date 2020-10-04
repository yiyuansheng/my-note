const compileUtil = {
    // 获取$data的值
    getVal(expr, vm) {
        // [person, name]
        return expr.split('.').reduce((data, currentVal) => {
            return data[currentVal]
        }, vm.$data)
    },
    setVal(expr, vm ,inputVal) {
        expr.split('.').reduce((data, currentVal) => {
            data[currentVal] = inputVal
        }, vm.$data)
    },
    getContentVal(expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1], vm)
        })
    },
    text(node, expr, vm) { // expr: msg
        let value;
        if(expr.indexOf('{{') !== -1) {
            // {{person.name}} -- {{person.age}}
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                // 绑定观察者，将来数据发生变化，出发这里的回调，进行更新
                new Watcher(vm, args[1], () => {
                    this.updater.textUpdater(node, this.getContentVal(expr, vm));
                })
                return this.getVal(args[1], vm)
            })
            
        }
        else {
            value = this.getVal(expr, vm)
        }
        this.updater.textUpdater(node, value)
    },
    html(node, expr, vm) {
        const value = this.getVal(expr, vm)
        new Watcher(vm, expr, (newVal) => {
            this.updater.htmlUpdater(node, newVal);
        })
        this.updater.htmlUpdater(node, value)
    },
    model(node,expr,vm) {
        const value = this.getVal(expr, vm)
        // 绑定更新函数 数据 =》 视图
        new Watcher(vm, expr, (newVal) => {
            this.updater.modelUpdate(node, newVal);
        })
        // 视图 =》 数据 =》 视图
        node.addEventListener('input', e => {
            // 设置值
            this.setVal(expr, vm, e.target.value)
        })
        this.updater.modelUpdate(node, value)
    },
    on(node, expr,vm, eventName){
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName, fn.bind(vm))
    },
    bind(node, expr, vm, attrName) {

    },
    // 跟新视图的函数
    updater: {
        textUpdater(node, value) {
            node.textContent = value;
        },
        htmlUpdater(node, value) {
            node.innerHTML = value
        },
        modelUpdate(node, value) {
            node.value = value
        }
    },

}


// 指令解析器
class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el); 
        this.vm = vm;
        // 1、获取文档碎片对象 放入内存中会减少页面的回流和重绘
        const fragment = this.node2Fragment(this.el);
        // 2、编译模板
        this.compile(fragment)
        // 3、追加子元素到根元素
        this.el.appendChild(fragment)

    }
    /*
        <h3>{{person.fav}}</h3>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
        <h3>{{msg}}</h3>
        <h2>{{person.name}} -- {{person.age}}</h2><div v-text="msg"></div>
        <div v-html="htmlstr"></div>
        <input type="text" v-model="msg">
    */
    compile(fragment) {
        // 1、获取子节点
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(child => {
            if(this.isElementNode(child)){
                // 是元素节点
                // 编译元素节点
                this.compileElement(child)
            }
            else {
                // 文本节点
                // 编译文本节点
                this.compileText(child)
            }
            // 递归遍历子节点
            if(child.childNodes && child.childNodes.length) {
                this.compile(child)
            }
        })

    }
    compileElement(node) {
        // <div v-text='msg'></div>
        const attributes = node.attributes;
        [...attributes].forEach(attr => {
            const {name, value} = attr
            if(this.isDirective(name)) { // 是一个指令 v-text
                const [, dirctive] = name.split('-')
                const [dirName, eventName] = dirctive.split(':'); // text, html, model, on
                // 更新数据 数据驱动视图
                compileUtil[dirName](node, value, this.vm, eventName)
                // 删除有指令标签上的属性
                node.removeAttribute('v-' + dirctive)
            }
            else if(this.isEventName(name)) { // @click='handleClick'
                let [, eventName] = name.split('@');
                compileUtil[dirName](node, value, this.vm, eventName)
            }
        })

    }

    compileText(node) {
        // 解析{{}}
        const content = node.textContent
        if(/\{\{(.+?)}\}/.test(content)) {
            compileUtil['text'](node, content, this.vm)
        }
    }
    
    isDirective(attrName) {
        // 检查是否包含v-开头的字符
        return attrName.startsWith('v-')
    }
    isEventName(attrName) {
        // 检查是否是@开头
        return attrName.startsWith('@')
    }

    node2Fragment(el) {
        // 创建文档碎片
        const f = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild) {
            f.appendChild(firstChild)
        }
        return f
    }
    // 是否是元素节点
    isElementNode(node) {
        return node.nodeType === 1;
    }
}

class MVue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options
        if(this.$el) {
            // 1、实现一个数据的观察者
            new Observer(this.$data)
            // 2、实现一个指令解析器
            new Compile(this.$el, this)
            // 代理this.$data 
            this.proxyData(this.$data)
        }
    }
    proxyData(data) {
        for(const key in data) {
            Object.defineProperty(this, key, {
                get () {
                    return data[key]
                },
                set(newVal) {
                    data[key] = newVal
                }
            })
        }
    }
}