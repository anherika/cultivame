import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ base: '/cultivame/', plugins: [react()], build: { outDir: 'dist' } });
