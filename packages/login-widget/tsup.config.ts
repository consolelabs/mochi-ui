import { defineConfig } from 'tsup'

export default defineConfig(() => ({
  clean: true,
  target: 'es2019',
  format: ['cjs', 'esm'],
  noExternal: ['@solana/web3.js', 'browser-string-hexer'],
}))
