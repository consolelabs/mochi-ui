const DATA = [
  {
    title: 'Crypto native',
    description:
      'Easy token and collectible transfers across all platforms with just a few taps. Share your wallet address with a personalized QR code for quick and easy asset receiving.',
  },
  {
    title: 'No hidden fees',
    description:
      "The token transfer process is transparent, and you won't face unexpected costs during transactions. It is fully documented, so you can always see what's happening and why.",
  },
  {
    title: 'Instant transfer',
    description:
      'Enable instant token transfers, ensuring that you experience smooth and real-time transactions. It allows you to take advantage of market opportunities quickly.',
  },
  {
    title: 'Easy top-up',
    description:
      'Recharge your balance securely and conveniently in seconds, no matter where you are in the world. Mochi will help you never run out of money again.',
  },
  {
    title: 'Multi money source',
    description:
      'Mochi lets you top up your trading from multiple sources, manage funds, optimize transactions, simply pair your wallet, and connect to a range of web3 powerful applications.',
  },
  {
    title: 'Available where you need',
    description:
      'Always up-to-date balance makes it easy to stay on top of your finances. You can track your spending, see your investment performance, and make payments with confidence.',
  },
]

export default function List() {
  return (
    <section className="bg-home-gray-600 py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <ul className="grid md:grid-cols-2 gap-8 sm:gap-12">
          {DATA.map((item, index) => (
            <li key={item.title}>
              <div className="text-[#ED4257] text-lg font-semibold mb-2 sm:mb-4">
                {item.title}
              </div>
              <div className="sm:text-[17px] text-[#70707B]">
                {item.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
