import { useResumeStore } from '../../store/resumeStore'
import type { Achievement } from '../../types/resume'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Plus, Trash2 } from 'lucide-react'

export default function AchievementsStep() {
  const { resumeData, setAchievements } = useResumeStore()
  const { achievements } = resumeData

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      date: '',
    }
    setAchievements([...achievements, newAchievement])
  }

  const removeAchievement = (id: string) => {
    setAchievements(achievements.filter((achievement) => achievement.id !== id))
  }

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    setAchievements(
      achievements.map((achievement) =>
        achievement.id === id ? { ...achievement, [field]: value } : achievement
      )
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements & Awards</CardTitle>
        <CardDescription>Highlight your accomplishments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="p-4 border rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Achievement</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeAchievement(achievement.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={achievement.title}
                onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                placeholder="Dean's List, Hackathon Winner, etc."
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={achievement.description}
                onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                placeholder="Brief description of the achievement..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Date (Optional)</Label>
              <Input
                value={achievement.date || ''}
                onChange={(e) => updateAchievement(achievement.id, 'date', e.target.value)}
                placeholder="May 2023"
              />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addAchievement} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Achievement
        </Button>
      </CardContent>
    </Card>
  )
}

