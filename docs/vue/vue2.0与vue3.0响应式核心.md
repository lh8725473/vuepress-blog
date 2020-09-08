---

title: vue2.0与vue3.0响应式核心

meta:
  - name: description
    content: vue2.0与vue3.0响应式核心
  - name: keywords
    content: vue2.0与vue3.0响应式核心

created: 2020/03/10

updated: 2020/03/10
 
tags:
  - vue
  - vue2.0
  - vue3.0

---

## 前言
我们都知道`vue2.0`中是通过`Object.defineProperty`来监听的属性 get,set方法来实现双向绑定的。`vue3.0`为什么换成`Proxy`,`Proxy`有什么强大之处，我们一起来看看。

### vue2.0的Object.defineProperty
首先我们用Object.defineProperty简单实现vue2.0中的响应式原理。


```js
/**
 * 请实现这个函数，使下面的代码逻辑正常运行
 * @param {*} obj 对象
 * @param {*} callback 回调函数
 */
function observe(obj, callback) {
  const newObj = {}
  Object.keys(obj).forEach(key => {
    Object.defineProperty(newObj, key, {
      configurable: true,
      enumerable: true,
      get() {
        return obj[key]
      },
      // 当属性的值被修改时，会调用set，这时候就可以在set里面调用回调函数
      set(newVal) {
        obj[key] = newVal
        callback(key, newVal)
      }
    })
  })
  return newObj
}

const obj = observe(
  {
    name: '子君',
    sex: '男'
  },
  (key, value) => {
    console.log(`属性[${key}]的值被修改为[${value}]`)
  }
)

// 这段代码执行后，输出 属性[name]的值被修改为[妹纸]
obj.name = '妹纸'

// 这段代码执行后，输出 属性[sex]的值被修改为[女]
obj.name = '女'


```

### 存在问题
在`Vue2.0`中，数据双向绑定就是通过`Object.defineProperty`去监听对象的每一个属性，然后在`get,set`方法中通过发布订阅者模式来实现的数据响应，但是存在一定的缺陷，比如只能监听已存在的属性，对于新增删除属性就无能为力了，同时无法监听数组的变化，所以在`Vue3.0`中将其换成了功能更强大的`Proxy`。


### vue3.0的Proxy
通过Proxy对上面栗子进行重写：

```
function observe(obj, callback) {
  return new Proxy(obj, {
    get(target, key) {
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      callback(key, value)
    }
  })
}

const obj = observe(
  {
    name: '子君',
    sex: '男'
  },
  (key, value) => {
    console.log(`属性[${key}]的值被修改为[${value}]`)
  }
)

// 这段代码执行后，输出 属性[name]的值被修改为[妹纸]
obj.name = '妹纸'

// 这段代码执行后，输出 属性[sex]的值被修改为[女]
obj.name = '女'

```

通过上面两种不同实现方式，我们可以大概的了解到`Object.defineProperty`和`Proxy`的用法，但是当给对象添加新的属性的时候，区别就出来了，比如

```js
// 添加字段
obj.age = 21
```

使用`Object.defineProperty`无法监听到新增属性，但是使用`Proxy`是可以监听到的。对比上面两段代码可以发现有以下几点不同:

::: tip

- `Object.defineProperty`监听的是对象的每一个属性，而`Proxy`监听的是对象自身
- 使用`Object.defineProperty`需要遍历对象的每一个属性，对于性能会有一定的影响
- `Proxy`对新增的属性也能监听到，但`Object.defineProperty`无法监听到。；

:::

### 总结
这里我们完成了响应式原理的vue2.0和vue3.0的简单实现。当你理解了内部实现后,对`Object.defineProperty`的使用方式与限制之后，就会恍然大悟，原来如此。同样理解`Proxy`对后续学习`vue3.0`也有很大的帮助。