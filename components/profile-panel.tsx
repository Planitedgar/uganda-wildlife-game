"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, Heart, Star, Shield, BookOpen, Users } from "lucide-react"

export default function ProfilePanel({
  username = "Conservationist",
  points,
  level,
  conservationProgress,
  protectedAnimals,
  animals,
  poachersDefeated,
  habitatsRestored,
  unlockedStories,
  totalStories,
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{username}'s Profile</h2>
          <p className="text-sm text-gray-500">Guardian of Kintu's Legacy</p>
        </div>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="font-bold">{points} pts</span>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Conservation Level {level}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level {level}</span>
              <span>Level {level + 1}</span>
            </div>
            <Progress value={60} className="h-2" />
            <p className="text-xs text-gray-500 text-center">
              {200 - points} more points to reach Level {level + 1}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Conservation Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={conservationProgress} className="h-2" />
            <p className="text-xs text-gray-500 text-center">{conservationProgress}% towards conservation goals</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-gray-50 p-2 rounded-md">
              <div className="flex items-center text-sm font-medium mb-1">
                <Shield className="h-4 w-4 mr-1 text-emerald-500" />
                Protected Animals
              </div>
              <div className="text-xl font-bold">
                {protectedAnimals.length}/{animals.length}
              </div>
            </div>

            <div className="bg-gray-50 p-2 rounded-md">
              <div className="flex items-center text-sm font-medium mb-1">
                <Users className="h-4 w-4 mr-1 text-red-500" />
                Poachers Stopped
              </div>
              <div className="text-xl font-bold">{poachersDefeated}</div>
            </div>

            <div className="bg-gray-50 p-2 rounded-md">
              <div className="flex items-center text-sm font-medium mb-1">
                <Heart className="h-4 w-4 mr-1 text-green-500" />
                Habitats Restored
              </div>
              <div className="text-xl font-bold">{habitatsRestored}</div>
            </div>

            <div className="bg-gray-50 p-2 rounded-md">
              <div className="flex items-center text-sm font-medium mb-1">
                <BookOpen className="h-4 w-4 mr-1 text-amber-500" />
                Folklore Stories
              </div>
              <div className="text-xl font-bold">
                {unlockedStories.length}/{totalStories}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Protected Animals</h3>
            <div className="grid grid-cols-4 gap-2">
              {animals.map((animal) => (
                <div
                  key={animal.id}
                  className={`p-2 text-center text-xs rounded-md ${
                    protectedAnimals.includes(animal.id)
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {protectedAnimals.includes(animal.id) && <Heart className="h-3 w-3 mx-auto mb-1 text-red-500" />}
                  {animal.name.split(" ")[0]}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Totem Spirit Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-amber-600" />
              </div>
              <span className="text-xs mt-1">Kintu's Heir</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-emerald-600" />
              </div>
              <span className="text-xs mt-1">Guardian</span>
            </div>
            <div className="flex flex-col items-center opacity-50">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-gray-400" />
              </div>
              <span className="text-xs mt-1">Elder</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
