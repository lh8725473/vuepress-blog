---

title: vu2.0中.sync与v-model

meta:
  - name: description
    content: vu2.0中.sync与v-model
  - name: keywords
    content: vu2.0中.sync与v-model

created: 2020/04/13

updated: 2020/04/13
 
tags:
  - vue
  - vue2.0

---

## v-model 原来挺香的
在用Vue开发前端时，不论使用原生还是封装好的UI库，对于表单组件，一般都会使用到v-model。虽然v-model是一个语法糖，但是吃到嘴里挺甜的啊。学会自定义v-model，还是很有必要的。

一个组件上的v-model默认是通过在组件上面定义一个名为value的props,同时对外暴露一个名为input的事件。

```js

<template>
  <div class="my-input">
    <input :value="value" @change="handleChange" />
  </div>
</template>

<script>
export default {
  props: {
    // 定义一个名为value的属性
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleChange (e) {
      // 对外暴露一个input事件
      this.$emit('input', e.target.value)
    }
  }
}
</script>

```

如何使用

```js
<my-input v-model="text"></my-input>
```

通常情况下，使用value属性与input事件没有问题，但是有时候有些组件会将value属性或input事件用于不同的目的，比如对于单选框、复选框等类型的表单组件的value属性就有其他用处，[参考](developer.mozilla.org/en-US/docs/…)。或者希望属性名称或事件名称与实际行为更贴切，比如active,checked等属性名。

```js
<template>
  <div class="my-check" :class="{ checked : checked }" @click="handleChange">
    <span class="my-check-core"></span>
  </div>
</template>

<script>
export default {
  // 通过model可以自定义属性和事件名
  model: {
    event: 'change',
    prop: 'checked'
  },
  props: {
    // 定义一个名为checked的属性
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange () {
      // 对外暴露一个change事件
      this.$emit('change', !this.checked)
    }
  }
}
</script>
```

### 使用.sync后，感觉.sync比v-model更香
在`Vue`中，`props`属性是单向数据传输的,父级的`prop`的更新会向下流动到子组件中，但是反过来不行。可是有些情况，我们需要对`prop`进行“双向绑定”。上文中，我们提到了使用v-model实现双向绑定。但有时候我们希望一个组件可以实现多个数据的“双向绑定”，而`v-model`一个组件只能有一个(Vue3.0可以有多个)，这时候就需要使用到`.sync`。

.sync与v-model的异同

相同点:

1. 两者的本质都是语法糖，目的都是实现组件与外部数据的双向绑定
2. 两个都是通过属性+事件来实现的

不同点:

1. 一个组件只能定义一个v-model,但可以定义多个.sync
2. v-model与.sync对于的事件名称不同，v-model默认事件为input,可以通过配置model来修改，.sync事件名称固定为update:属性名

### 自定义.sync
在开发业务时，有时候需要使用一个遮罩层来阻止用户的行为（更多会使用遮罩层+loading动画），下面通过自定义.sync来实现一个遮罩层

```js
<template>
  <!-- 遮罩层 -->
  <div class="my-loading" v-show="visible" @click="handleChange">
  </div>
</template>

<script>
export default {
  props: {
    // 定义一个名为checked的属性
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange () {
      // 通过update:visible 事件修改外部传入的visible
      this.$emit('update:visible', false)
    }
  }
}
</script>

```

```js
<!--调用方式-->
<template>
  <my-loading :visible.sync="visible"></my-loading>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  }
}
</script>
```

### 后记
不管`v-model`或者`.sync`只是一个语法糖，更多关于[v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)和[.sync](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)官方介绍。

