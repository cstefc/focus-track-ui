import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import * as path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build:{
        outDir:'build',
        sourcemap: false,
        minify:"esbuild"
    },
    test: {
        include: ['tests/**/*.{test,spec}.{ts,tsx}'],
        globals: true,
        setupFiles: 'tests/setup.ts',
        environment: 'jsdom',
        css: true,
        reporters: ['verbose'],
        coverage: {
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*'],
            exclude: [],
        }
    },
})