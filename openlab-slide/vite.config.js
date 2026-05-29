import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'wl-msg-reader',
      'warning',
    ],
    exclude: [
      '@cyntler/react-doc-viewer',
      'react-pdf',
      'pdfjs-dist',
    ],
  },
  ssr: {
    noExternal: [
      '@cyntler/react-doc-viewer',
      'react-pdf',
      'pdfjs-dist',
      'wl-msg-reader',
      'warning',
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
