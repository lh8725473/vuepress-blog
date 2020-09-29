// const links = require('./links')

module.exports = {
  lang: 'zh-CN', // en zh-CN
  logo: '/20171231/tiny.jpeg',
  // banner: '/assets/img/banner.4118b53d.png',
  author: 'liuhao',
  authorLink: 'https://github.com/lh8725473/',
  avatar: '/20171231/tinylogo.png',
  locales: {
    title: 'Tiny的身体，Big梦想',
    description: '小小有大大的梦想',
  },
  navs: [
    {
      text: 'js手写代码',
      link: '/js365/',
    },
    {
      text: 'css',
      link: '/css/',
    },
    {
      text: 'vue',
      link: '/vue/',
    },
    {
      text: '开发日常',
      link: '/developDaily/',
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
        link: 'https://github.com/lh8725473/vuepress-blog',
        type: 'cloud',
        theme: 'filled',
      }
    ],
    three: [
      {
        title: '吐个槽',
        link: 'https://support.qq.com/product/171213574',
        type: 'message',
        theme: 'outlined',
      }
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
