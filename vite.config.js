import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        login: 'public/login.html',
        signup: 'public/signup.html'
      }
    }
  }
});
