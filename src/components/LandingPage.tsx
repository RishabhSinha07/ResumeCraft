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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built for Top Candidates</h2>
            <p className="text-muted-foreground">
              See how a real student resume transforms with our templates.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border/50 bg-white p-8 md:p-12 shadow-2xl overflow-hidden relative"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <div className="space-y-6 text-left">
              {/* Header */}
              <div className="border-b border-gray-100 pb-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Alex Rivera</h1>
                <div className="flex flex-wrap gap-x-3 text-sm text-gray-500 font-medium">
                  <span>San Francisco, CA</span>
                  <span className="text-gray-300">•</span>
                  <span>alex.rivera@example.com</span>
                  <span className="text-gray-300">•</span>
                  <span>linkedin.com/in/arivera</span>
                  <span className="text-gray-300">•</span>
                  <span>github.com/arivera</span>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">Education</h3>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900">University of Washington</h4>
                  <span className="text-sm text-gray-500">May 2025</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm text-gray-700">B.S. Computer Science</p>
                  <span className="text-sm text-gray-500 font-medium">GPA: 3.8/4.0</span>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-4">Experience</h3>
                
                <div className="mb-5">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900">Vercel</h4>
                    <span className="text-sm text-gray-500">June 2024 – Aug 2024</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Software Engineering Intern</p>
                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-gray-600 leading-relaxed">
                    <li>Optimized Next.js image optimization pipeline, reducing First Contentful Paint (FCP) by <span className="font-semibold text-gray-900">25%</span> for 10k+ deployments.</li>
                    <li>Implemented a new caching strategy using Redis, decreasing database load by <span className="font-semibold text-gray-900">40%</span> during peak traffic.</li>
                    <li>Collaborated with design team to migrate legacy components to a new internal design system.</li>
                  </ul>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">Projects</h3>
                
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900">CloudScale Monitor</h4>
                    <span className="text-sm text-gray-500">github.com/arivera/cloudscale</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-gray-600 leading-relaxed">
                    <li>Developed a serverless infrastructure monitoring tool using AWS Lambda, DynamoDB, and TypeScript.</li>
                    <li>Architected an event-driven notification system that alerts users via Slack/Email within 500ms.</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
