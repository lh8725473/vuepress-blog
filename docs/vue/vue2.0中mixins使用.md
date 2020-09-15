---

title: vue2.0中mixin使用

meta:
  - name: description
    content: vue2.0中mixins使用
  - name: keywords
    content: vue2.0中mixins使用

created: 2020/04/24

updated: 2020/04/24
 
tags:
  - vue
  - vue2.0

---

### 前言
`mixins`是`Vue`提供的一种混合机制，用来更高效的实现组件内容的复用。怎么去理解混入呢，我觉得和`Object.assign`，但实际与`Object.assign`又有所不同。

### 基本示例
在开发`echarts`图表组件时，需要在窗口尺寸发生变化时，重置图表的大小，此时如果在每个组件里面都去实现一段监听代码，代码重复太多了，此时就可以使用混入来解决这个问题

```js
// 混入代码 resize-mixins.js
import { debounce } from 'lodash'
const resizeChartMethod = '$__resizeChartMethod'

export default {
  data() {
    // 在组件内部将图表init的引用映射到chart属性上
    return {
      chart: null
    }
  },
  created() {
    window.addEventListener('resize', this[resizeChartMethod])
  },
  beforeDestroy() {
    window.removeEventListener('resize', this[resizeChartMethod])
  },
  methods: {
    // 通过lodash的防抖函数来控制resize的频率
    [resizeChartMethod]: debounce(function() {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
  }
}
```

```js
<!--图表组件代码-->
<template>
  <div class="chart"></div>
</template>
<script>
import echartMixins from './echarts-mixins'
export default {
  // mixins属性用于导入混入，是一个数组，数组可以传入多个混入对象
  mixins: [echartMixins],
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el)
  }
}
</script>
```

### 不同位置的混入规则
在`Vue`中，一个混入对象可以包含任意组件选项，但是对于不同的组件选项，会有不同的合并策略

1. `data`对于`data`,在混入时会进行递归合并，如果两个属性发生冲突，则以组件自身为主，如上例中的chart属性
2. 生命周期钩子函数.对于生命周期钩子函数，混入时会将同名钩子函数加入到一个数组中，然后在调用时依次执行。混入对象里面的钩子函数会优先于组件的钩子函数执行。如果一个组件混入了多个对象，对于混入对象里面的同名钩子函数，将按照数组顺序依次执行，如下代码:

```js
const mixin1 = {
  created() {
    console.log('我是第一个输出的')
  }
}

const mixin2 = {
  created() {
    console.log('我是第二个输出的')
  }
}
export default {
  mixins: [mixin1, mixin2],
  created() {
    console.log('我是第三个输出的')
  }
}
```

3. 其他选项 对于值为对象的选项，如`methods`,`components`,`filter`,`directives`,`props`等等，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

### 全局混入
混入也可以进行全局注册。一旦使用全局混入，那么混入的选项将在所有的组件内生效，如下代码所示：
```js
Vue.mixin({
  methods: {
    /**
     * 将埋点方法通过全局混入添加到每个组件内部
     * 
     * 建议将埋点方法绑定到Vue的原型链上面，如： Vue.prototype.$track = () => {}
     * */
    track(message) {
      console.log(message)
    }
  }
})
```

**请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项，**

## 后记
关于更多mixins内容，请查看[官方](https://cn.vuejs.org/v2/api/#mixins)文档