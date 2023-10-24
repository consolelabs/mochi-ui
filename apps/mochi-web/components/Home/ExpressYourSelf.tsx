import Heading from './Heading'

export default function ExpressYourSelf() {
  return (
    <section className="mb-12 md:mb-24">
      <div className="container mx-auto max-w-5xl px-6">
        <Heading
          element="h2"
          title="Express yourself"
          subtitle="Adding a personal touch to your payments can make them more memorable
          and help you build stronger relationships."
        />
        <img
          src="/home/express-yourself.png"
          alt="Express yourself"
          className="w-full"
        />
      </div>
    </section>
  )
}
