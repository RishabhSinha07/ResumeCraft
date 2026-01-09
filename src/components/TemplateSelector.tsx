import { motion } from 'framer-motion'
import { useResumeStore } from '../store/resumeStore'
import { Card } from './ui/card'
import { Check } from 'lucide-react'
import { cn } from '../lib/utils'

const templates = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, simple, and modern',
    preview: 'Lightweight design with ample whitespace',
  },
  {
    id: 'tech-focused',
    name: 'Tech-Focused',
    description: 'Bold and technical',
    preview: 'Monospace fonts, highlighted skills',
  },
  {
    id: 'elegant-professional',
    name: 'Elegant Professional',
    description: 'Sophisticated and refined',
    preview: 'Serif fonts, classic typography',
  },
  {
    id: 'modern-creative',
    name: 'Modern Creative',
    description: 'Fresh and dynamic',
    preview: 'Two-column layout with sidebar and accents',
  },
  {
    id: 'executive',
    name: 'Executive Impact',
    description: 'High-level and authoritative',
    preview: 'Strong hierarchy, focus on results',
  },
  {
    id: 'thin-modern',
    name: 'Thin Modern',
    description: 'Elegant thin fonts with summary at top',
    preview: 'Thin fonts, clean layout with summary',
  },
  {
    id: 'strategic-impact',
    name: 'Strategic Impact',
    description: 'Grid-based layout for high-achievers',
    preview: 'Three-column achievements, condensed text',
  },
]

export default function TemplateSelector() {
  const { resumeData, setTemplate } = useResumeStore()
  const currentTemplate = resumeData.template || 'minimal'

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Template</h3>
        <p className="text-sm text-muted-foreground">
          Select a design that matches your style
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={cn(
                'cursor-pointer transition-all border-2 p-4',
                currentTemplate === template.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
              onClick={() => setTemplate(template.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-base">{template.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {template.description}
                  </p>
                </div>
                {currentTemplate === template.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </motion.div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {template.preview}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

