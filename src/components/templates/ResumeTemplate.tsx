import type { ResumeData } from '../../types/resume'
import { MinimalTemplate } from './MinimalTemplate'
import { TechFocusedTemplate } from './TechFocusedTemplate'
import { ElegantProfessionalTemplate } from './ElegantProfessionalTemplate'
import { ModernCreativeTemplate } from './ModernCreativeTemplate'
import { ExecutiveTemplate } from './ExecutiveTemplate'
import { StrategicImpactTemplate } from './StrategicImpactTemplate'

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
    case 'modern-creative':
      return <ModernCreativeTemplate data={data} />
    case 'executive':
      return <ExecutiveTemplate data={data} />
    case 'strategic-impact':
      return <StrategicImpactTemplate data={data} />
    default:
      return <MinimalTemplate data={data} />
  }
}
