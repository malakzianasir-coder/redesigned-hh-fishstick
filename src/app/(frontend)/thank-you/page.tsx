import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="card mx-auto flex max-w-2xl flex-col items-center gap-4 p-8 text-center">
          <p className="kicker">Thank You</p>
          <h1 className="text-h3M font-bold text-primary-blue lg:text-h3">Your request has been received</h1>
          <p className="text-b16 text-primary-blue/85">
            If you used the mock donation flow, this was a simulated completion for UX preview.
          </p>
          <Link
            href="/donate"
            className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-primary-red px-6 text-b16 font-bold text-white transition-colors duration-300 hover:bg-primary-blue"
          >
            Return to Donate
          </Link>
        </div>
      </div>
    </section>
  )
}
