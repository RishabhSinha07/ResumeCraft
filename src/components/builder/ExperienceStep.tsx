import { useResumeStore } from '../../store/resumeStore'
import type { Experience } from '../../types/resume'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Plus, Trash2 } from 'lucide-react'

export default function ExperienceStep() {
  const { resumeData, setExperience } = useResumeStore()
  const { experience } = resumeData

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: [],
      current: false,
    }
    setExperience([...experience, newExp])
  }

  const removeExperience = (id: string) => {
    setExperience(experience.filter((exp) => exp.id !== id))
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperience(
      experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    )
  }

  const addBulletPoint = (id: string) => {
    const exp = experience.find((e) => e.id === id)
    if (exp) {
      updateExperience(id, 'description', [...exp.description, ''])
    }
  }

  const updateBulletPoint = (id: string, index: number, value: string) => {
    const exp = experience.find((e) => e.id === id)
    if (exp) {
      const newDescription = [...exp.description]
      newDescription[index] = value
      updateExperience(id, 'description', newDescription)
    }
  }

  const removeBulletPoint = (id: string, index: number) => {
    const exp = experience.find((e) => e.id === id)
    if (exp) {
      const newDescription = exp.description.filter((_, i) => i !== index)
      updateExperience(id, 'description', newDescription)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Experience</CardTitle>
        <CardDescription>Add your work experience and internships</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.map((exp) => (
          <div key={exp.id} className="p-4 border rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Experience Entry</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Position *</Label>
                <Input
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  placeholder="Software Engineering Intern"
                />
              </div>
              <div className="space-y-2">
                <Label>Company *</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Google"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  placeholder="Mountain View, CA"
                />
              </div>
              <div className="space-y-2">
                <Label>Current Position</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">I currently work here</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  placeholder="Jun 2023"
                />
              </div>
              {!exp.current && (
                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Input
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    placeholder="Aug 2023"
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Description *</Label>
              {exp.description.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={desc}
                    onChange={(e) => updateBulletPoint(exp.id, index, e.target.value)}
                    placeholder="Achieved X by doing Y, resulting in Z"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBulletPoint(exp.id, index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addBulletPoint(exp.id)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Bullet Point
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addExperience} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </CardContent>
    </Card>
  )
}

