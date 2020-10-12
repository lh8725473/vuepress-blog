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




https://juejin.im/post/6844903652960763911