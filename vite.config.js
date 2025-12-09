import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const externalDeps = [
  "react",
  "react-dom",
  "@mui/material",
  "@mui/icons-material",
  "@emotion/react",
  "@emotion/styled",
  "react-router-dom",
  "@mui/material/styles",
  "mui-tiptap",
  "@tiptap/starter-kit",
  "@mui/x-date-pickers",
  "@mui/x-date-pickers/AdapterDateFns",
  "crypto-js",
  "react-hot-toast",
  "react-pdf",
];

const globalsMap = {
  react: "React",
  "react-dom": "ReactDOM",
  "@mui/material": "MaterialUI",
  "@mui/material/styles": "StylesMUI",
  "@mui/icons-material": "MuiIcons",
  "@emotion/react": "EmotionReact",
  "@emotion/styled": "EmotionStyled",
  "react-router-dom": "ReactRouterDOM",
  "mui-tiptap": "TiptapMUI",
  "@tiptap/starter-kit": "TiptapStarterMUI",
  "@mui/x-date-pickers": "XDatePickerMUI",
  "@mui/x-date-pickers/AdapterDateFns": "XDatePickerAdapterMUI",
  "crypto-js": "CryptoJS",
  "react-hot-toast": "ReactHotToast",
  "react-pdf": "ReactPdf",
};

export default defineConfig(({ mode }) => {
  const isMFBundling = mode === "build-mf";

  return {
    plugins: [react(), tailwindcss()],
    build: {
      lib: {
        entry: isMFBundling ? "./src/exportReact.js" : "./src/export.jsx",
        name: "facilitesMF",
        fileName: () => `facility-bundle.js`,
        formats: [isMFBundling ? "umd" : "iife"],
      },
      rollupOptions: {
        external: isMFBundling ? externalDeps : [],
        output: {
          globals: isMFBundling ? globalsMap : {},
        },
      },
      cssCodeSplit: false,
      define: {
        "process.env": JSON.stringify({}),
      },
      outDir: isMFBundling ? "dist-mf" : "dist-standalone",
    },
    optimizeDeps: {
      exclude: isMFBundling ? externalDeps : [],
    },
  };
});
