import path from "path"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const apiBase = env.VITE_API_BASE_URL ?? "http://localhost:8000"

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      // Proxy is only active during `npm run dev`.
      // In production builds the VITE_API_BASE_URL is inlined into the bundle.
      proxy: {
        "/auth": { target: apiBase, changeOrigin: true, secure: true },
        "/zip-url": { target: apiBase, changeOrigin: true, secure: true },
        "/users": { target: apiBase, changeOrigin: true, secure: true },
      },
    },
  }
})
