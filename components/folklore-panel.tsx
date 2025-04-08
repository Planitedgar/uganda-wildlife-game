"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, BookOpen } from "lucide-react"

export default function FolklorePanel({ stories, unlockedStories }) {
  const [activeStory, setActiveStory] = useState(null)

  const getStory = (id) => {
    return stories.find((story) => story.id === id)
  }

  if (activeStory) {
    const story = getStory(activeStory)

    return (
      <div className="space-y-4">
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{story.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="italic text-sm mb-4">{story.summary}</p>
            <div className="prose prose-sm">
              <p>{story.content}</p>
              <div className="mt-4 p-3 bg-amber-100 rounded-md">
                <h4 className="font-medium text-amber-800">Moral of the Story</h4>
                <p className="text-sm text-amber-700">{story.moralLesson}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setActiveStory(null)}>
              Back to Stories
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
        <h3 className="font-semibold text-amber-800">Ugandan Folklore</h3>
        <p className="text-sm text-amber-700">
          Discover ancient tales that connect wildlife conservation with Uganda's rich cultural heritage.
        </p>
      </div>

      <div className="space-y-3">
        {stories.map((story) => (
          <Card
            key={story.id}
            className={unlockedStories.includes(story.id) ? "cursor-pointer hover:border-amber-200" : "opacity-75"}
            onClick={() => unlockedStories.includes(story.id) && setActiveStory(story.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center justify-between">
                <span>{story.title}</span>
                {!unlockedStories.includes(story.id) && <Lock className="h-4 w-4" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm">
                {unlockedStories.includes(story.id)
                  ? story.summary
                  : "This story is locked. Protect more wildlife to unlock it."}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant={unlockedStories.includes(story.id) ? "default" : "outline"}
                className="w-full"
                disabled={!unlockedStories.includes(story.id)}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                {unlockedStories.includes(story.id) ? "Read Story" : "Locked"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
