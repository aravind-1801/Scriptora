import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_API_URL 
    ? env.VITE_API_URL.replace(/\/api\/?$/, '') 
    : 'http://localhost:8000';

  return {
    build: {
      outDir: 'dist',
      target: 'esnext'
    },
    server: {
      port: 3000,
      open: false,
      proxy: {
        '/api': {
          target,
          changeOrigin: true
        }
      }
    }
  };
});
