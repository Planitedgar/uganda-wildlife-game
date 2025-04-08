"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle2, Shield, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function GameplayPanel({
  animals,
  currentEvent,
  eventResolved,
  resolveEvent,
  dayNightCycle,
  poachersDefeated,
  habitatsRestored,
  protectedAnimals,
  gamePaused,
}) {
  const [activeAnimal, setActiveAnimal] = useState(null)
  const [patrolActive, setPatrolActive] = useState(false)
  const [patrolProgress, setPatrolProgress] = useState(0)
  const [patrolResult, setPatrolResult] = useState(null)

  // Get background based on time of day
  const getBackground = () => {
    switch (dayNightCycle) {
      case "morning":
        return "bg-gradient-to-br from-amber-100 to-emerald-100"
      case "day":
        return "bg-gradient-to-br from-blue-50 to-emerald-50"
      case "sunset":
        return "bg-gradient-to-br from-orange-100 to-purple-100"
      case "night":
        return "bg-gradient-to-br from-indigo-100 to-gray-100"
      default:
        return "bg-gradient-to-br from-blue-50 to-emerald-50"
    }
  }

  // Start anti-poaching patrol
  const startPatrol = () => {
    if (patrolActive) return

    setPatrolActive(true)
    setPatrolProgress(0)
    setPatrolResult(null)
  }

  // Update patrol progress
  useEffect(() => {
    if (patrolActive && !gamePaused) {
      const timer = setInterval(() => {
        setPatrolProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer)

            // 70% chance of success
            const success = Math.random() < 0.7
            setPatrolResult(success ? "success" : "failure")
            setPatrolActive(false)

            return 100
          }
          return prev + 5
        })
      }, 300)

      return () => clearInterval(timer)
    }
  }, [patrolActive, gamePaused])

  return (
    <div className={`rounded-lg p-3 ${getBackground()}`}>
      {currentEvent ? (
        <Card className="mb-4 border-2 border-amber-500 animate-pulse">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              {currentEvent.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{currentEvent.description}</p>

            {!eventResolved ? (
              <div className="space-y-2">
                {currentEvent.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => resolveEvent(option)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-green-50 text-green-700 rounded-md flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Decision made! Continuing patrol...
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Conservation Dashboard</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2 rounded-md shadow-sm">
                <div className="text-2xl font-bold text-emerald-600">{protectedAnimals.length}</div>
                <div className="text-xs">Protected Species</div>
              </div>
              <div className="bg-white p-2 rounded-md shadow-sm">
                <div className="text-2xl font-bold text-red-600">{poachersDefeated}</div>
                <div className="text-xs">Poachers Stopped</div>
              </div>
              <div className="bg-white p-2 rounded-md shadow-sm">
                <div className="text-2xl font-bold text-amber-600">{habitatsRestored}</div>
                <div className="text-xs">Habitats Restored</div>
              </div>
            </div>
          </div>

          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Anti-Poaching Patrol</CardTitle>
            </CardHeader>
            <CardContent>
              {patrolActive ? (
                <div className="space-y-2">
                  <p className="text-sm">Patrolling the park for illegal activity...</p>
                  <Progress value={patrolProgress} className="h-2" />
                </div>
              ) : patrolResult ? (
                <div
                  className={`p-3 rounded-md ${
                    patrolResult === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}
                >
                  {patrolResult === "success" ? (
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      <div>
                        <p className="font-medium">Patrol Successful!</p>
                        <p className="text-sm">You've deterred poachers from the area.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <X className="h-5 w-5 mr-2" />
                      <div>
                        <p className="font-medium">No poachers found</p>
                        <p className="text-sm">Continue monitoring the area.</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm">Start a patrol to protect wildlife from poachers.</p>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={patrolActive} onClick={startPatrol}>
                {patrolActive ? "Patrolling..." : "Start Patrol"}
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-2 gap-2">
            {animals.slice(0, 2).map((animal) => (
              <Card
                key={animal.id}
                className={`cursor-pointer hover:border-emerald-200 transition-colors ${
                  activeAnimal === animal.id ? "border-emerald-500" : ""
                }`}
                onClick={() => setActiveAnimal(animal.id === activeAnimal ? null : animal.id)}
              >
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-sm flex justify-between items-center">
                    <span>{animal.name.split(" ")[0]}</span>
                    {protectedAnimals.includes(animal.id) && <Shield className="h-4 w-4 text-emerald-500" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-1">
                  <div className="text-xs">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-red-500">{animal.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Poaching Risk:</span>
                      <span>{animal.poachingRisk.split(" ")[0]}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
