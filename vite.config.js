import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  plugins: [
    react(),
    {
      name: 'gltf-loader',
      transform(src, id) {
        if (/\.(gltf|glb)$/.test(id)) {
          return `export default import.meta.ROLLUP_FILE_URL_${this.emitFile({
            type: 'asset',
            name: `[name][extname]`,
            source: src,
          })};`;
        }
      },
    }
  ],
})
