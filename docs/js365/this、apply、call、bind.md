---

title: this、apply、call、bind

meta:
  - name: description
    content: this、apply、call、bind
  - name: keywords
    content: this、apply、call、bind

created: 2020/05/10

updated: 2020/05/10
 
tags:
  - js365

---

## this、apply、call、bind
老生常谈的问题，也是 ES5中众多坑中的一个，在 ES6 中可能会极大避免 this 产生的错误，但是为了一些老代码的维护，最好还是了解一下 this 的指向和 call、apply、bind 三者的区别。

### this
在 ES5 中，其实 this 的指向，始终坚持一个原理：**this 永远指向最后调用它的那个对象**。记住这句话，this 你已经了解一半了。

下面一个简单的例子：
```js
    var name = "windowsName";
    function a() {
        var name = "Cherry";

        console.log(this.name);          // windowsName

        console.log("inner:" + this);    // inner: Window
    }
    a();
    console.log("outer:" + this)         // outer: Window
```
这个相信大家都知道为什么 log 的是 `windowsName`，因为根据刚刚的那句话“**this 永远指向最后调用它的那个对象**”，我们看最后调用 a 的地方 `a()`;，前面没有调用的对象那么就是全局对象 window，这就相当于是 `window.a()`；注意，这里我们没有使用严格模式，如果使用严格模式的话，全局对象就是 `undefined`，那么就会报错 `Uncaught TypeError: Cannot read property 'name' of undefined`。

再看下这个例子：
```js
    var name = "windowsName";
    var a = {
        name: "Cherry",
        fn : function () {
            console.log(this.name);      // Cherry
        }
    }
    a.fn();
```
在这个例子中，函数 fn 是对象 a 调用的，所以打印的值就是 a 中的 name 的值。是不是有一点清晰了呢?

我们再再做一个小小的改动：
```js
  var name = "windowsName";
  var a = {
    name: "Cherry",
    fn : function () {
      console.log(this.name);      // Cherry
    }
  }
  window.a.fn();
```

这里打印 Cherry 的原因也是因为刚刚那句话“**this 永远指向最后调用它的那个对象**”，最后调用它的对象仍然是对象 a。

我们再再再做一个小小的改动：
```js
    var name = "windowsName";
    var a = {
      // name: "Cherry",
      fn : function () {
        console.log(this.name);      // undefined
      }
    }
    window.a.fn();
```
这里为什么会打印 `undefined` 呢？这是因为正如刚刚所描述的那样，调用 fn 的是 a 对象，也就是说 fn 的内部的 this 是对象 a，而对象 a 中并没有对 name 进行定义，所以 log 的 `this.name` 的值是 undefined。

这个例子还是说明了：**this 永远指向最后调用它的那个对象**，因为最后调用 fn 的对象是 a，所以就算 a 中没有 name 这个属性，也不会继续向上一个对象寻找 `this.name`，而是直接输出 `undefined`。

再看一个比较坑的例子：
```js
  var name = "windowsName";
  var a = {
    name : null,
    // name: "Cherry",
    fn : function () {
      console.log(this.name);      // windowsName
    }
  }

  var f = a.fn;
  f();
```
这里你可能会有疑问，为什么不是 Cherry，这是因为虽然将 a 对象的 fn 方法赋值给变量 f 了，但是没有调用，再接着跟我念这一句话：“**this 永远指向最后调用它的那个对象**”，由于刚刚的 f 并没有调用，所以 fn() 最后仍然是被 `window` 调用的。所以 `this` 指向的也就是 `window`。

由以上五个例子我们可以看出，this 的指向并不是在创建的时候就可以确定的，在 es5 中，永远是this 永远指向最后调用它的那个对象。

最后来个栗子
```js
  var name = "windowsName";

  function fn() {
    var name = 'Cherry';
    innerFunction();
    function innerFunction() {
        console.log(this.name);      // windowsName
    }
  }

  fn()
```
读到现在各位同学应该能够理解这是为什么了吧！~

