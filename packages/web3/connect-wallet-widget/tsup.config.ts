import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  splitting: false,
  target: 'es2019',
  format: ['cjs', 'esm'],
  noExternal: ['browser-string-hexer'],
  external: ['@solana/web3.js'],
})
