import {

  envField,

  svgoOptimizer,
} from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import rehypeCallouts from "rehype-callouts";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import config from "./astro-paper.config";

import { defineConfig, fontProviders } from "astro/config";



export default defineConfig({
    site: 'https://lrxlrxlrx.github.io',
    base: "/luuooo.com",
  integrations: [
    mdx(),
    sitemap({
      filter: page =>
        config.features?.showArchives !== false || !page.endsWith("/archives/"),
    }),
  ],
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkToc,
        [remarkCollapse, { test: "Table of contents" }],
      ],
      rehypePlugins: [rehypeCallouts],
    }),
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      // name: "noto-sans-sc",
      // cssVariable: "--font-google-sans-code",
      // provider: fontProviders.fontsource(),
      // fallbacks: ["monospace"],
      // weights: [300, 400, 500, 600, 700],
      // styles: ["normal", "italic"],
          //     formats: ["woff", "ttf"],
          name: "Noto Sans SC",                      // ① 改为 Noto Sans SC
          cssVariable: "--font-noto-sans-sc",        // ② 自定义 CSS 变量名
          provider: fontProviders.fontsource(),
          fallbacks: ["system-ui", "sans-serif"],
          weights: [400, 500, 700],                  // ③ 包含 400 和 700（额外 500 可选）
          styles: ["normal"],                        // 中文字体通常只有 normal（无 italic）


    },
  ],
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});

