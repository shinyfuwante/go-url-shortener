import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import 'dotenv/config';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: <number><unknown>process.env.PORT,
  },
  plugins: [react()],
})
