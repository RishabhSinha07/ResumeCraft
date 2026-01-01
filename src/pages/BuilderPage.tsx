import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useResumeStore } from '../store/resumeStore'
import { Button } from '../components/ui/button'
import { ChevronLeft, ChevronRight, Download, Eye } from 'lucide-react'
import PersonalInfoStep from '../components/builder/PersonalInfoStep'
import EducationStep from '../components/builder/EducationStep'
import ExperienceStep from '../components/builder/ExperienceStep'
import ProjectsStep from '../components/builder/ProjectsStep'
import SkillsStep from '../components/builder/SkillsStep'
import AchievementsStep from '../components/builder/AchievementsStep'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import { exportToPDF } from '../utils/export'
import { Footer } from '../components/Footer'
import ATSValidator from '../components/ATSValidator'

const steps = [
  { id: 0, name: 'Personal Info', component: PersonalInfoStep },
  { id: 1, name: 'Education', component: EducationStep },
  { id: 2, name: 'Experience', component: ExperienceStep },
  { id: 3, name: 'Projects', component: ProjectsStep },
  { id: 4, name: 'Skills', component: SkillsStep },
  { id: 5, name: 'Achievements', component: AchievementsStep },
]

export default function BuilderPage() {
  const { currentStep, setCurrentStep } = useResumeStore()
  const [showPreview, setShowPreview] = useState(false)
  const CurrentStepComponent = steps[currentStep].component

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleExport = () => {
    exportToPDF()
  }

  if (showPreview) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <Button variant="ghost" onClick={() => setShowPreview(false)}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Editor
              </Button>
              <div className="flex gap-2">
                <ATSValidator />
                <Button onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <TemplateSelector />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-start p-8 bg-muted/30 min-h-screen">
          <ResumePreview />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Resume Builder</h2>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentStepComponent />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowPreview(true)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button onClick={nextStep}>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleExport}>
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="sticky top-8 h-fit space-y-6">
            {/* Template Selector */}
            <div className="rounded-2xl border bg-card p-4 shadow-lg">
              <TemplateSelector />
            </div>

            {/* Live Preview */}
            <div className="rounded-2xl border bg-card p-4 shadow-lg">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="font-semibold">Live Preview</h3>
                <div className="flex gap-2">
                  <ATSValidator />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview(true)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Full Screen
                  </Button>
                </div>
              </div>
              <div className="resume-preview-wrapper overflow-auto max-h-[800px] bg-white rounded-xl p-6">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
