// const links = require('./links')

module.exports = {
  lang: 'zh-CN', // en zh-CN
  logo: 'https://bkimg.cdn.bcebos.com/pic/2e2eb9389b504fc225700ec7efdde71191ef6dc1?x-bce-process=image/resize,m_lfit,w_150,limit_1',
  banner: 'https://bkimg.cdn.bcebos.com/pic/2e2eb9389b504fc225700ec7efdde71191ef6dc1?x-bce-process=image/resize,m_lfit,w_150,limit_1',
  author: 'liuhao',
  authorLink: 'https://github.com/lh8725473/',
  avatar: 'https://static.xmt.cn/cc50c217cbe342ce951324583f2c6139.png',
  locales: {
    title: 'Tiny的身体，Big梦想',
    description: '小小的我有大大的梦想',
  },
  navs: [
    {
      text: '编程技术',
      link: '/program/',
    },
    {
      text: 'js手写代码',
      link: '/js365/',
    },
    {
      text: '生活兴趣',
      link: '/life/',
    },
    {
      text: '软件工具',
      link: '/tool/',
    },
    {
      text: '其它',
      link: '/other/',
    },
  ],
  nameplate: {
    title: 'Tiny',
  },
  buttons: [
    {
      text: '阅读列表',
      link: '/posts/',
      type: 'primary',
    },
    {
      text: '了解作者',
      link: '/about.html',
      type: 'default',
    },
  ],
  footer: {
    one: [
      {
        title: 'Yur',
        subtitle: 'VuePress 主题',
        link: 'https://github.com/cnguu/vuepress-theme-yur',
      },
    ],
    two: [
      {
        title: '本站托管于 GitHub',
        link: 'https://blog.cnguu.cn/',
        type: 'cloud',
        theme: 'filled',
      },
      {
        title: '粤 ICP 备 17075980 号 - 4',
        link: 'http://beian.miit.gov.cn',
        type: 'flag',
        theme: 'filled',
      },
    ],
    three: [
      {
        title: '吐个槽',
        link: 'https://support.qq.com/product/106316',
        type: 'message',
        theme: 'outlined',
      },
      {
        title: '社区交流扣群：686025154',
        link: '//shang.qq.com/wpa/qunwpa?idkey=c6afb0610ede557ae6920fc4cb31d652fde73d703203b261c6d2366544371776',
        type: 'qq',
        theme: 'outlined',
      },
    ],
  },
  post: {
    bubbles: true,
    // cover: [
    //   '/20171231/favicon.ico',
    //   'https://static.xmt.cn/cc50c217cbe342ce951324583f2c6139.png',
    // ],
    // pageSize: 12,
    // pageSizeOptions: ['12', '24', '48', '96'],
  },
  // reward: [
  //   'https://static.xmt.cn/ca717dde8ae14ea7ab3c8c74b8711414.png',
  //   'https://static.xmt.cn/acc7d3d02b0c4a35a3735268cbb2cce0.png',
  // ],
  timeline: true,
  // links: links,
  about: true,
  search: {
    type: 'default',
    size: 10,
  },
  dark: true,
  // cdn: 'https://cdn.jsdelivr.net/gh/cnguu/cnguu.github.io@master/',
}
