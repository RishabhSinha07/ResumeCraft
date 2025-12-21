import { motion } from 'framer-motion'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            ResumeCraft
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/builder')}
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>ATS-Optimized • Beautiful • Free</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight"
          >
            Create a job-ready
            <br />
            resume in minutes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Build ATS-friendly resumes that get you interviews. Used by students at FAANG companies and top startups.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              onClick={() => navigate('/builder')}
              className="group"
            >
              Build my resume
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.getElementById('preview')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              See preview
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <p className="text-sm text-muted-foreground mb-6">Trusted by students at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Netflix'].map((company, i) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-lg font-semibold"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                title: 'ATS-Optimized',
                description: 'Designed to pass Applicant Tracking Systems and get your resume seen by recruiters.',
              },
              {
                title: 'Beautiful Templates',
                description: 'Choose from modern, professional templates that stand out from the crowd.',
              },
              {
                title: 'Export as PDF',
                description: 'Download your resume as a clean, print-ready PDF in seconds.',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Animated Resume Preview */}
      <motion.div
        id="preview"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border-2 border-border/50 bg-card p-8 shadow-2xl"
          >
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <h2 className="text-3xl font-bold mb-2">John Doe</h2>
                <p className="text-muted-foreground">Software Engineering Student</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <p className="text-muted-foreground">Bachelor of Science in Computer Science</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Experience</h3>
                <p className="text-muted-foreground">Software Engineering Intern at Tech Company</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

