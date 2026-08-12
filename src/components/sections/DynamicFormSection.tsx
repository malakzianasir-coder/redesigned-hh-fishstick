import { DynamicForm } from '@/components/forms/DynamicForm'
import { BlockHeader } from '@/components/site/BlockHeader'
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
          {section.heading ? (
            <BlockHeader kicker={section.kicker} title={section.heading} lede={section.intro} />
          ) : null}
          <DynamicForm form={form} />
        </div>
      </div>
    </section>
  )
}
