import { create } from 'zustand'
import type { ResumeStore, ResumeData, PersonalInfo, Education, Experience, Project, Skill, Achievement } from '../types/resume'

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  achievements: [],
  template: 'minimal',
  theme: {
    font: 'inter',
    spacing: 'normal',
    color: 'blue',
  },
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: defaultResumeData,
  currentStep: 0,

  setPersonalInfo: (info: PersonalInfo) =>
    set((state) => ({
      resumeData: { ...state.resumeData, personalInfo: info },
    })),

  setEducation: (education: Education[]) =>
    set((state) => ({
      resumeData: { ...state.resumeData, education },
    })),

  setExperience: (experience: Experience[]) =>
    set((state) => ({
      resumeData: { ...state.resumeData, experience },
    })),

  setProjects: (projects: Project[]) =>
    set((state) => ({
      resumeData: { ...state.resumeData, projects },
    })),

  setSkills: (skills: Skill[]) =>
    set((state) => ({
      resumeData: { ...state.resumeData, skills },
    })),

  setAchievements: (achievements: Achievement[]) =>
    set((state) => ({
      resumeData: { ...state.resumeData, achievements },
    })),

  setTemplate: (template: string) =>
    set((state) => ({
      resumeData: { ...state.resumeData, template },
    })),

  setTheme: (theme: ResumeData['theme']) =>
    set((state) => ({
      resumeData: { ...state.resumeData, theme },
    })),

  setCurrentStep: (step: number) => set({ currentStep: step }),

  reorderSection: (section: keyof ResumeData, fromIndex: number, toIndex: number) =>
    set((state) => {
      const items = [...(state.resumeData[section] as any[])]
      const [removed] = items.splice(fromIndex, 1)
      items.splice(toIndex, 0, removed)
      return {
        resumeData: { ...state.resumeData, [section]: items },
      }
    }),
}))

