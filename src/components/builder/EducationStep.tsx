import { useResumeStore } from '../../store/resumeStore'
import type { Education } from '../../types/resume'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { DraggableList } from '../ui/draggable-list'
import { Plus, Trash2 } from 'lucide-react'

export default function EducationStep() {
  const { resumeData, setEducation, reorderSection } = useResumeStore()
  const { education } = resumeData

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    }
    setEducation([...education, newEdu])
  }

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(
      education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    )
  }

  const handleReorder = (fromIndex: number, toIndex: number) => {
    reorderSection('education', fromIndex, toIndex)
  }

  const renderEducationItem = (edu: Education) => (
    <div className="p-4 border rounded-2xl space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Education Entry</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeEducation(edu.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>School/University *</Label>
          <Input
            value={edu.school}
            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
            placeholder="Stanford University"
          />
        </div>
        <div className="space-y-2">
          <Label>Degree *</Label>
          <Input
            value={edu.degree}
            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
            placeholder="Bachelor of Science"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Field of Study *</Label>
        <Input
          value={edu.field}
          onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
          placeholder="Computer Science"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Start Date *</Label>
          <Input
            value={edu.startDate}
            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
            placeholder="Sep 2020"
          />
        </div>
        <div className="space-y-2">
          <Label>End Date *</Label>
          <Input
            value={edu.endDate}
            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
            placeholder="May 2024"
          />
        </div>
        <div className="space-y-2">
          <Label>GPA (Optional)</Label>
          <Input
            value={edu.gpa || ''}
            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
            placeholder="3.8/4.0"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Description (Optional)</Label>
        <Textarea
          value={edu.description || ''}
          onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
          placeholder="Relevant coursework, honors, etc."
          rows={3}
        />
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>Add your educational background. Drag to reorder.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.length > 0 ? (
          <DraggableList
            items={education}
            onReorder={handleReorder}
            renderItem={renderEducationItem}
            itemId={(edu) => edu.id}
          />
        ) : null}
        <Button variant="outline" onClick={addEducation} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </CardContent>
    </Card>
  )
}

