import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

export default defineConfig((options: Options) => ({
  entry: ['src/**/*.{ts,tsx}', '!src/**/*.stories.{ts,tsx}'],
  treeshake: true,
  splitting: true,
  target: 'es2019',
  dts: true,
  minify: true,
  clean: true,
  format: ['cjs', 'esm'],
  external: ['react'],
  ...options,
}))
