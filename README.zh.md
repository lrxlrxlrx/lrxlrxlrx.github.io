# AstroPaper 📄

![AstroPaper](public/default-og.jpg)
[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/community/file/1356898632249991861)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub](https://img.shields.io/github/license/satnaing/astro-paper?color=%232F3741&style=for-the-badge)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white&style=for-the-badge)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=for-the-badge)](http://commitizen.github.io/cz-cli/)

AstroPaper 是一个极简、响应式、无障碍且 SEO 友好的 Astro 博客主题。本主题基于[我的个人博客](https://satnaing.dev/blog)设计和构建。

阅读[博客文章](https://astro-paper.pages.dev/posts/)或查看[自述文档文档部分](#-documentation)以获取更多信息。

## 🔥 特性

- [x] 类型安全的 markdown
- [x] 超快性能
- [x] 无障碍访问（键盘/VoiceOver）
- [x] 响应式（移动端 ~ 桌面端）
- [x] SEO 友好
- [x] 亮色与暗色模式
- [x] 静态搜索（[Pagefind](https://pagefind.app/)）
- [x] 草稿文章与分页
- [x] 站点地图与 RSS 订阅
- [x] MDX 支持
- [x] 可折叠的目录
- [x] 遵循最佳实践
- [x] 高度可定制
- [x] 博客文章动态 OG 图片生成（[博客文章](https://astro-paper.pages.dev/posts/dynamic-og-image-generation-in-astropaper-blog-posts/)）
- [x] 国际化就绪

_注：我使用 Mac 上的 **VoiceOver** 和 Android 上的 **TalkBack** 测试了 AstroPaper 的屏幕阅读器无障碍性。我无法测试所有其他屏幕阅读器，但 AstroPaper 在其他阅读器上的无障碍增强功能应该也能正常工作。_

## ✅ Lighthouse 评分

<p align="center">
  <a href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fastro-paper.pages.dev%2F&form_factor=desktop">
    <img width="710" alt="AstroPaper Lighthouse 评分" src="AstroPaper-lighthouse-score.svg">
  </a>
</p>

## 🚀 项目结构

在 AstroPaper 中，您将看到以下文件夹和文件：

```bash
/
├── public/
│   ├── pagefind/          # 构建时自动生成
│   ├── favicon.svg
│   └── default-og.jpg
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   ├── content/
│   │   ├── pages/
│   │   │   └── about.md
│   │   └── posts/
│   │       └── some-blog-posts.md
│   ├── i18n/
│   ├── layouts/
│   ├── pages/
│   ├── scripts/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── config.ts
│   └── content.config.ts
├── astro-paper.config.ts  # 用户自定义配置
└── astro.config.ts
```

所有博客文章都存储在 `src/content/posts/` 目录中。您可以将文章组织到子目录中——子目录名称会成为文章 URL 的一部分。

## 📖 文档

文档可以以两种格式阅读：_markdown_ 和 _博客文章_。

- 配置 - [markdown](src/content/posts/how-to-configure-astropaper-theme.md) | [博客文章](https://astro-paper.pages.dev/posts/how-to-configure-astropaper-theme/)
- 添加文章 - [markdown](src/content/posts/adding-new-post.md) | [博客文章](https://astro-paper.pages.dev/posts/adding-new-posts-in-astropaper-theme/)
- 自定义配色方案 - [markdown](src/content/posts/customizing-astropaper-theme-color-schemes.md) | [博客文章](https://astro-paper.pages.dev/posts/customizing-astropaper-theme-color-schemes/)
- 预定义配色方案 - [markdown](src/content/posts/predefined-color-schemes.md) | [博客文章](https://astro-paper.pages.dev/posts/predefined-color-schemes/)

## 💻 技术栈

**主框架** - [Astro](https://astro.build/)
**类型检查** - [TypeScript](https://www.typescriptlang.org/)
**样式** - [TailwindCSS](https://tailwindcss.com/)
**UI/UX** - [Figma 设计文件](https://www.figma.com/community/file/1356898632249991861)
**静态搜索** - [Pagefind](https://pagefind.app/)
**图标** - [Tablers](https://tabler-icons.io/)
**代码格式化** - [Prettier](https://prettier.io/)
**部署** - [Cloudflare Pages](https://pages.cloudflare.com/)
**代码检查** - [ESLint](https://eslint.org)
**动态 OG 图片** - [Satori](https://github.com/vercel/satori) + [Sharp](https://sharp.pixelplumbing.com/) + [Astro 字体](https://docs.astro.build/en/guides/fonts/)

## 👨🏻‍💻 本地运行

您可以通过在目标目录中运行以下命令来在本地启动此项目：

```bash
# pnpm
pnpm create astro@latest --template satnaing/astro-paper

# npm
npm create astro@latest -- --template satnaing/astro-paper

# yarn
yarn create astro --template satnaing/astro-paper

# bun
bun create astro@latest -- --template satnaing/astro-paper
```

然后通过运行以下命令启动项目：

```bash
# 如果上一步未安装依赖，请先安装
pnpm install

# 启动项目
pnpm dev
```

## Google 站点验证（可选）

您可以通过在 `astro-paper.config.ts` 中设置 `site.googleVerification` 来添加 [Google 站点验证 HTML 标签](https://support.google.com/webmasters/answer/9008080#meta_tag_verification&zippy=%2Chtml-tag)：

```ts file="astro-paper.config.ts"
export default defineAstroPaperConfig({
  site: {
    // ...
    googleVerification: "your-google-site-verification-value",
  },
  // ...
});
```

> 参见[此讨论](https://github.com/satnaing/astro-paper/discussions/334#discussioncomment-10139247)了解如何将 AstroPaper 添加到 Google Search Console。

## 🧞 命令

所有命令均在项目根目录下的终端中运行：

| 命令             | 操作                                                                                                                           |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install`   | 安装依赖                                                                                                                       |
| `pnpm dev`       | 在 `localhost:4321` 启动本地开发服务器                                                                                         |
| `pnpm build`     | 类型检查、构建站点、运行 Pagefind 索引，并将索引复制到 `public/pagefind/`                                                       |
| `pnpm preview`   | 在部署前本地预览构建结果                                                                                                       |
| `pnpm sync`      | 为所有 Astro 模块生成 TypeScript 类型。[了解更多](https://docs.astro.build/en/reference/cli-reference/#astro-sync)             |
| `pnpm astro ...` | 运行 CLI 命令，如 `astro add`、`astro check`                                                                                   |

## ✨ 反馈与建议

如果您有任何建议或反馈，可以通过[我的邮箱](mailto:satnaingdev+astropaper@gmail.com)联系我。或者，如果您发现 Bug 或想请求新功能，欢迎提交 Issue。

## 📜 许可证

基于 MIT 许可证发布，版权所有 © 2026

---

由 [Sat Naing](https://satnaing.dev) 👨🏻‍💻 和[贡献者](https://github.com/satnaing/astro-paper/graphs/contributors) 用 🤍 制作
