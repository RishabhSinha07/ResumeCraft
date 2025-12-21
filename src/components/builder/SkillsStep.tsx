import { useResumeStore } from '../../store/resumeStore'
import type { Skill } from '../../types/resume'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

const skillCategories = [
  'Programming Languages',
  'Frameworks & Libraries',
  'Tools & Technologies',
  'Databases',
  'Cloud & DevOps',
  'Other',
]

export default function SkillsStep() {
  const { resumeData, setSkills } = useResumeStore()
  const { skills } = resumeData

  const addSkill = (category: string, name: string) => {
    if (!name.trim()) return
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: name.trim(),
      category,
    }
    setSkills([...skills, newSkill])
  }

  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const skillsByCategory = skillCategories.map((category) => ({
    category,
    skills: skills.filter((skill) => skill.category === category),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>List your technical and professional skills</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {skillsByCategory.map(({ category, skills: categorySkills }) => (
          <SkillCategory
            key={category}
            category={category}
            skills={categorySkills}
            onAdd={(name) => addSkill(category, name)}
            onRemove={removeSkill}
          />
        ))}
      </CardContent>
    </Card>
  )
}

function SkillCategory({
  category,
  skills,
  onAdd,
  onRemove,
}: {
  category: string
  skills: Skill[]
  onAdd: (name: string) => void
  onRemove: (id: string) => void
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
      <Label>{category}</Label>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder={`Add ${category.toLowerCase()}...`}
        />
        <Button type="button" onClick={handleAdd} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm"
          >
            <span>{skill.name}</span>
            <button
              type="button"
              onClick={() => onRemove(skill.id)}
              className="hover:bg-destructive/20 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

