import type { Metadata } from 'next'

import { DynamicForm } from '@/components/forms/DynamicForm'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { getFormById } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'Contact | Hijaz Hospital',
  description: 'Contact form powered by configurable JSON form definitions.',
}

export default function ContactPage() {
  const form = getFormById('general-contact')

  if (!form) return null

  return (
    <article>
      <MarketingBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      <section className="bg-white">
        <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="mx-auto flex max-w-4xl flex-col gap-6 text-center">
            <p className="kicker">Contact</p>
            <h1 className="text-h2M font-bold text-primary-blue lg:text-h2">{form.title}</h1>
            {form.description ? <p className="text-b16 text-primary-blue/85">{form.description}</p> : null}
          </div>
          <div className="mt-8">
            <DynamicForm form={form} />
          </div>
        </div>
      </section>
    </article>
  )
}
