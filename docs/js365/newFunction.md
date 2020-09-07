---

title: 手动实现一个简单new关键字方法

meta:
  - name: description
    content: 手动实现一个简单new关键字方法
  - name: keywords
    content: 手动实现一个简单new关键字方法

created: 2020/3/05

updated: 2020/3/05

tags:
  - js365
  - new

---

## 前言

没有对象？new一个呗！如何new一个对象？new关键字实现原理是什么？

### 实现原理

::: tip new关键字做了一下几件事：

创建一个临时空对象

设置新对象的__proto__属性指向构造函数的prototype对象

执行构造函数

返回临时对象

:::

```js
  // new 关键字的
function newF (fun) {
  return function () {
    // 创建一个临时空对象
    let obj = {}
    // 隐式原型指向构造函数原型
    obj.__proto__ = fun.prototype
    // 执行构造函数
    fun.apply(obj, arguments)
    // 返回临时对象
    return obj
  }
}
```

## 前言

这里只是简单实现了一个new关键字，new只是一个语法糖，关于new语法糖讲解，在这篇[文章](https://zhuanlan.zhihu.com/p/23987456)中有更有趣的解释。