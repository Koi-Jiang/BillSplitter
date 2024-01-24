import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/BillSplitter/",
  esbuild: false,
  plugins: [
    react({ 
      tsDecorators: true, 
    }),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
    }),
    svgr({
      svgrOptions: {
        // svgr options
      },
    }),
  ],
});
