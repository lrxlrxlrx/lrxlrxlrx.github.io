import Giscus, { type Theme } from "@giscus/react";
import { useEffect, useState } from "react";

interface CommentsProps {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: CommentsProps) {
  const [theme, setTheme] = useState(() => {
    const currentTheme = localStorage.getItem("theme");
    const browserTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    return currentTheme || browserTheme;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = ({ matches }: MediaQueryListEvent) => {
      setTheme(matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const themeButton = document.querySelector("#theme-btn");
    const handleClick = () => {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };
    themeButton?.addEventListener("click", handleClick);
    return () => themeButton?.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="app-layout">
      <hr className="border-border my-8 border-dashed" />
      <h2 className="text-foreground mb-6 text-lg font-semibold">
        评论
      </h2>
      <div className="bg-background border-border rounded-xl border p-6">
        <Giscus
          repo="lrxlrxlrx/lrxlrxlrx.github.io"
          repoId="R_kgDOTmQkmA"
          category="Blog Comments"
          categoryId="DIC_kwDOTmQkmM4DCNFC"
          mapping="og:title"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="1"
          inputPosition="top"
          lang="zh-CN"
          loading="lazy"
          theme={theme === "light" ? lightTheme : darkTheme}
        />
      </div>
    </div>
  );
}
