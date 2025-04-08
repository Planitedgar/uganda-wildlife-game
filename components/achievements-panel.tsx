"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle } from "lucide-react"

export default function AchievementsPanel({ achievements }) {
  const completedCount = achievements.filter((a) => a.completed).length
  const totalCount = achievements.length
  const progressPercentage = (completedCount / totalCount) * 100

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Achievements</h2>
        <span className="text-sm text-gray-500">
          {completedCount}/{totalCount} Completed
        </span>
      </div>

      <Progress value={progressPercentage} className="h-2" />

      <div className="space-y-3 mt-4">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={achievement.completed ? "border-emerald-200 bg-emerald-50" : "border-gray-200"}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center">
                {achievement.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300 mr-2" />
                )}
                <CardTitle className="text-base">{achievement.name}</CardTitle>
              </div>
              <CardDescription>{achievement.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
