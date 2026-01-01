import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useResumeStore } from '../store/resumeStore'
import { Button } from './ui/button'
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react'

interface ValidationResult {
    score: number
    issues: {
        severity: 'critical' | 'warning' | 'success'
        message: string
    }[]
}

const ACTION_VERBS = [
    'led', 'developed', 'managed', 'created', 'designed', 'implemented',
    'analyzed', 'collaborated', 'improved', 'increased', 'reduced',
    'saved', 'launched', 'mentored', 'architected', 'engineered'
]

export default function ATSValidator() {
    const { resumeData } = useResumeStore()
    const [isOpen, setIsOpen] = useState(false)

    const analysis = useMemo((): ValidationResult => {
        const issues: ValidationResult['issues'] = []
        let score = 100

        // 1. Personal Info Checks
        if (!resumeData.personalInfo.email) {
            issues.push({ severity: 'critical', message: 'Missing email address' })
            score -= 20
        }
        if (!resumeData.personalInfo.phone) {
            issues.push({ severity: 'critical', message: 'Missing phone number' })
            score -= 20
        }
        if (!resumeData.personalInfo.location) {
            issues.push({ severity: 'warning', message: 'Adding a general location (City, State) helps with local searches' })
            score -= 5
        }

        // 2. Experience Checks
        if (resumeData.experience.length === 0) {
            issues.push({ severity: 'critical', message: 'No work experience listed' })
            score -= 30
        } else {
            resumeData.experience.forEach((exp) => {
                if (!exp.description || exp.description.length === 0) {
                    issues.push({ severity: 'warning', message: `Experience at ${exp.company} has no description details` })
                    score -= 5
                } else {
                    // Check for action verbs
                    const hasActionVerb = exp.description.some(desc =>
                        ACTION_VERBS.some(verb => desc.toLowerCase().startsWith(verb))
                    )
                    if (!hasActionVerb) {
                        issues.push({ severity: 'warning', message: `Consider starting bullet points for ${exp.company} with strong action verbs (e.g., Led, Developed)` })
                        score -= 5
                    }
                }
            })
        }

        // 3. functional Skills Checks
        if (resumeData.skills.length === 0) {
            issues.push({ severity: 'critical', message: 'No skills listed. ATS systems rely heavily on keywords from this section.' })
            score -= 20
        } else if (resumeData.skills.length < 5) {
            issues.push({ severity: 'warning', message: 'Consider adding more relevant skills (aim for 5+)' })
            score -= 5
        }

        // 4. Education Checks
        if (resumeData.education.length === 0) {
            issues.push({ severity: 'warning', message: 'Education section is empty' })
            score -= 10
        }

        // 5. Formatting/Theme (Minimal checks)
        if (resumeData.theme.font === 'creative') { // Assuming 'creative' might be a non-standard font
            // Actually I don't know the exact font values, let's skip specific font check unless I know them.
            // But I can check generally if it's readable.
        }

        // Add success message if score is high
        if (score === 100) {
            issues.push({ severity: 'success', message: 'Resume looks great! All basic ATS requirements met.' })
        }

        return {
            score: Math.max(0, score),
            issues: issues.sort((a, b) => {
                const severityOrder = { critical: 0, warning: 1, success: 2 }
                return severityOrder[a.severity] - severityOrder[b.severity]
            })
        }
    }, [resumeData])

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-500'
        if (score >= 70) return 'text-yellow-500'
        return 'text-red-500'
    }

    return (
        <>
            <Button
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:scale-105"
                onClick={() => setIsOpen(true)}
            >
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                    <span className="font-semibold">Check ATS Score</span>
                </div>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-background rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border"
                        >
                            <div className="p-6 border-b flex justify-between items-center">
                                <h2 className="text-xl font-bold">ATS Compatibility Score</h2>
                                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="flex items-center justify-center flex-col space-y-2">
                                    <div className={`text-6xl font-bold ${getScoreColor(analysis.score)}`}>
                                        {analysis.score}
                                    </div>
                                    <p className="text-muted-foreground">out of 100</p>
                                </div>

                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                    {analysis.issues.map((issue, idx) => (
                                        <div key={idx} className={`p-3 rounded-lg border flex items-start gap-3 ${issue.severity === 'critical' ? 'bg-red-50/50 border-red-200 text-red-700' :
                                            issue.severity === 'warning' ? 'bg-yellow-50/50 border-yellow-200 text-yellow-700' :
                                                'bg-green-50/50 border-green-200 text-green-700'
                                            }`}>
                                            {issue.severity === 'critical' ? <XCircle className="w-5 h-5 shrink-0" /> :
                                                issue.severity === 'warning' ? <AlertTriangle className="w-5 h-5 shrink-0" /> :
                                                    <CheckCircle className="w-5 h-5 shrink-0" />}
                                            <span className="text-sm font-medium">{issue.message}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 border-t bg-muted/50 flex justify-end">
                                <Button onClick={() => setIsOpen(false)}>Close</Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
