import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  splitting: false,
  target: 'es2019',
  format: ['cjs', 'esm'],
  noExternal: ['@solana/web3.js', 'browser-string-hexer'],
})
