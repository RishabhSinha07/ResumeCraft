export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin?: string
  github?: string
  portfolio?: string
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
  description?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  description: string[]
  current: boolean
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  github?: string
}

export interface Skill {
  id: string
  name: string
  category: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  date?: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: Skill[]
  achievements: Achievement[]
  template: string
  theme: {
    font: string
    spacing: string
    color: string
  }
}

export interface ResumeStore {
  resumeData: ResumeData
  currentStep: number
  setPersonalInfo: (info: PersonalInfo) => void
  setEducation: (education: Education[]) => void
  setExperience: (experience: Experience[]) => void
  setProjects: (projects: Project[]) => void
  setSkills: (skills: Skill[]) => void
  setAchievements: (achievements: Achievement[]) => void
  setTemplate: (template: string) => void
  setTheme: (theme: ResumeData['theme']) => void
  setCurrentStep: (step: number) => void
  reorderSection: (section: keyof ResumeData, fromIndex: number, toIndex: number) => void
  setResumeData: (data: ResumeData) => void
}

