// Types declaration for Ronin global variable
declare global {
  interface Window {
    ronin: {
      provider: ethers.providers.ExternalProvider
      roninEvent: EventListener
    }
  }
}

export {}
