import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      include: [
        'src/lib/utils.ts',
        'src/validation/**/*.ts',
        'src/lib/MoviesAPI.ts',
        'src/stores/bookmarkStore.ts'
      ]
    }
  }
})
