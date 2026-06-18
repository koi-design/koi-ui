import { defineConfig } from 'tsup'
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'

// esbuild strips a "use client" banner when bundling, so we prepend it to the
// component bundles after build to keep Next.js RSC consumers happy.
function prependUseClient(...files: string[]) {
  for (const f of files) {
    const code = readFileSync(f, 'utf8')
    if (!code.startsWith('"use client"')) writeFileSync(f, `"use client";\n${code}`)
  }
}

export default defineConfig([
  {
    // main entry + subpaths for heavy optional-peer deps
    entry: {
      index: 'src/index.ts',
      carousel: 'src/carousel.ts',
      dnd: 'src/dnd.ts',
      chart: 'src/chart.ts',
      file: 'src/file.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    treeshake: true,
    splitting: false,
    sourcemap: false,
    external: [
      'react',
      'react-dom',
      'tailwindcss',
      'embla-carousel-react',
      '@dnd-kit/core',
      '@dnd-kit/sortable',
      '@dnd-kit/utilities',
      'recharts',
      'react-dropzone',
    ],
    async onSuccess() {
      prependUseClient(
        'dist/index.js',
        'dist/index.cjs',
        'dist/carousel.js',
        'dist/carousel.cjs',
        'dist/dnd.js',
        'dist/dnd.cjs',
        'dist/chart.js',
        'dist/chart.cjs',
        'dist/file.js',
        'dist/file.cjs',
      )
      copyFileSync('src/styles/globals.css', 'dist/styles.css')
    },
  },
  {
    entry: { preset: 'src/styles/preset.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    clean: false,
    sourcemap: false,
    external: ['tailwindcss'],
  },
])
