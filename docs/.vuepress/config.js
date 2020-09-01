module.exports = {
  base: "/haoliu.github.io/",
  themeConfig: {
    nav:[ // 导航栏配置
      {text: '前端基础', link: '/basics/' },
      {text: '算法题库', link: '/bar/'},
      {text: '微博', link: 'https://baidu.com'}      
    ],
    sidebar: {
      '/basics/': [
        '',     
        'promise'
      ],
      '/bar/': [
        '',     /* /foo/ */
        'a'  /* /foo/one.html */
      ],
    }
    // sidebar: [
    //   {
    //     title: 'bar',   // 必要的
    //     path: '/bar/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    //     collapsable: false, // 可选的, 默认值是 true,
    //     sidebarDepth: 1,    // 可选的, 默认值是 1
    //     children: [{
    //       title: 'bar a',
    //       path: '/bar/a'
    //     }
    //     ]
    //   }
    // ]
  }
}