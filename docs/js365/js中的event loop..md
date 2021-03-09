---

title: JavaScript中的Event Loop

meta:
  - name: description
    content: Event Loop
  - name: keywords
    content: Event Loop

created: 2020/07/15

updated: 2020/07/15

tags:
  - js365

---
### 前言
我们都知道JavaScript是单线程的，也就是说同一时间只能干一件事。这是因为JavaScript主要是用来操作`DOM`的，如果变成多线程，浏览器就懵逼了，不知道该听谁的了。但是虽然js是单线程，但是完全可以模拟多线程，靠的就是`Event Loop`。

我们都知道js中的代码分 `同步` 和 `异步`，所谓的 `异步` 其实就是不会阻塞我们的主线程，等待主线程的代码执行完毕才会执行。`callback setTimeout setInterval Promise ...` 这些都是都是我们耳熟能详的 `异步` 代码


![eventloop1](./images/eventloop1) 

js中的内存分为 堆内存(heap) 和 栈内存(stack), 堆内存 中存的是我们声明的object类型的数据，栈内存 中存的是 基本数据类型 以及 函数执行时的运行空间。我们的 同步 代码就放在 执行栈 中，那异步代码呢？浏览器会将 dom事件 ajax setTimeout等异步代码放到队列中，等待执行栈中的代码都执行完毕，才会执行队列中的代码，是不是有点像发布订阅模式。

```js
console.log(1);
setTimeout(() => {
    console.log(2);    
}, 0);
console.log(3);
```

根据之前说的，setTimeout 会被放到队列中，等待执行栈中的代码执行完毕才会执行，所以会输出1, 3, 2

但是异步代码也是有区别的：

```js
console.log(1)

setTimeout(() => {
    console.log(2)
}, 0)

Promise.resolve().then(() => {
    console.log(3)
})
```

输出的永远是1, 3, 2, 也就是说 promise 在 setTimeout 之前执行了。这是因为 异步任务 分为 微任务(microtask) 和 宏任务(task)，执行的顺序是 执行栈中的代码 => 微任务 => 宏任务。

### 执行栈
- 执行栈中的代码永远最先执行

### 微任务(microtask): promise MutationObserver...
- 当执行栈中的代码执行完毕，会在执行宏任务队列之前先看看微任务队列中有没有任务，如果有会先将微任务队列中的任务清空才会去执行宏任务队列

### 宏任务(task): setTimeout setInterval setImmediate(IE专用) messageChannel...
- 等待执行栈和微任务队列都执行完毕才会执行，并且在执行完每一个宏任务之后，会去看看微任务队列有没有新添加的任务，如果有，会先将微任务队列中的任务清空，才会继续执行下一个宏任务

```js
console.log(1)

setTimeout(()=> {
  console.log(2)
}, 0)

new Promise((resolve, reject)=> {
  console.log(3)
  resolve(4)
}).then((res) => {
  console.log(res)
})

console.log(5)
// 1,3,5,4,2
```