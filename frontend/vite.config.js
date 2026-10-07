import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_API_URL 
    ? env.VITE_API_URL.replace(/\/api\/?$/, '') 
    : 'http://localhost:8000';

  const isVercel = !!process.env.VERCEL;
  const base = process.env.BASE_URL || (isVercel ? '/' : (command === 'serve' ? '/' : '/Scriptora/'));

  return {
    base,
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
