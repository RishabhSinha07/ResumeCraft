import { useResumeStore } from '../../store/resumeStore'
import type { Project } from '../../types/resume'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'

export default function ProjectsStep() {
  const { resumeData, setProjects } = useResumeStore()
  const { projects } = resumeData

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
    }
    setProjects([...projects, newProject])
  }

  const removeProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(
      projects.map((project) => (project.id === id ? { ...project, [field]: value } : project))
    )
  }

  const addTechnology = (id: string, tech: string) => {
    if (!tech.trim()) return
    const project = projects.find((p) => p.id === id)
    if (project) {
      updateProject(id, 'technologies', [...project.technologies, tech.trim()])
    }
  }

  const removeTechnology = (id: string, index: number) => {
    const project = projects.find((p) => p.id === id)
    if (project) {
      const newTechs = project.technologies.filter((_, i) => i !== index)
      updateProject(id, 'technologies', newTechs)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Showcase your technical projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Project</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Project Name *</Label>
              <Input
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                placeholder="E-Commerce Platform"
              />
            </div>
            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                placeholder="Built a full-stack e-commerce platform with React and Node.js..."
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>GitHub Link</Label>
                <Input
                  value={project.github || ''}
                  onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                  placeholder="github.com/username/project"
                />
              </div>
              <div className="space-y-2">
                <Label>Live Link</Label>
                <Input
                  value={project.link || ''}
                  onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                  placeholder="project.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Technologies</Label>
              <ProjectTechnologies
                technologies={project.technologies}
                onAdd={(tech) => addTechnology(project.id, tech)}
                onRemove={(index) => removeTechnology(project.id, index)}
              />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addProject} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </CardContent>
    </Card>
  )
}

function ProjectTechnologies({
  technologies,
  onAdd,
  onRemove,
}: {
  technologies: string[]
  onAdd: (tech: string) => void
  onRemove: (index: number) => void
}) {
  const [input, setInput] = useState('')

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input)
      setInput('')
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="React, Node.js, TypeScript..."
        />
        <Button type="button" onClick={handleAdd} size="sm">
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
          >
            <span>{tech}</span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="hover:bg-primary/20 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

