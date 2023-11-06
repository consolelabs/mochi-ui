import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  target: 'es5',
  dts: true,
  minify: true,
  clean: true,
  entry: ['src/**/*.{ts,tsx}'],
  format: ['esm', 'cjs'],
  external: ['react'],
  ...options,
}))
