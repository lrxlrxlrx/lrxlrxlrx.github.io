// Memos x Twikoo 评论（Memos v0.24.0-cloudflare）
//
// 使用方法：
//   1. 打开 Memos 后台 → 设置 → 通用 → 自定义脚本
//   2. 将本文件全部内容粘贴进去并保存
//
// 功能：
//   - 说说列表页（/explore、/）：每条说说下方挂一个 Twikoo 评论区，评论按
//     说说路径（/memos/:id）区分，与单条说说页共用同一份评论
//   - 单条说说页（/memos/:id）：挂载到页面预留的 #comments 锚点下
//
// 说明：twikoo.init 会删除传入的容器元素并原地替换为 div.twikoo，
//       因此守卫判断要同时检查 div.twikoo，避免轮询重复创建评论区块
(function () {
  "use strict";

  // Twikoo 云函数地址（与博客评论组件一致）
  var TWIKOO_ENV_ID = "https://luuooo.netlify.app/.netlify/functions/twikoo";

  // Twikoo CDN 镜像列表，按顺序尝试加载
  var TWIKOO_CDN_LIST = [
    "https://registry.npmmirror.com/twikoo/1.7.15/files/dist/twikoo.all.min.js",
    "https://s4.zstatic.net/npm/twikoo@1.7.15/dist/twikoo.all.min.js",
    "https://cdn.jsdelivr.net/npm/twikoo@1.7.15/dist/twikoo.all.min.js",
  ];

  // 评论容器样式，跟随说说卡片风格（浅色/深色）
  var STYLE = document.createElement("style");
  STYLE.textContent =
    ".memo-twikoo{padding:.75rem 1rem;margin:.5rem 0;border-radius:.5rem;background:#fff;border:1px solid #fff}" +
    ".dark .memo-twikoo{background:#27272a;border-color:#3f3f46}";
  document.head.appendChild(STYLE);

  var loadingTwikoo = false;

  // 加载 twikoo 脚本，成功后回调（失败时静默，下轮轮询重试）
  function loadTwikoo(cb) {
    if (window.twikoo) return cb();
    if (loadingTwikoo) {
      setTimeout(function () {
        loadTwikoo(cb);
      }, 500);
      return;
    }
    loadingTwikoo = true;
    var tryLoad = function (idx) {
      if (idx >= TWIKOO_CDN_LIST.length) {
        loadingTwikoo = false;
        return;
      }
      var s = document.createElement("script");
      s.src = TWIKOO_CDN_LIST[idx];
      s.async = true;
      s.onload = function () {
        loadingTwikoo = false;
        cb();
      };
      s.onerror = function () {
        s.remove();
        tryLoad(idx + 1);
      };
      document.head.appendChild(s);
    };
    tryLoad(0);
  }

  // 初始化评论容器；el 为 DOM 节点，twikoo 会删除它并原地替换为 div.twikoo
  function initTwikoo(el, path) {
    if (!window.twikoo) return;
    window.twikoo.init({
      envId: TWIKOO_ENV_ID,
      el: el,
      path: path,
    });
  }

  // 单条说说页：挂载到预留的 #comments 锚点下
  function handleSinglePage() {
    var slot = document.getElementById("comments");
    if (!slot || !slot.parentElement) return;
    // 已挂载过（div.twikoo 会替代我们插入的容器，需一并检查）
    if (slot.parentElement.querySelector(".twikoo")) return;
    var box = document.createElement("div");
    box.className = "memo-twikoo";
    slot.parentElement.insertBefore(box, slot.nextSibling);
    loadTwikoo(function () {
      initTwikoo(box, location.href.split("#")[0]);
    });
  }

  // 说说列表页：每条说说卡片下方插入评论区
  function handleFeed() {
    var columns = document.querySelectorAll(
      "div.w-full.grid.gap-2 > div.min-w-0.mx-auto.w-full.max-w-2xl"
    );
    Array.prototype.forEach.call(columns, function (column) {
      // 每条说说一个包裹层（无类名的 div），内部是卡片
      Array.prototype.forEach.call(column.children, function (wrapper) {
        if (!wrapper.querySelector(".group")) return;
        if (wrapper.querySelector(".twikoo, .memo-twikoo")) return;
        var link = wrapper.querySelector('a[href^="/memos/"]');
        if (!link) return;
        var id = link.getAttribute("href").replace(/^\/memos\//, "").replace(/#.*$/, "");
        if (!/^\d+$/.test(id)) return;
        var box = document.createElement("div");
        box.className = "memo-twikoo";
        wrapper.appendChild(box);
        loadTwikoo(function () {
          initTwikoo(box, location.origin + "/memos/" + id);
        });
      });
    });
  }

  // 定时轮询：Memos 是 SPA，动态加载更多/切换页面/重渲染后自愈
  function tick() {
    try {
      if (/^\/memos\/\d+$/.test(location.pathname)) {
        handleSinglePage();
      } else {
        handleFeed();
      }
    } catch (e) {
      // 忽略 DOM 变动期间的不稳定状态，下轮重试
    }
  }

  setInterval(tick, 2000);
  tick();
})();
