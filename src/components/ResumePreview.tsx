import { forwardRef } from 'react'
import { useResumeStore } from '../store/resumeStore'
import { ResumeTemplate } from './templates/ResumeTemplate'
import '../styles/resume.css'

interface ResumePreviewProps {
  className?: string
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ className = '' }, ref) => {
    const { resumeData } = useResumeStore()

    return (
      <div
        ref={ref}
        className={`resume-a4-container ${className}`}
        data-resume-preview
      >
        <ResumeTemplate data={resumeData} />
      </div>
    )
  }
)

ResumePreview.displayName = 'ResumePreview'

export default ResumePreview
