import { motion } from 'framer-motion'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { Footer } from './Footer'
import { useState } from 'react'
import { ResumeTemplate } from './templates/ResumeTemplate'
import type { ResumeData } from '../types/resume'
import { cn } from '../lib/utils'

const DUMMY_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 012-3456',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alex-rivera-tech',
    github: 'github.com/arivera-dev',
    portfolio: 'arivera.dev',
  },
  education: [
    {
      id: '1',
      school: 'University of Washington',
      degree: 'B.S.',
      field: 'Computer Science',
      startDate: 'Sept 2021',
      endDate: 'May 2025',
      gpa: '3.92',
      description: 'Relevant Coursework: Distributed Systems, Operating Systems, Machine Learning, Data Structures & Algorithms.',
    },
    {
      id: '2',
      school: 'Stanford University (Online)',
      degree: 'Professional Certificate',
      field: 'Advanced Software Architecture',
      startDate: 'June 2023',
      endDate: 'Aug 2023',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'Vercel',
      position: 'Software Engineering Intern',
      location: 'San Francisco, CA',
      startDate: 'June 2024',
      endDate: 'Aug 2024',
      current: false,
      description: [
        'Optimized Next.js image optimization pipeline, reducing First Contentful Paint (FCP) by 25% for 10k+ deployments.',
        'Implemented a new caching strategy using Redis, decreasing database load by 40% during peak traffic.',
        'Collaborated with the core framework team to migrate 50+ legacy components to a new internal design system.',
      ],
    },
    {
      id: '2',
      company: 'TechStart Solutions',
      position: 'Full Stack Developer Intern',
      location: 'Seattle, WA',
      startDate: 'Jan 2024',
      endDate: 'May 2024',
      current: false,
      description: [
        'Developed and maintained 15+ RESTful API endpoints using Node.js and Express, serving 5,000+ daily active users.',
        'Redesigned the client dashboard using React and Tailwind CSS, improving user engagement metrics by 15%.',
        'Streamlined CI/CD pipelines using GitHub Actions, reducing deployment time from 12 minutes to 4 minutes.',
      ],
    },
    {
      id: '3',
      company: 'UW Open Source Lab',
      position: 'Lead Contributor',
      location: 'Seattle, WA',
      startDate: 'Sept 2023',
      endDate: 'Dec 2023',
      current: false,
      description: [
        'Led a team of 5 student developers to build an open-source campus navigation tool using React Native.',
        'Integrated Google Maps API and implemented custom pathfinding algorithms for indoor routing.',
      ],
    },
  ],
  projects: [
    {
      id: '1',
      name: 'CloudScale Monitor',
      description: 'A comprehensive serverless infrastructure monitoring tool that tracks metrics in real-time across multiple cloud providers.',
      technologies: ['AWS', 'TypeScript', 'React', 'Node.js', 'Grafana'],
      github: 'github.com/arivera/cloudscale',
      link: 'cloudscale-monitor.io',
    },
    {
      id: '2',
      name: 'AI Resume Parser',
      description: 'An intelligent ATS-optimization tool that uses LLMs to analyze resumes against job descriptions and suggest real-time improvements.',
      technologies: ['Python', 'OpenAI', 'FastAPI', 'Next.js', 'PostgreSQL'],
      github: 'github.com/arivera/resume-ai',
    },
  ],
  skills: [
    { id: '1', name: 'React/Next.js', category: 'Frontend' },
    { id: '2', name: 'TypeScript', category: 'Languages' },
    { id: '3', name: 'Node.js/Express', category: 'Backend' },
    { id: '4', name: 'Python/FastAPI', category: 'Backend' },
    { id: '5', name: 'AWS (Lambda, S3)', category: 'Cloud' },
    { id: '6', name: 'Docker/Kubernetes', category: 'DevOps' },
    { id: '7', name: 'PostgreSQL/Redis', category: 'Database' },
    { id: '8', name: 'System Design', category: 'Architecture' },
  ],
  achievements: [
    {
      id: '1',
      title: 'First Place - UW Tech Hub Hackathon',
      description: 'Won the "Best Social Impact" award for a community-driven sustainability app.',
      date: 'Oct 2023',
    },
    {
      id: '2',
      title: 'Dean\'s List',
      description: 'Recognized for outstanding academic achievement for 6 consecutive quarters.',
      date: '2021 - 2024',
    },
    {
      id: '3',
      title: 'Open Source Contributor of the Year',
      description: 'Awarded by the Computer Science department for significant contributions to the university\'s OS projects.',
      date: '2023',
    },
  ],
  template: 'minimal',
  theme: {
    font: 'inter',
    spacing: 'normal',
    color: 'blue',
  },
}

const previewTemplates = [
  { id: 'minimal', name: 'Minimal' },
  { id: 'tech-focused', name: 'Tech Focused' },
  { id: 'elegant-professional', name: 'Professional' },
  { id: 'modern-creative', name: 'Creative' },
  { id: 'executive', name: 'Executive' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [selectedTemplate, setSelectedTemplate] = useState('minimal')

  const resumeData = {
    ...DUMMY_RESUME_DATA,
    template: selectedTemplate,
  }

  return (
    <>
      {/* Fade to background at bottom of hero - preserved for transition effect */}
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-background to-transparent pointer-events-none" />

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
            <p className="text-sm text-muted-foreground mb-6">Trusted by professionals at</p>
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

          {/* New Feature Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-20 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 md:p-12 text-white overflow-hidden relative"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>New Feature</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Real-Time ATS Validation</h2>
                <p className="text-white/80 text-lg mb-8">
                  Don't let algorithms reject you. Our built-in ATS checker analyzes your resume against 20+ best practices and gives you a score with actionable improvements.
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate('/builder')}
                  className="bg-white text-indigo-600 hover:bg-white/90"
                >
                  Check my Score
                </Button>
              </div>
              <div className="flex-1 w-full max-w-md bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                  <span className="font-semibold">ATS Compatibility</span>
                  <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-300 text-sm font-mono font-bold">98/100</span>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3 text-sm items-start">
                    <div className="p-1 rounded bg-green-500/20 mt-0.5">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-white/90">Action verbs used in experience</span>
                  </div>
                  <div className="flex gap-3 text-sm items-start">
                    <div className="p-1 rounded bg-green-500/20 mt-0.5">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-white/90">Contact info is complete</span>
                  </div>
                  <div className="flex gap-3 text-sm items-start">
                    <div className="p-1 rounded bg-green-500/20 mt-0.5">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-white/90">Skills section optimized</span>
                  </div>
                </div>
              </div>
            </div>
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
            <p className="text-muted-foreground mb-8">
              See how a real student resume transforms with our templates.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {previewTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    selectedTemplate === template.id
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  )}
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden p-6 md:p-12 flex justify-center min-h-[500px] max-h-[800px] relative"
          >
            {/* Full Size Resume (No Scale) */}
            <div className="resume-a4-container shadow-2xl" style={{ margin: 0 }}>
              <ResumeTemplate data={resumeData} />
            </div>

            {/* Float Button just before the end of the visible section */}
            <div className="absolute inset-x-0 bottom-12 flex justify-center pointer-events-none z-20">
              <div className="pointer-events-auto">
                <Button
                  size="lg"
                  onClick={() => navigate('/builder')}
                  className="shadow-2xl scale-110 px-8 py-6 text-lg"
                >
                  Try this template
                </Button>
              </div>
            </div>

            {/* Subtle fade at the bottom */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
          </motion.div>
        </div>

      </motion.div>

      {/* Footer */}
      <Footer />
    </>
  )
}
