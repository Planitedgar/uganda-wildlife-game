"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function EducationPanel({ animals, completedQuizzes, onQuizComplete }) {
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const quizzes = [
    {
      id: 1,
      animalId: 1,
      question: "Why do lions in Queen Elizabeth National Park climb trees?",
      options: [
        "To hunt prey from above",
        "To escape heat and biting flies",
        "To sleep more comfortably",
        "To mark their territory",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      animalId: 2,
      question: "What role do elephants play in their ecosystem?",
      options: [
        "They are apex predators",
        "They are keystone species that maintain biodiversity",
        "They have no significant impact",
        "They only consume vegetation",
      ],
      correctAnswer: 1,
    },
    {
      id: 3,
      animalId: 3,
      question: "What percentage of DNA do chimpanzees share with humans?",
      options: ["75%", "85%", "98.6%", "50%"],
      correctAnswer: 2,
    },
    {
      id: 4,
      animalId: 4,
      question: "What is unique about Rothschild's giraffes?",
      options: [
        "They have blue tongues",
        "They have five ossicones (horn-like structures)",
        "They can't run",
        "They are carnivores",
      ],
      correctAnswer: 1,
    },
  ]

  const startQuiz = (quizId) => {
    setActiveQuiz(quizId)
    setSelectedAnswer(null)
    setQuizCompleted(false)
  }

  const submitAnswer = () => {
    if (selectedAnswer !== null) {
      const quiz = quizzes.find((q) => q.id === activeQuiz)
      if (selectedAnswer === quiz.correctAnswer) {
        setQuizCompleted(true)
        if (!completedQuizzes.includes(activeQuiz)) {
          onQuizComplete(activeQuiz)
        }
      }
    }
  }

  const getAnimalById = (id) => {
    return animals.find((animal) => animal.id === id)
  }

  if (activeQuiz) {
    const quiz = quizzes.find((q) => q.id === activeQuiz)
    const animal = getAnimalById(quiz.animalId)

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{animal.name} Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{quiz.question}</p>
          <div className="space-y-2">
            {quiz.options.map((option, index) => (
              <div
                key={index}
                className={`p-3 border rounded-md cursor-pointer ${
                  selectedAnswer === index
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 hover:border-gray-300"
                } ${quizCompleted && index === quiz.correctAnswer ? "border-green-500 bg-green-50" : ""}`}
                onClick={() => !quizCompleted && setSelectedAnswer(index)}
              >
                {option}
                {quizCompleted && index === quiz.correctAnswer && (
                  <CheckCircle2 className="h-4 w-4 text-green-500 inline ml-2" />
                )}
              </div>
            ))}
          </div>
          {quizCompleted ? (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
              Correct! You've learned something new about {animal.name}.
            </div>
          ) : selectedAnswer !== null && selectedAnswer !== quiz.correctAnswer ? (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">That's not quite right. Try again!</div>
          ) : null}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setActiveQuiz(null)}>
            Back to Lessons
          </Button>
          {!quizCompleted && (
            <Button onClick={submitAnswer} disabled={selectedAnswer === null}>
              Submit Answer
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Wildlife Education</h2>

      {animals.map((animal) => (
        <Card key={animal.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{animal.name}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-sm space-y-2">
              {animal.facts.map((fact, index) => (
                <p key={index}>• {fact}</p>
              ))}
            </div>
            <div className="mt-2 text-sm">
              <p className="font-medium">Cultural Significance:</p>
              <p>{animal.totemSpirit}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant={completedQuizzes.includes(animal.id) ? "outline" : "default"}
              className="w-full"
              onClick={() => startQuiz(animal.id)}
            >
              {completedQuizzes.includes(animal.id) ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Quiz Completed
                </>
              ) : (
                "Take Quiz"
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
