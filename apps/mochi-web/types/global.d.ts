interface Window {
  ethereum: any
  web3: any
  phantom: any
  glow: any
  ronin: any
  martian: any
  suiet: any
}

declare module 'browser-string-hexer' {
  export default function hexer(msg: string): string
}
