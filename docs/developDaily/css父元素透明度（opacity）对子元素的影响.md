---

title: css父元素透明度（opacity）对子元素的影响

meta:
  - name: description
    content: css父元素透明度（opacity）对子元素的影响
  - name: keywords
    content: css父元素透明度（opacity）对子元素的影响

created: 2020/07/01

updated: 2020/07/01
 
tags:
  - 日常开发

---

## 前言
今天UI妹妹设计了一个透明下拉菜单，看起来效果很棒，心理窃喜(不就是opacity一下嘛)，结果发现opacity影响了子元素的opacity使得效果一直无法达到设计的效果。问题的根本原因是`子元素会继承父元素的透明度`。

### 子元素会继承父元素的透明度
设置父元素opacity：0.5，子元素不设置opacity，子元素会受到父元素opacity的影响，也会有0.5的透明度。

### 子元素的透明度是基于父元素的透明度计算的
设置父元素opacity：0.5，即使设置子元素opacity：1，子元素的opacity：1也是在父元素的opacity：0.5的基础上设置的，因此子元素的opacity还是0.5。

### 解决方案
利用CSS3属性rgba（即red+green+blue+alpha的颜色），
例如`background-color:rgba(0,0,0,0.5)`
完美解决问题！~

