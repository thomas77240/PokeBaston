import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // On pointe précisément vers le setup du frontend
    setupFiles: [path.resolve(__dirname, './frontend/src/test/setup.ts')], 
    // On dit à Vitest de ne chercher les tests QUE dans le frontend
    include: ['frontend/src/test/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/tests/**'],
  },
  resolve: {
    alias: {
      // L'alias @ doit pointer vers le src du frontend depuis la racine
      '@': path.resolve(__dirname, './frontend/src'),
      // On force l'utilisation du React de la racine pour éviter le "Double React"
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, './node_modules/react/jsx-runtime'),
    },
  },
});