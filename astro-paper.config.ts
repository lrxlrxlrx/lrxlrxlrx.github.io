import { defineAstroPaperConfig } from "./src/types/config";

// 博客站点配置
export default defineAstroPaperConfig({
  site: {
    url: "https://luuooo.com/",       // 站点URL
    title: "Luuooo's blog",                          // 站点标题
    description: "这里主要分享我的生活", // 站点描述
    author: "luuooo",                          // 作者名
    profile: "https://luuooo.com",                 // 作者个人主页
    ogImage: "default-og.jpg",                    // 默认OG图片
        lang: "zh",                                   // 语言代码
        timezone: "Asia/Shanghai",                     // 时区
    dir: "ltr",                                   // 文字方向(ltr:左到右, rtl:右到左)
  },
  // 文章列表配置
  posts: {
    perPage: 10,               // 每页文章数
    perIndex: 5,              // 首页文章数
    scheduledPostMargin: 15 * 60 * 1000,  // 定时发布提前检查时间(毫秒)
  },
  // 功能开关
  features: {
    lightAndDarkMode: true,   // 明暗主题切换
    dynamicOgImage: true,     // 动态生成OG图片
    showArchives: true,       // 显示归档页面
    showBackButton: true,     // 显示返回按钮
      editPost: {               // "编辑此文章"链接
          enabled: false,
      url: "https://github.com/satnaing/astro-paper/edit/main/",
    },
    search: "pagefind",       // 搜索功能(pagefind或空)
  },
  // 社交链接(显示在站点页脚)
  socials: [
    { name: "github",   url: "https://github.com/lrxlrxlrx" },
    // { name: "x",        url: "https://x.com/username" },
    // { name: "linkedin", url: "https://www.linkedin.com/in/username/" },
    { name: "mail",     url: "mailto:luuoooluo@gmail.com" },
  ],
  // 文章分享链接
  // shareLinks: [
  //   { name: "whatsapp", url: "https://wa.me/?text=" },
  //   { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
  //   { name: "x",        url: "https://x.com/intent/post?url=" },
  //   { name: "telegram", url: "https://t.me/share/url?url=" },
  //   { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
  //   { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  // ],
});