---

title: vue2.0监听组件生命周期hookEvent

meta:
  - name: description
    content: vue2.0监听组件生命周期hookEvent
  - name: keywords
    content: vue2.0监听组件生命周期hookEvent

created: 2020/03/25

updated: 2020/03/25
 
tags:
  - vue
  - vue2.0

---

## 前言
今天产品经理又给我甩过来一个需求，需要开发一个图表，拿到需求，瞄了一眼，然后我就去`echarts`官网复制示例代码了，复制完改了改差不多了，改完代码长这样

### 内部监听生命周期函数

```js
<template>
  <div class="echarts"></div>
</template>
<script>
export default {
  mounted() {
    this.chart = echarts.init(this.$el)
    // 请求数据，赋值数据 等等一系列操作...
    // 监听窗口发生变化，resize组件
    window.addEventListener('resize', this.$_handleResizeChart)
  },
  updated() {
    // 干了一堆活
  },
  created() {
    // 干了一堆活
  },
  beforeDestroy() {
    // 组件销毁时，销毁监听事件
    window.removeEventListener('resize', this.$_handleResizeChart)
  },
  methods: {
    $_handleResizeChart() {
      this.chart.resize()
    },
    // 其他一堆方法
  }
}
</script>

```
功能写完开开心心的提测了，测试没啥问题，产品经理表示做的很棒。然而监听`resize`事件与销毁`resize`两段代码分开而且相隔几百行代码，可读性比较差。有没有办法写在一起呢？然后查阅治疗有了下面的写法

```js
export default {
  mounted() {
    this.chart = echarts.init(this.$el)
    // 请求数据，赋值数据 等等一系列操作...
    
    // 监听窗口发生变化，resize组件
    window.addEventListener('resize', this.$_handleResizeChart)
    // 通过hook监听组件销毁钩子函数，并取消监听事件
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.$_handleResizeChart)
    })
  },
  updated() {},
  created() {},
  methods: {
    $_handleResizeChart() {
      // this.chart.resize()
    }
  }
}
```

原来Vue还可以这样监听生命周期函数。

在Vue组件中，可以用过$on,$once去监听所有的生命周期钩子函数，如监听组件的updated钩子函数可以写成 this.$on('hook:updated', () => {})

### 外部监听生命周期函数

今天同事问我，想在外部监听组件的生命周期函数，有没有办法啊？

我问为什么有这么奇怪的需求呢，原来同事用了一个第三方组件，需要监听第三方组件数据的变化，但是组件又没有提供`change`事件，同事也没办法了，才想出来要去在外部监听组件的`updated`钩子函数。查看了一番资料，发现Vue支持在外部监听组件的生命周期钩子函数。然后就有了以下代码

```js

<template>
  <!--通过@hook:updated监听组件的updated生命钩子函数-->
  <!--组件的所有生命周期钩子都可以通过@hook:钩子函数名 来监听触发-->
  <custom-select @hook:updated="$_handleSelectUpdated" />
</template>
<script>
import CustomSelect from '../components/custom-select'
export default {
  components: {
    CustomSelect
  },
  methods: {
    $_handleSelectUpdated() {
      console.log('custom-select组件的updated钩子函数被触发')
    }
  }
}
</script>

```

## 后记
**这些虽然像是`hack`操作，但是实际开发场景中可能就会运用到。希望同学们知道这些骚操作，当遇到实际场景时能想到还能这样写。**
