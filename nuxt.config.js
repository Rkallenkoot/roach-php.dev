const shiki = require("shiki");

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "docs",
    htmlAttrs: {
      lang: "en",
      class: "h-full [--scroll-mt:9rem]",
    },
    script: [
      {
        src: "https://cdn.usefathom.com/script.js", 
        "data-site": "LPISCBAQ" ,
        defer: "true",
      }
    ],
    bodyAttrs: {
      class: "bg-gray-50",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "icon",
        href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐴</text></svg>",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxt/postcss8",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxt/content"],

  router: {
    extendRoutes(routes) {
      routes.push({
        path: "/",
        redirect: "/docs/introduction",
      });
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  content: {
    markdown: {
      async highlighter() {
        const highlighter = await shiki.getHighlighter({
          theme: "material-palenight",
        });

        return (rawCode, lang, { fileName }, { h, node, u }) => {
          const code = highlighter.codeToHtml(rawCode, lang);

          const children = [];

          if (fileName) {
            children.push(
              h(
                node,
                "span",
                {
                  className: "absolute top-2 right-3 text-gray-500 text-sm",
                },
                [u("raw", fileName)]
              )
            );
          }

          children.push(
            h(node, "div", { className: "rounded-xl overflow-hidden my-6" }, [
              u("raw", code),
            ])
          );

          return h(node, "div", { className: "relative" }, children);
        };
      },
    },
  },
};
