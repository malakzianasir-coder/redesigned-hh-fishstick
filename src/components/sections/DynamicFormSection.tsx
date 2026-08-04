import { DynamicForm } from '@/components/forms/DynamicForm'
import { getFormById } from '@/lib/content/loaders'
import type { DynamicFormSectionData } from '@/lib/content/types'

type DynamicFormSectionProps = {
  section: DynamicFormSectionData
}

export function DynamicFormSection({ section }: DynamicFormSectionProps) {
  const form = getFormById(section.formId)
  const background = section.background === 'muted' ? 'bg-whitebg' : 'bg-white'

  if (!form) return null

  return (
    <section id={section.id} className={background}>
      <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {section.kicker ? <p className="kicker text-center">{section.kicker}</p> : null}
          {section.heading ? (
            <h2 className="text-center text-h3M font-bold text-primary-blue lg:text-h3">{section.heading}</h2>
          ) : null}
          {section.intro ? (
            <p className="text-center text-b16 leading-[150%] text-primary-blue/85">{section.intro}</p>
          ) : null}
          <DynamicForm form={form} />
        </div>
      </div>
    </section>
  )
}
