// vite.config.ts
import { defineConfig } from "file:///F:/CodeSpace/FitUI/node_modules/.pnpm/vite@5.4.14_@types+node@22.10.9_less@4.2.2_sass-embedded@1.83.4_sass@1.83.4_terser@5.37.0/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import vue from "file:///F:/CodeSpace/FitUI/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@5.4.14_@types+node@22.10.9_less@4.2.2_sass-embedded@1.83.4_sass_sinytuw2uj4pnn6qiyvhoe777a/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///F:/CodeSpace/FitUI/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.1.1_vite@5.4.14_@types+node@22.10.9_less@4.2.2_sass-embedded@1.83.4__w5z5yjbgdeytgzf7ftew425ctu/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueSetupExtend from "file:///F:/CodeSpace/FitUI/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@5.4.14_@types+node@22.10.9_less@4.2.2_sass-embedded@1_ufmpnkpvrsqshgrlj23bd4j6ki/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";

// config/unocss.ts
import { presetUno, presetAttributify, presetIcons } from "file:///F:/CodeSpace/FitUI/node_modules/.pnpm/unocss@65.4.3_postcss@8.5.1_rollup@4.31.0_vite@5.4.14_@types+node@22.10.9_less@4.2.2_sass-emb_xzf4f2vzyw2hj5ruzlehqid5pm/node_modules/unocss/dist/index.mjs";
import Unocss from "file:///F:/CodeSpace/FitUI/node_modules/.pnpm/unocss@65.4.3_postcss@8.5.1_rollup@4.31.0_vite@5.4.14_@types+node@22.10.9_less@4.2.2_sass-emb_xzf4f2vzyw2hj5ruzlehqid5pm/node_modules/unocss/dist/vite.mjs";
import transformerDirectives from "file:///F:/CodeSpace/FitUI/node_modules/.pnpm/@unocss+transformer-directives@65.4.3/node_modules/@unocss/transformer-directives/dist/index.mjs";

// utils/ficon/logo_icon.ts
var logoArr = [
  "google",
  "baidu",
  "apple",
  "github",
  "typescript",
  "android",
  "windows",
  "edge"
];
var logoObj = {};
logoArr.forEach((val) => {
  logoObj[val] = `i-bxl-${val}`;
});
var logoSafelist = logoArr.map((val) => `i-bxl-${val}`);

// utils/ficon/mono_icon_arr.ts
var mono_icon_arr_default = [
  "add",
  "archive",
  "arrow-down",
  "arrow-left-down",
  "arrow-left-up",
  "arrow-left",
  "arrow-right-down",
  "arrow-right-up",
  "arrow-right",
  "arrow-up",
  "attachment",
  "backspace",
  "ban",
  "bar-chart-alt",
  "bar-chart",
  "board",
  "bold",
  "book",
  "bookmark",
  "calendar",
  "call",
  "camera",
  "caret-down",
  "caret-left",
  "caret-right",
  "caret-up",
  "check",
  "chevron-double-down",
  "chevron-double-left",
  "chevron-double-right",
  "chevron-double-up",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "circle-add",
  "circle-arrow-down",
  "circle-arrow-left",
  "circle-arrow-right",
  "circle-arrow-up",
  "circle-check",
  "circle-error",
  "circle-help",
  "circle-information",
  "circle-remove",
  "circle-warning",
  "circle",
  "clipboard-check",
  "clipboard-list",
  "clipboard",
  "clock",
  "close",
  "cloud-download",
  "cloud-upload",
  "cloud",
  "cloudy",
  "comment",
  "compass",
  "computer",
  "copy",
  "credit-card",
  "database",
  "delete-alt",
  "delete",
  "document-add",
  "document-check",
  "document-download",
  "document-empty",
  "document-remove",
  "document",
  "download",
  "drag",
  "drop",
  "edit-alt",
  "edit",
  "email",
  "enter",
  "expand",
  "export",
  "external-link",
  "eye-off",
  "eye",
  "favorite",
  "filter-1",
  "filter-alt",
  "filter",
  "flag",
  "fog",
  "folder-add",
  "folder-check",
  "folder-download",
  "folder-remove",
  "folder",
  "grid",
  "heart",
  "home",
  "image",
  "inbox",
  "italic",
  "laptop",
  "layers",
  "layout",
  "link-alt",
  "link",
  "list",
  "location",
  "lock",
  "log-in",
  "log-out",
  "map",
  "megaphone",
  "menu",
  "message-alt",
  "message",
  "minimize",
  "mobile",
  "moon",
  "next",
  "notification-off",
  "notification",
  "options-horizontal",
  "options-vertical",
  "pause",
  "pen",
  "percentage",
  "pin",
  "play",
  "previous",
  "print",
  "rain",
  "refresh",
  "remove",
  "reorder-alt",
  "reorder",
  "repeat",
  "save",
  "search",
  "select",
  "send",
  "settings",
  "share",
  "shopping-cart-add",
  "shopping-cart",
  "shuffle",
  "snow",
  "snowflake",
  "sort",
  "speakers",
  "stop",
  "storm",
  "strikethrough",
  "sun",
  "sunrise",
  "sunset",
  "switch",
  "table",
  "tablet",
  "tag",
  "temperature",
  "text",
  "three-rows",
  "two-columns",
  "two-rows",
  "underline",
  "undo",
  "unlock",
  "user-add",
  "user-check",
  "user-remove",
  "user",
  "users",
  "volume-off",
  "volume-up",
  "warning",
  "webcam",
  "wind",
  "window",
  "zoom-in",
  "zoom-out"
];

// utils/ficon/mono_iocn.ts
var monoIcon = [...mono_icon_arr_default];
var monoObj = {};
monoIcon.forEach((item) => {
  monoObj[item] = `i-mi-${item}`;
});
var monoSafelist = monoIcon.map((item) => `i-mi-${item}`);

// utils/ficon/google_icon.ts
var googleArr = [
  "baseline-code",
  "baseline-code-off",
  "baseline-qr-code",
  "baseline-qr-code-scanner",
  "baseline-fullscreen",
  "baseline-fullscreen-exit"
];
var googleObj = {};
googleArr.forEach((val) => {
  googleObj[val] = `i-ic-${val}`;
});
var googleSafelist = googleArr.map((val) => `i-ic-${val}`);

// utils/ficon/index.ts
var allIconSafelist = [...logoSafelist, ...monoSafelist, ...googleSafelist];
var allIconObj = { ...logoObj, ...monoObj, ...googleObj };

// config/unocss.ts
var colors = [
  "white",
  "black",
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink"
];
var safelist = [
  ...colors.map((v) => `bg-${v}-500`),
  ...colors.map((v) => `hover:bg-${v}-700`),
  ...allIconSafelist
];
var unocss_default = () => Unocss({
  safelist,
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      prefix: "i-",
      extraProperties: {
        display: "inline-block"
      }
    })
  ],
  // transformCSS: true,
  transformers: [
    transformerDirectives()
  ]
});

// vite.config.ts
import dts from "file:///F:/CodeSpace/FitUI/node_modules/.pnpm/vite-plugin-dts@4.5.0_@types+node@22.10.9_rollup@4.31.0_typescript@5.7.3_vite@5.4.14_@types+n_vdwbdf4q7lcn3i2m3qtu2v37iq/node_modules/vite-plugin-dts/dist/index.mjs";
import DefineOptions from "file:///F:/CodeSpace/FitUI/node_modules/.pnpm/unplugin-vue-define-options@1.5.5_vue@3.5.13_typescript@5.7.3_/node_modules/unplugin-vue-define-options/dist/vite.js";
var __vite_injected_original_dirname = "F:\\CodeSpace\\FitUI\\packages\\fit-ui";
var rollupOptions = {
  external: ["vue", "vue-router"],
  input: resolve(__vite_injected_original_dirname, "./src/entry.ts"),
  output: [
    {
      format: "es",
      dir: "dist/es",
      entryFileNames: "[name].js",
      // chunkFileNames: 'chunks/[name]-[hash].js',
      assetFileNames: "assets/[name].[ext]",
      globals: { vue: "Vue" },
      exports: "named",
      preserveModules: true,
      preserveModulesRoot: "./"
      // preserveEntrySignatures: 'allow-extension',
    },
    {
      format: "cjs",
      dir: "dist/lib",
      entryFileNames: "[name].js",
      // chunkFileNames: 'chunks/[name]-[hash].js',
      assetFileNames: "assets/[name].[ext]",
      globals: { vue: "Vue" },
      exports: "named",
      preserveModules: true,
      preserveModulesRoot: "./"
      // preserveEntrySignatures: 'allow-extension',
    }
  ]
};
var config = {
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true"
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src"),
      "@utils": resolve(__vite_injected_original_dirname, "utils"),
      "@enums": resolve(__vite_injected_original_dirname, "enums"),
      "@ftypes": resolve(__vite_injected_original_dirname, "ftypes"),
      "@fstyles": resolve(__vite_injected_original_dirname, "styles")
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    VueSetupExtend(),
    unocss_default(),
    dts({ rollupTypes: true }),
    DefineOptions()
  ],
  server: {
    host: "0.0.0.0",
    port: 8444,
    open: false,
    https: false
    // 显式指定类型
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `@use "@fstyles/global";`
      }
    }
  },
  build: {
    target: "modules",
    rollupOptions,
    minify: "terser",
    sourcemap: false,
    reportCompressedSize: true,
    lib: {
      entry: "./src/entry.ts",
      name: "FitUI",
      fileName: "fitui"
    },
    outDir: "./dist"
  }
  // test: {
  //   globals: true,
  //   environment: 'happy-dom',
  //   transformMode: {
  //     web: [/.[tj]sx$/],
  //   },
  // },
};
var vite_config_default = defineConfig(config);
export {
  config,
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiY29uZmlnL3Vub2Nzcy50cyIsICJ1dGlscy9maWNvbi9sb2dvX2ljb24udHMiLCAidXRpbHMvZmljb24vbW9ub19pY29uX2Fyci50cyIsICJ1dGlscy9maWNvbi9tb25vX2lvY24udHMiLCAidXRpbHMvZmljb24vZ29vZ2xlX2ljb24udHMiLCAidXRpbHMvZmljb24vaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxDb2RlU3BhY2VcXFxcRml0VUlcXFxccGFja2FnZXNcXFxcZml0LXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxDb2RlU3BhY2VcXFxcRml0VUlcXFxccGFja2FnZXNcXFxcZml0LXVpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9Db2RlU3BhY2UvRml0VUkvcGFja2FnZXMvZml0LXVpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBVc2VyQ29uZmlnRXhwb3J0IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHR5cGUgeyBTZXJ2ZXJPcHRpb25zIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCBWdWVTZXR1cEV4dGVuZCBmcm9tICd2aXRlLXBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kJ1xyXG5pbXBvcnQgVW5vQ1NTIGZyb20gJy4vY29uZmlnL3Vub2NzcydcclxuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXHJcbmltcG9ydCBEZWZpbmVPcHRpb25zIGZyb20gJ3VucGx1Z2luLXZ1ZS1kZWZpbmUtb3B0aW9ucy92aXRlJ1xyXG5cclxudHlwZSBFeHBvcnRzVHlwZSA9ICdkZWZhdWx0JyB8ICduYW1lZCcgfCAnbm9uZScgfCAnYXV0bydcclxuXHJcbmNvbnN0IHJvbGx1cE9wdGlvbnMgPSB7XHJcbiAgZXh0ZXJuYWw6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInXSxcclxuICBpbnB1dDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvZW50cnkudHNcIiksXHJcbiAgb3V0cHV0OiBbXHJcbiAgICB7XHJcbiAgICAgIGZvcm1hdDogJ2VzJyxcclxuICAgICAgZGlyOiAnZGlzdC9lcycsXHJcbiAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLmpzJyxcclxuICAgICAgLy8gY2h1bmtGaWxlTmFtZXM6ICdjaHVua3MvW25hbWVdLVtoYXNoXS5qcycsXHJcbiAgICAgIGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bbmFtZV0uW2V4dF1cIixcclxuICAgICAgZ2xvYmFsczogeyB2dWU6ICdWdWUnIH0sXHJcbiAgICAgIGV4cG9ydHM6ICduYW1lZCcsXHJcbiAgICAgIHByZXNlcnZlTW9kdWxlczogdHJ1ZSxcclxuICAgICAgcHJlc2VydmVNb2R1bGVzUm9vdDogJy4vJyxcclxuICAgICAgLy8gcHJlc2VydmVFbnRyeVNpZ25hdHVyZXM6ICdhbGxvdy1leHRlbnNpb24nLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgZm9ybWF0OiAnY2pzJyxcclxuICAgICAgZGlyOiAnZGlzdC9saWInLFxyXG4gICAgICBlbnRyeUZpbGVOYW1lczogJ1tuYW1lXS5qcycsXHJcbiAgICAgIC8vIGNodW5rRmlsZU5hbWVzOiAnY2h1bmtzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICBhc3NldEZpbGVOYW1lczogXCJhc3NldHMvW25hbWVdLltleHRdXCIsXHJcbiAgICAgIGdsb2JhbHM6IHsgdnVlOiAnVnVlJyB9LFxyXG4gICAgICBleHBvcnRzOiAnbmFtZWQnLFxyXG4gICAgICBwcmVzZXJ2ZU1vZHVsZXM6IHRydWUsXHJcbiAgICAgIHByZXNlcnZlTW9kdWxlc1Jvb3Q6ICcuLycsXHJcbiAgICAgIC8vIHByZXNlcnZlRW50cnlTaWduYXR1cmVzOiAnYWxsb3ctZXh0ZW5zaW9uJyxcclxuICAgIH0sXHJcbiAgXSxcclxufSBhcyBhbnk7XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnOiBVc2VyQ29uZmlnRXhwb3J0ID0ge1xyXG4gIGRlZmluZToge1xyXG4gICAgX19WVUVfUFJPRF9IWURSQVRJT05fTUlTTUFUQ0hfREVUQUlMU19fOiAndHJ1ZSdcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgJ0B1dGlscyc6IHJlc29sdmUoX19kaXJuYW1lLCAndXRpbHMnKSxcclxuICAgICAgJ0BlbnVtcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnZW51bXMnKSxcclxuICAgICAgJ0BmdHlwZXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ2Z0eXBlcycpLFxyXG4gICAgICAnQGZzdHlsZXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3N0eWxlcycpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgdnVlSnN4KCksXHJcbiAgICBWdWVTZXR1cEV4dGVuZCgpLFxyXG4gICAgVW5vQ1NTKCksXHJcbiAgICBkdHMoeyByb2xsdXBUeXBlczogdHJ1ZSB9KSxcclxuICAgIERlZmluZU9wdGlvbnMoKSBhcyBhbnksXHJcbiAgXSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgIHBvcnQ6IDg0NDQsXHJcbiAgICBvcGVuOiBmYWxzZSxcclxuICAgIGh0dHBzOiBmYWxzZSBhcyB1bmtub3duIGFzIFNlcnZlck9wdGlvbnNbJ2h0dHBzJ10sIC8vIFx1NjYzRVx1NUYwRlx1NjMwN1x1NUI5QVx1N0M3Qlx1NTc4QlxyXG4gIH0sXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIHNjc3M6IHtcclxuICAgICAgICBhcGk6ICdtb2Rlcm4tY29tcGlsZXInLFxyXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQHVzZSBcIkBmc3R5bGVzL2dsb2JhbFwiO2AsXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgdGFyZ2V0OiAnbW9kdWxlcycsXHJcbiAgICByb2xsdXBPcHRpb25zLFxyXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcclxuICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogdHJ1ZSxcclxuICAgIGxpYjoge1xyXG4gICAgICBlbnRyeTogJy4vc3JjL2VudHJ5LnRzJyxcclxuICAgICAgbmFtZTogJ0ZpdFVJJyxcclxuICAgICAgZmlsZU5hbWU6ICdmaXR1aScsXHJcbiAgICB9LFxyXG4gICAgb3V0RGlyOiAnLi9kaXN0JyxcclxuICB9LFxyXG4gIC8vIHRlc3Q6IHtcclxuICAvLyAgIGdsb2JhbHM6IHRydWUsXHJcbiAgLy8gICBlbnZpcm9ubWVudDogJ2hhcHB5LWRvbScsXHJcbiAgLy8gICB0cmFuc2Zvcm1Nb2RlOiB7XHJcbiAgLy8gICAgIHdlYjogWy8uW3RqXXN4JC9dLFxyXG4gIC8vICAgfSxcclxuICAvLyB9LFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoY29uZmlnKSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcQ29kZVNwYWNlXFxcXEZpdFVJXFxcXHBhY2thZ2VzXFxcXGZpdC11aVxcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXENvZGVTcGFjZVxcXFxGaXRVSVxcXFxwYWNrYWdlc1xcXFxmaXQtdWlcXFxcY29uZmlnXFxcXHVub2Nzcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovQ29kZVNwYWNlL0ZpdFVJL3BhY2thZ2VzL2ZpdC11aS9jb25maWcvdW5vY3NzLnRzXCI7aW1wb3J0IHsgcHJlc2V0VW5vLCBwcmVzZXRBdHRyaWJ1dGlmeSwgcHJlc2V0SWNvbnMgfSBmcm9tICd1bm9jc3MnXHJcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbi8vIGltcG9ydCB0eXBlIHsgSWNvbnNPcHRpb25zIH0gZnJvbSAnQHVub2Nzcy9wcmVzZXQtaWNvbnMnXHJcbmltcG9ydCAgdHJhbnNmb3JtZXJEaXJlY3RpdmVzIGZyb20gJ0B1bm9jc3MvdHJhbnNmb3JtZXItZGlyZWN0aXZlcydcclxuaW1wb3J0IHsgYWxsSWNvblNhZmVsaXN0IH0gZnJvbSAnLi4vdXRpbHMvZmljb24nXHJcbmNvbnN0IGNvbG9ycyA9IFtcclxuICAnd2hpdGUnLFxyXG4gICdibGFjaycsXHJcbiAgJ2dyYXknLFxyXG4gICdyZWQnLFxyXG4gICd5ZWxsb3cnLFxyXG4gICdncmVlbicsXHJcbiAgJ2JsdWUnLFxyXG4gICdpbmRpZ28nLFxyXG4gICdwdXJwbGUnLFxyXG4gICdwaW5rJyxcclxuXVxyXG5cclxuY29uc3Qgc2FmZWxpc3QgPSBbXHJcbiAgLi4uY29sb3JzLm1hcCgodikgPT4gYGJnLSR7dn0tNTAwYCksXHJcbiAgLi4uY29sb3JzLm1hcCgodikgPT4gYGhvdmVyOmJnLSR7dn0tNzAwYCksXHJcbiAgLi4uYWxsSWNvblNhZmVsaXN0LFxyXG5dXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PlxyXG4gIFVub2Nzcyh7XHJcbiAgICBzYWZlbGlzdCxcclxuICAgIHByZXNldHM6IFtcclxuICAgICAgcHJlc2V0VW5vKCksXHJcbiAgICAgIHByZXNldEF0dHJpYnV0aWZ5KCksXHJcbiAgICAgIHByZXNldEljb25zKHtcclxuICAgICAgICBwcmVmaXg6ICdpLScsXHJcbiAgICAgICAgZXh0cmFQcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgIF0sXHJcbiAgICAvLyB0cmFuc2Zvcm1DU1M6IHRydWUsXHJcbiAgICB0cmFuc2Zvcm1lcnM6IFtcclxuICAgICAgdHJhbnNmb3JtZXJEaXJlY3RpdmVzKClcclxuICAgIF1cclxuICB9KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXENvZGVTcGFjZVxcXFxGaXRVSVxcXFxwYWNrYWdlc1xcXFxmaXQtdWlcXFxcdXRpbHNcXFxcZmljb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXENvZGVTcGFjZVxcXFxGaXRVSVxcXFxwYWNrYWdlc1xcXFxmaXQtdWlcXFxcdXRpbHNcXFxcZmljb25cXFxcbG9nb19pY29uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9Db2RlU3BhY2UvRml0VUkvcGFja2FnZXMvZml0LXVpL3V0aWxzL2ZpY29uL2xvZ29faWNvbi50c1wiOy8qKlxyXG4gKiBAZGVwcmVjYXRlZCBsb2dvXHU3NkY4XHU1MTczXHU1NkZFXHU2ODA3XHJcbiAqIEBhdXRob3IgXHU1OTI5XHU3NTRDXHU3QTBCXHU1RThGXHU1NDU4XHJcbiAqL1xyXG5pbXBvcnQgdHlwZSB7IEljb25UeXBlIH0gZnJvbSAnLi9pY29uX3R5cGUnXHJcbmNvbnN0IGxvZ29BcnIgPSBbXHJcbiAgJ2dvb2dsZScsXHJcbiAgJ2JhaWR1JyxcclxuICAnYXBwbGUnLFxyXG4gICdnaXRodWInLFxyXG4gICd0eXBlc2NyaXB0JyxcclxuICAnYW5kcm9pZCcsXHJcbiAgJ3dpbmRvd3MnLFxyXG4gICdlZGdlJ1xyXG5dIGFzIGNvbnN0XHJcbmNvbnN0IGxvZ29PYmo6SWNvblR5cGUgPSB7fVxyXG5cclxubG9nb0Fyci5mb3JFYWNoKCh2YWwpPT57XHJcbiAgbG9nb09ialt2YWxdID0gYGktYnhsLSR7dmFsfWBcclxufSlcclxuXHJcbmV4cG9ydCB0eXBlIExvZ29JY29uVmFsdWVzID0gdHlwZW9mIGxvZ29BcnJbbnVtYmVyXTtcclxuZXhwb3J0IGNvbnN0IGxvZ29TYWZlbGlzdCA9IGxvZ29BcnIubWFwKHZhbD0+YGktYnhsLSR7dmFsfWApXHJcbmV4cG9ydCAgeyBsb2dvT2JqIH0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXENvZGVTcGFjZVxcXFxGaXRVSVxcXFxwYWNrYWdlc1xcXFxmaXQtdWlcXFxcdXRpbHNcXFxcZmljb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXENvZGVTcGFjZVxcXFxGaXRVSVxcXFxwYWNrYWdlc1xcXFxmaXQtdWlcXFxcdXRpbHNcXFxcZmljb25cXFxcbW9ub19pY29uX2Fyci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovQ29kZVNwYWNlL0ZpdFVJL3BhY2thZ2VzL2ZpdC11aS91dGlscy9maWNvbi9tb25vX2ljb25fYXJyLnRzXCI7ZXhwb3J0IGRlZmF1bHQgIFtcclxuICBcImFkZFwiLFxyXG4gIFwiYXJjaGl2ZVwiLFxyXG4gIFwiYXJyb3ctZG93blwiLFxyXG4gIFwiYXJyb3ctbGVmdC1kb3duXCIsXHJcbiAgXCJhcnJvdy1sZWZ0LXVwXCIsXHJcbiAgXCJhcnJvdy1sZWZ0XCIsXHJcbiAgXCJhcnJvdy1yaWdodC1kb3duXCIsXHJcbiAgXCJhcnJvdy1yaWdodC11cFwiLFxyXG4gIFwiYXJyb3ctcmlnaHRcIixcclxuICBcImFycm93LXVwXCIsXHJcbiAgXCJhdHRhY2htZW50XCIsXHJcbiAgXCJiYWNrc3BhY2VcIixcclxuICBcImJhblwiLFxyXG4gIFwiYmFyLWNoYXJ0LWFsdFwiLFxyXG4gIFwiYmFyLWNoYXJ0XCIsXHJcbiAgXCJib2FyZFwiLFxyXG4gIFwiYm9sZFwiLFxyXG4gIFwiYm9va1wiLFxyXG4gIFwiYm9va21hcmtcIixcclxuICBcImNhbGVuZGFyXCIsXHJcbiAgXCJjYWxsXCIsXHJcbiAgXCJjYW1lcmFcIixcclxuICBcImNhcmV0LWRvd25cIixcclxuICBcImNhcmV0LWxlZnRcIixcclxuICBcImNhcmV0LXJpZ2h0XCIsXHJcbiAgXCJjYXJldC11cFwiLFxyXG4gIFwiY2hlY2tcIixcclxuICBcImNoZXZyb24tZG91YmxlLWRvd25cIixcclxuICBcImNoZXZyb24tZG91YmxlLWxlZnRcIixcclxuICBcImNoZXZyb24tZG91YmxlLXJpZ2h0XCIsXHJcbiAgXCJjaGV2cm9uLWRvdWJsZS11cFwiLFxyXG4gIFwiY2hldnJvbi1kb3duXCIsXHJcbiAgXCJjaGV2cm9uLWxlZnRcIixcclxuICBcImNoZXZyb24tcmlnaHRcIixcclxuICBcImNoZXZyb24tdXBcIixcclxuICBcImNpcmNsZS1hZGRcIixcclxuICBcImNpcmNsZS1hcnJvdy1kb3duXCIsXHJcbiAgXCJjaXJjbGUtYXJyb3ctbGVmdFwiLFxyXG4gIFwiY2lyY2xlLWFycm93LXJpZ2h0XCIsXHJcbiAgXCJjaXJjbGUtYXJyb3ctdXBcIixcclxuICBcImNpcmNsZS1jaGVja1wiLFxyXG4gIFwiY2lyY2xlLWVycm9yXCIsXHJcbiAgXCJjaXJjbGUtaGVscFwiLFxyXG4gIFwiY2lyY2xlLWluZm9ybWF0aW9uXCIsXHJcbiAgXCJjaXJjbGUtcmVtb3ZlXCIsXHJcbiAgXCJjaXJjbGUtd2FybmluZ1wiLFxyXG4gIFwiY2lyY2xlXCIsXHJcbiAgXCJjbGlwYm9hcmQtY2hlY2tcIixcclxuICBcImNsaXBib2FyZC1saXN0XCIsXHJcbiAgXCJjbGlwYm9hcmRcIixcclxuICBcImNsb2NrXCIsXHJcbiAgXCJjbG9zZVwiLFxyXG4gIFwiY2xvdWQtZG93bmxvYWRcIixcclxuICBcImNsb3VkLXVwbG9hZFwiLFxyXG4gIFwiY2xvdWRcIixcclxuICBcImNsb3VkeVwiLFxyXG4gIFwiY29tbWVudFwiLFxyXG4gIFwiY29tcGFzc1wiLFxyXG4gIFwiY29tcHV0ZXJcIixcclxuICBcImNvcHlcIixcclxuICBcImNyZWRpdC1jYXJkXCIsXHJcbiAgXCJkYXRhYmFzZVwiLFxyXG4gIFwiZGVsZXRlLWFsdFwiLFxyXG4gIFwiZGVsZXRlXCIsXHJcbiAgXCJkb2N1bWVudC1hZGRcIixcclxuICBcImRvY3VtZW50LWNoZWNrXCIsXHJcbiAgXCJkb2N1bWVudC1kb3dubG9hZFwiLFxyXG4gIFwiZG9jdW1lbnQtZW1wdHlcIixcclxuICBcImRvY3VtZW50LXJlbW92ZVwiLFxyXG4gIFwiZG9jdW1lbnRcIixcclxuICBcImRvd25sb2FkXCIsXHJcbiAgXCJkcmFnXCIsXHJcbiAgXCJkcm9wXCIsXHJcbiAgXCJlZGl0LWFsdFwiLFxyXG4gIFwiZWRpdFwiLFxyXG4gIFwiZW1haWxcIixcclxuICBcImVudGVyXCIsXHJcbiAgXCJleHBhbmRcIixcclxuICBcImV4cG9ydFwiLFxyXG4gIFwiZXh0ZXJuYWwtbGlua1wiLFxyXG4gIFwiZXllLW9mZlwiLFxyXG4gIFwiZXllXCIsXHJcbiAgXCJmYXZvcml0ZVwiLFxyXG4gIFwiZmlsdGVyLTFcIixcclxuICBcImZpbHRlci1hbHRcIixcclxuICBcImZpbHRlclwiLFxyXG4gIFwiZmxhZ1wiLFxyXG4gIFwiZm9nXCIsXHJcbiAgXCJmb2xkZXItYWRkXCIsXHJcbiAgXCJmb2xkZXItY2hlY2tcIixcclxuICBcImZvbGRlci1kb3dubG9hZFwiLFxyXG4gIFwiZm9sZGVyLXJlbW92ZVwiLFxyXG4gIFwiZm9sZGVyXCIsXHJcbiAgXCJncmlkXCIsXHJcbiAgXCJoZWFydFwiLFxyXG4gIFwiaG9tZVwiLFxyXG4gIFwiaW1hZ2VcIixcclxuICBcImluYm94XCIsXHJcbiAgXCJpdGFsaWNcIixcclxuICBcImxhcHRvcFwiLFxyXG4gIFwibGF5ZXJzXCIsXHJcbiAgXCJsYXlvdXRcIixcclxuICBcImxpbmstYWx0XCIsXHJcbiAgXCJsaW5rXCIsXHJcbiAgXCJsaXN0XCIsXHJcbiAgXCJsb2NhdGlvblwiLFxyXG4gIFwibG9ja1wiLFxyXG4gIFwibG9nLWluXCIsXHJcbiAgXCJsb2ctb3V0XCIsXHJcbiAgXCJtYXBcIixcclxuICBcIm1lZ2FwaG9uZVwiLFxyXG4gIFwibWVudVwiLFxyXG4gIFwibWVzc2FnZS1hbHRcIixcclxuICBcIm1lc3NhZ2VcIixcclxuICBcIm1pbmltaXplXCIsXHJcbiAgXCJtb2JpbGVcIixcclxuICBcIm1vb25cIixcclxuICBcIm5leHRcIixcclxuICBcIm5vdGlmaWNhdGlvbi1vZmZcIixcclxuICBcIm5vdGlmaWNhdGlvblwiLFxyXG4gIFwib3B0aW9ucy1ob3Jpem9udGFsXCIsXHJcbiAgXCJvcHRpb25zLXZlcnRpY2FsXCIsXHJcbiAgXCJwYXVzZVwiLFxyXG4gIFwicGVuXCIsXHJcbiAgXCJwZXJjZW50YWdlXCIsXHJcbiAgXCJwaW5cIixcclxuICBcInBsYXlcIixcclxuICBcInByZXZpb3VzXCIsXHJcbiAgXCJwcmludFwiLFxyXG4gIFwicmFpblwiLFxyXG4gIFwicmVmcmVzaFwiLFxyXG4gIFwicmVtb3ZlXCIsXHJcbiAgXCJyZW9yZGVyLWFsdFwiLFxyXG4gIFwicmVvcmRlclwiLFxyXG4gIFwicmVwZWF0XCIsXHJcbiAgXCJzYXZlXCIsXHJcbiAgXCJzZWFyY2hcIixcclxuICBcInNlbGVjdFwiLFxyXG4gIFwic2VuZFwiLFxyXG4gIFwic2V0dGluZ3NcIixcclxuICBcInNoYXJlXCIsXHJcbiAgXCJzaG9wcGluZy1jYXJ0LWFkZFwiLFxyXG4gIFwic2hvcHBpbmctY2FydFwiLFxyXG4gIFwic2h1ZmZsZVwiLFxyXG4gIFwic25vd1wiLFxyXG4gIFwic25vd2ZsYWtlXCIsXHJcbiAgXCJzb3J0XCIsXHJcbiAgXCJzcGVha2Vyc1wiLFxyXG4gIFwic3RvcFwiLFxyXG4gIFwic3Rvcm1cIixcclxuICBcInN0cmlrZXRocm91Z2hcIixcclxuICBcInN1blwiLFxyXG4gIFwic3VucmlzZVwiLFxyXG4gIFwic3Vuc2V0XCIsXHJcbiAgXCJzd2l0Y2hcIixcclxuICBcInRhYmxlXCIsXHJcbiAgXCJ0YWJsZXRcIixcclxuICBcInRhZ1wiLFxyXG4gIFwidGVtcGVyYXR1cmVcIixcclxuICBcInRleHRcIixcclxuICBcInRocmVlLXJvd3NcIixcclxuICBcInR3by1jb2x1bW5zXCIsXHJcbiAgXCJ0d28tcm93c1wiLFxyXG4gIFwidW5kZXJsaW5lXCIsXHJcbiAgXCJ1bmRvXCIsXHJcbiAgXCJ1bmxvY2tcIixcclxuICBcInVzZXItYWRkXCIsXHJcbiAgXCJ1c2VyLWNoZWNrXCIsXHJcbiAgXCJ1c2VyLXJlbW92ZVwiLFxyXG4gIFwidXNlclwiLFxyXG4gIFwidXNlcnNcIixcclxuICBcInZvbHVtZS1vZmZcIixcclxuICBcInZvbHVtZS11cFwiLFxyXG4gIFwid2FybmluZ1wiLFxyXG4gIFwid2ViY2FtXCIsXHJcbiAgXCJ3aW5kXCIsXHJcbiAgXCJ3aW5kb3dcIixcclxuICBcInpvb20taW5cIixcclxuICBcInpvb20tb3V0XCJcclxuXSBhcyBjb25zdDsiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXENvZGVTcGFjZVxcXFxGaXRVSVxcXFxwYWNrYWdlc1xcXFxmaXQtdWlcXFxcdXRpbHNcXFxcZmljb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXENvZGVTcGFjZVxcXFxGaXRVSVxcXFxwYWNrYWdlc1xcXFxmaXQtdWlcXFxcdXRpbHNcXFxcZmljb25cXFxcbW9ub19pb2NuLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9Db2RlU3BhY2UvRml0VUkvcGFja2FnZXMvZml0LXVpL3V0aWxzL2ZpY29uL21vbm9faW9jbi50c1wiO2ltcG9ydCB0eXBlIHsgSWNvblR5cGUgfSBmcm9tICcuL2ljb25fdHlwZSdcclxuaW1wb3J0IG1vbm9BcnIgZnJvbSAnLi9tb25vX2ljb25fYXJyJ1xyXG5jb25zdCBtb25vSWNvbiA9IFsuLi5tb25vQXJyXVxyXG5jb25zdCBtb25vT2JqOkljb25UeXBlID0ge31cclxuXHJcbm1vbm9JY29uLmZvckVhY2goKGl0ZW0pID0+IHttb25vT2JqW2l0ZW1dID0gYGktbWktJHtpdGVtfWB9KVxyXG5leHBvcnQgdHlwZSBNb25vSWNvblZhbHVlcyA9IHR5cGVvZiBtb25vSWNvbltudW1iZXJdXHJcbmV4cG9ydCBjb25zdCBtb25vU2FmZWxpc3QgPSBtb25vSWNvbi5tYXAoKGl0ZW0pID0+IGBpLW1pLSR7aXRlbX1gKVxyXG5leHBvcnQgeyBtb25vT2JqIH0gIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxDb2RlU3BhY2VcXFxcRml0VUlcXFxccGFja2FnZXNcXFxcZml0LXVpXFxcXHV0aWxzXFxcXGZpY29uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxDb2RlU3BhY2VcXFxcRml0VUlcXFxccGFja2FnZXNcXFxcZml0LXVpXFxcXHV0aWxzXFxcXGZpY29uXFxcXGdvb2dsZV9pY29uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9Db2RlU3BhY2UvRml0VUkvcGFja2FnZXMvZml0LXVpL3V0aWxzL2ZpY29uL2dvb2dsZV9pY29uLnRzXCI7LyoqXHJcbiAqIEBkZXByZWNhdGVkIGxvZ29cdTc2RjhcdTUxNzNcdTU2RkVcdTY4MDdcclxuICogQGF1dGhvciBcdTU5MjlcdTc1NENcdTdBMEJcdTVFOEZcdTU0NThcclxuICovXHJcbmltcG9ydCB0eXBlIHsgSWNvblR5cGUgfSBmcm9tICcuL2ljb25fdHlwZSdcclxuY29uc3QgZ29vZ2xlQXJyID0gW1xyXG4gICdiYXNlbGluZS1jb2RlJyxcclxuICAnYmFzZWxpbmUtY29kZS1vZmYnLFxyXG4gICdiYXNlbGluZS1xci1jb2RlJyxcclxuICAnYmFzZWxpbmUtcXItY29kZS1zY2FubmVyJyxcclxuICAnYmFzZWxpbmUtZnVsbHNjcmVlbicsXHJcbiAgJ2Jhc2VsaW5lLWZ1bGxzY3JlZW4tZXhpdCcsXHJcbl0gYXMgY29uc3RcclxuY29uc3QgZ29vZ2xlT2JqOkljb25UeXBlID0ge31cclxuXHJcbmdvb2dsZUFyci5mb3JFYWNoKCh2YWwpPT57XHJcbiAgICBnb29nbGVPYmpbdmFsXSA9IGBpLWljLSR7dmFsfWBcclxufSlcclxuXHJcbmV4cG9ydCB0eXBlIEdvb2dsZUljb25WYWx1ZXMgPSB0eXBlb2YgZ29vZ2xlQXJyW251bWJlcl07XHJcbmV4cG9ydCBjb25zdCBnb29nbGVTYWZlbGlzdCA9IGdvb2dsZUFyci5tYXAodmFsPT5gaS1pYy0ke3ZhbH1gKVxyXG5leHBvcnQgIHsgZ29vZ2xlT2JqIH0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXENvZGVTcGFjZVxcXFxGaXRVSVxcXFxwYWNrYWdlc1xcXFxmaXQtdWlcXFxcdXRpbHNcXFxcZmljb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXENvZGVTcGFjZVxcXFxGaXRVSVxcXFxwYWNrYWdlc1xcXFxmaXQtdWlcXFxcdXRpbHNcXFxcZmljb25cXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L0NvZGVTcGFjZS9GaXRVSS9wYWNrYWdlcy9maXQtdWkvdXRpbHMvZmljb24vaW5kZXgudHNcIjtcclxuLyoqXHJcbiAqICBAZGVzY3JpcHRpb24gXHU2NTc0XHU3NDA2XHU2MjQwXHU2NzA5XHU1NkZFXHU2ODA3XHU1MTg1XHU1QkI5XHJcbiAqICBAYXV0aG9yIFx1NTkyOVx1NzU0Q1x1N0EwQlx1NUU4Rlx1NTQ1OFxyXG4gKi9cclxuXHJcbi8qKiBsb2dvXHU3NkY4XHU1MTczXHU3Njg0XHU1Qjg5XHU1MTY4XHU1MjE3XHU4ODY4XHVGRjBDXHU0RUU1XHU1M0NBbG9nb1x1NUJGOVx1OEM2MVx1OTZDNlx1NTQwOCAqL1xyXG5pbXBvcnQgeyBsb2dvU2FmZWxpc3QsIGxvZ29PYmogfSBmcm9tICcuL2xvZ29faWNvbidcclxuaW1wb3J0IHsgbW9ub1NhZmVsaXN0LCBtb25vT2JqIH0gZnJvbSAnLi9tb25vX2lvY24nXHJcbmltcG9ydCB7IGdvb2dsZVNhZmVsaXN0LCBnb29nbGVPYmp9IGZyb20gJy4vZ29vZ2xlX2ljb24nXHJcblxyXG5cclxuLyoqIGxvZ29cdTc2RjhcdTUxNzNcdTU2RkVcdTY4MDdcdTc2ODRcdTgwNTRcdTU0MDhcdTdDN0JcdTU3OEIgKi9cclxuaW1wb3J0IHR5cGUgeyBMb2dvSWNvblZhbHVlcyB9IGZyb20gJy4vbG9nb19pY29uJ1xyXG5pbXBvcnQgdHlwZSB7IE1vbm9JY29uVmFsdWVzIH0gZnJvbSAnLi9tb25vX2lvY24nO1xyXG5pbXBvcnQgdHlwZSB7IEdvb2dsZUljb25WYWx1ZXMgfSBmcm9tICcuL2dvb2dsZV9pY29uJztcclxuXHJcblxyXG5leHBvcnQgdHlwZSBhbGxJY29uVHlwZSA9IExvZ29JY29uVmFsdWVzIHwgTW9ub0ljb25WYWx1ZXMgfCBHb29nbGVJY29uVmFsdWVzO1xyXG5leHBvcnQgY29uc3QgYWxsSWNvblNhZmVsaXN0ID0gWy4uLmxvZ29TYWZlbGlzdCwuLi5tb25vU2FmZWxpc3QsLi4uZ29vZ2xlU2FmZWxpc3RdXHJcbmV4cG9ydCBjb25zdCBhbGxJY29uT2JqID0gey4uLmxvZ29PYmosLi4ubW9ub09iaiwuLi5nb29nbGVPYmp9Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUyxTQUFTLG9CQUFzQztBQUVqVixTQUFTLGVBQWU7QUFDeEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLG9CQUFvQjs7O0FDTG9SLFNBQVMsV0FBVyxtQkFBbUIsbUJBQW1CO0FBQ3pXLE9BQU8sWUFBWTtBQUVuQixPQUFRLDJCQUEyQjs7O0FDRW5DLElBQU0sVUFBVTtBQUFBLEVBQ2Q7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFDQSxJQUFNLFVBQW1CLENBQUM7QUFFMUIsUUFBUSxRQUFRLENBQUMsUUFBTTtBQUNyQixVQUFRLEdBQUcsSUFBSSxTQUFTLEdBQUc7QUFDN0IsQ0FBQztBQUdNLElBQU0sZUFBZSxRQUFRLElBQUksU0FBSyxTQUFTLEdBQUcsRUFBRTs7O0FDdEJtUixJQUFPLHdCQUFTO0FBQUEsRUFDNVY7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVB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
