import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import EnvironmentPlugin from 'vite-plugin-environment';
import path from 'path';
import sass from 'sass';

export default defineConfig({
  plugins: [react(), EnvironmentPlugin('all')],
  build: {
    outDir: './build',
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
