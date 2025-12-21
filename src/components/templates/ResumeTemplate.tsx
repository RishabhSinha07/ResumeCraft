import type { ResumeData } from '../../types/resume'
import { MinimalTemplate } from './MinimalTemplate'
import { TechFocusedTemplate } from './TechFocusedTemplate'
import { ElegantProfessionalTemplate } from './ElegantProfessionalTemplate'

interface ResumeTemplateProps {
  data: ResumeData
}

export function ResumeTemplate({ data }: ResumeTemplateProps) {
  const { template } = data

  switch (template) {
    case 'minimal':
      return <MinimalTemplate data={data} />
    case 'tech-focused':
      return <TechFocusedTemplate data={data} />
    case 'elegant-professional':
      return <ElegantProfessionalTemplate data={data} />
    default:
      return <MinimalTemplate data={data} />
  }
}
