import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    cors: false,
    fs: {
      strict: true,
      deny: ['**/.*'],
    },
   proxy: {
  '/JMSServlet': {
    target: 'https://coe.cuetrans.com',
    changeOrigin: true,
    secure: true,
    rewrite: path => `/CueTrans${path}`,  // Rewrites /JMSServlet → /CueTrans/JMSServlet
    configure: (proxy) => {
      proxy.on('proxyRes', (proxyRes) => {
        const cookies = proxyRes.headers['set-cookie'];
        if (cookies) {
          const newCookies = cookies.map((cookie: string) =>
            cookie.replace(/Path=\/CueTrans\//i, 'Path=/')
          );
          proxyRes.headers['set-cookie'] = newCookies;
        }
      });
    }
  }
}

  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
