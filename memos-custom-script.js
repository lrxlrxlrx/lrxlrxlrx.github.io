// Memos 自定义脚本（合并版 v2）—— 粘贴到 Memos 后台 → 设置 → 通用 → 自定义脚本
//
// 包含：
//   1. 点击 memos 内的外链，在博客新标签页打开（而非 iframe 内跳转）
//   2. 初始加载时跟随博客主题（兜底，若 postMessage 偶发未同步）
//   3. 仅在嵌入博客 iframe 时标记 html.in-iframe，让隐藏导航等样式只作用于
//      嵌入场景；直访 memos（登录/设置）时一切正常
//   4. Twikoo 评论：列表页每条说说右侧一个"评论"按钮，点击才加载评论区；
//      单条说说页挂载到预留的 #comments 锚点（自动加载）
(function () {
  "use strict";

  // ===== 1. 外链新标签页打开 =====
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="http"]');
    if (a && !a.href.includes(location.host)) {
      e.preventDefault();
      window.open(a.href, "_blank");
    }
  });

  // ===== 2. 初始加载时跟随博客主题（兜底） =====
  (function () {
    const apply = () => {
      const html = document.documentElement;
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      html.classList.toggle("dark", dark);
    };
    apply();
  })();

  // ===== 3. 仅 iframe 嵌入时标记，直访时保留登录/设置入口 =====
  if (window.self !== window.top) {
    document.documentElement.classList.add("in-iframe");
  }

  // ===== 4. Twikoo 评论 =====
  // 说明：twikoo.init 会删除传入的容器元素并原地替换为 div.twikoo，
  //       因此守卫判断要同时检查 div.twikoo，避免重复创建评论区块
  var TWIKOO_ENV_ID = "https://luuooo.netlify.app/.netlify/functions/twikoo";
  var TWIKOO_CDN_LIST = [
    "https://registry.npmmirror.com/twikoo/1.7.15/files/dist/twikoo.all.min.js",
    "https://s4.zstatic.net/npm/twikoo@1.7.15/dist/twikoo.all.min.js",
    "https://cdn.jsdelivr.net/npm/twikoo@1.7.15/dist/twikoo.all.min.js",
  ];

  // 评论容器样式（方角，与卡片风格一致）
  var STYLE = document.createElement("style");
  STYLE.textContent =
    ".memo-twikoo{padding:.75rem 1rem;margin:.5rem 0;background:#fff;border:1px solid #fff}" +
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

  // 从 Twikoo 云函数批量获取各说说的评论数，更新按钮文案为"评论(x)"
  var lastCountFetch = 0;

  function updateCounts() {
    var btns = document.querySelectorAll(".memo-comment-btn");
    if (!btns.length) return;
    var urls = [];
    var idOf = {};
    Array.prototype.forEach.call(btns, function (btn) {
      var id = btn.getAttribute("data-memo-id");
      if (!/^\d+$/.test(id)) return;
      var url = "/memos/" + id;
      urls.push(url);
      idOf[url] = id;
    });
    if (!urls.length) return;
    fetch(TWIKOO_ENV_ID, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "GET_COMMENTS_COUNT", urls: urls }),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (res) {
        if (!res || !res.data) return;
        res.data.forEach(function (item) {
          var btn = document.querySelector(
            '.memo-comment-btn[data-memo-id="' + idOf[item.url] + '"]'
          );
          if (btn) btn.textContent = "评论(" + item.count + ")";
        });
      })
      .catch(function () {
        // 网络异常时静默，下轮轮询重试
      });
  }

  // 单条说说页：自动挂载到预留的 #comments 锚点下
  function handleSinglePage() {
    var slot = document.getElementById("comments");
    if (!slot || !slot.parentElement) return;
    if (slot.parentElement.querySelector(".twikoo")) return;
    var box = document.createElement("div");
    box.className = "memo-twikoo";
    slot.parentElement.insertBefore(box, slot.nextSibling);
    loadTwikoo(function () {
      initTwikoo(box, location.href.split("#")[0]);
    });
  }

  // 说说列表页：给每条说说添加"评论"按钮（右侧），评论区点击按钮后才创建
  function ensureButtons() {
    var columns = document.querySelectorAll(
      "div.w-full.grid.gap-2 > div.min-w-0.mx-auto.w-full.max-w-2xl"
    );
    Array.prototype.forEach.call(columns, function (column) {
      Array.prototype.forEach.call(column.children, function (wrapper) {
        if (!wrapper.querySelector(".group")) return;
        if (wrapper.querySelector(".memo-comment-btn")) return;
        var link = wrapper.querySelector('a[href^="/memos/"]');
        if (!link) return;
        var id = link.getAttribute("href").replace(/^\/memos\//, "").replace(/#.*$/, "");
        if (!/^\d+$/.test(id)) return;
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "memo-comment-btn";
        btn.setAttribute("data-memo-id", id);
        btn.textContent = "评论(0)";
        btn.setAttribute("aria-label", "评论");
        wrapper.querySelector(".group").appendChild(btn);
      });
    });
  }

  // 点击"评论"按钮：首次点击创建评论区并加载评论，再次点击切换显隐
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".memo-comment-btn");
    if (!btn || !btn.parentElement || !btn.parentElement.parentElement) return;
    var id = btn.getAttribute("data-memo-id");
    if (!/^\d+$/.test(id)) return;
    var wrapper = btn.parentElement.parentElement;
    var box = wrapper.querySelector(".memo-twikoo, .twikoo");
    if (box) {
      box.style.display = box.style.display === "none" ? "" : "none";
      return;
    }
    box = document.createElement("div");
    box.className = "memo-twikoo";
    wrapper.appendChild(box);
    loadTwikoo(function () {
      initTwikoo(box, location.origin + "/memos/" + id);
    });
    // 加载评论区后刷新一次计数
    setTimeout(updateCounts, 3000);
  });

  // 定时轮询：Memos 是 SPA，动态加载更多/切换页面/重渲染后自愈
  function tick() {
    try {
      if (/^\/memos\/\d+$/.test(location.pathname)) {
        handleSinglePage();
      } else {
        ensureButtons();
        // 评论数最多每 15 秒刷新一次，避免频繁请求
        if (Date.now() - lastCountFetch > 15000) {
          lastCountFetch = Date.now();
          updateCounts();
        }
      }
    } catch (e) {
      // 忽略 DOM 变动期间的不稳定状态，下轮重试
    }
  }

  setInterval(tick, 2000);
  tick();
})();
