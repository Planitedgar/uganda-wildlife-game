"use client"

import { useState, useEffect } from "react"
import { Award, BookOpen, User, MapPin, Play, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMobile } from "@/hooks/use-mobile"
import QuickActions from "./quick-actions"
import MapView from "./map-view"
import EducationPanel from "./education-panel"
import AchievementsPanel from "./achievements-panel"
import ProfilePanel from "./profile-panel"
import SettingsPanel from "./settings-panel"
import GameplayPanel from "./gameplay-panel"
import FolklorePanel from "./folklore-panel"
import LoginModal from "./login-modal"

// Enhanced animal data with Ugandan cultural connections
const animals = [
  {
    id: 1,
    name: "Tree-Climbing Lion",
    status: "Vulnerable",
    population: 123,
    description: "Famous for their unique tree-climbing behavior in Queen Elizabeth National Park.",
    threatLevel: 75,
    image: "/placeholder.svg?height=150&width=200",
    facts: [
      "Lions in Queen Elizabeth National Park are known for climbing trees",
      "They often climb to escape the heat and biting flies",
      "This behavior is rare among lions in other regions",
    ],
    location: { top: "25%", left: "20%" },
    totemSpirit: "Represents strength and leadership in Buganda culture",
    poachingRisk: "High - hunted for traditional medicine and trophies",
    conservationActions: ["Anti-poaching patrols", "Community education", "Habitat protection"],
  },
  {
    id: 2,
    name: "African Elephant",
    status: "Endangered",
    population: 432,
    description: "Keystone species crucial for maintaining biodiversity in Uganda.",
    threatLevel: 65,
    image: "/placeholder.svg?height=150&width=200",
    facts: [
      "African elephants are the largest land mammals on Earth",
      "They play a crucial role in maintaining the savannah ecosystem",
      "Poaching for ivory remains a serious threat to their survival",
    ],
    location: { top: "50%", left: "45%" },
    totemSpirit: "Symbol of wisdom and memory in many Ugandan tribes",
    poachingRisk: "Very High - targeted for ivory tusks",
    conservationActions: ["Anti-poaching technology", "Ivory trade monitoring", "Wildlife corridors"],
  },
  {
    id: 3,
    name: "Chimpanzee",
    status: "Endangered",
    population: 234,
    description: "Highly intelligent primates sharing 98.6% of human DNA.",
    threatLevel: 80,
    image: "/placeholder.svg?height=150&width=200",
    facts: [
      "Chimpanzees share 98.6% of their DNA with humans",
      "They use tools and have complex social structures",
      "Habitat loss is their biggest threat in Uganda",
    ],
    location: { top: "75%", left: "70%" },
    totemSpirit: "Represents intelligence and community in Ugandan folklore",
    poachingRisk: "Medium - captured for illegal pet trade",
    conservationActions: ["Forest conservation", "Anti-trafficking operations", "Sanctuary support"],
  },
  {
    id: 4,
    name: "Rothschild's Giraffe",
    status: "Endangered",
    population: 178,
    description: "One of the most endangered giraffe subspecies, native to Uganda.",
    threatLevel: 70,
    image: "/placeholder.svg?height=150&width=200",
    facts: [
      "Rothschild's giraffes have five ossicones (horn-like structures)",
      "They are named after zoologist Lord Walter Rothschild",
      "Only a few hundred remain in the wild",
    ],
    location: { top: "35%", left: "60%" },
    totemSpirit: "Symbol of vision and foresight in Ugandan storytelling",
    poachingRisk: "Medium - hunted for meat and hides",
    conservationActions: ["Protected breeding areas", "Translocation programs", "Anti-poaching units"],
  },
]

// Game events that can occur
const gameEvents = [
  {
    id: 1,
    title: "Poachers Spotted!",
    description: "Rangers have reported poaching activity near the elephant habitat. Take action quickly!",
    options: [
      { text: "Deploy anti-poaching patrol", points: 50, success: true },
      { text: "Set up camera traps", points: 30, success: true },
      { text: "Ignore the report", points: -50, success: false },
    ],
    animalId: 2,
    type: "poaching",
  },
  {
    id: 2,
    title: "Habitat Degradation",
    description: "Deforestation is threatening the chimpanzee habitat. What will you do?",
    options: [
      { text: "Plant new trees", points: 40, success: true },
      { text: "Create a protected zone", points: 60, success: true },
      { text: "Relocate the chimps", points: 10, success: true },
    ],
    animalId: 3,
    type: "habitat",
  },
  {
    id: 3,
    title: "Sick Lion Cub",
    description: "A tree-climbing lion cub appears to be ill. How will you help?",
    options: [
      { text: "Call wildlife veterinarian", points: 50, success: true },
      { text: "Monitor from a distance", points: 20, success: true },
      { text: "Attempt to treat yourself", points: -20, success: false },
    ],
    animalId: 1,
    type: "health",
  },
  {
    id: 4,
    title: "Tourism Opportunity",
    description: "A tour group wants to see the giraffes up close. How do you manage this?",
    options: [
      { text: "Guided tour with distance rules", points: 40, success: true },
      { text: "Allow close encounters for more money", points: -30, success: false },
      { text: "Set up a viewing platform", points: 60, success: true },
    ],
    animalId: 4,
    type: "tourism",
  },
]

// Ugandan folklore stories
const folkloreStories = [
  {
    id: 1,
    title: "Kintu and the Wild Animals",
    summary:
      "The creation myth of the Buganda kingdom, where Kintu, the first person on earth, befriends and lives in harmony with animals.",
    content:
      "Long ago, Kintu was the only person on earth, living alone with his cow. Gulu, the creator of all things, lived in the sky with his daughter Nambi. One day, Nambi saw Kintu and fell in love with him. Despite her father's warnings, Nambi decided to marry Kintu and live on earth. Gulu gave them many gifts, including domestic animals and plants. However, he warned them never to return to the sky, or Death would follow them to earth. As they left, Nambi realized she had forgotten to bring millet for her chicken. Despite Kintu's warnings, she returned to the sky, and Death followed her back to earth. This is why all living things must eventually die. The tale teaches that humans and animals once lived in harmony, and we must strive to restore this balance.",
    moralLesson: "Humans and wildlife are meant to live in harmony, and disrupting this balance brings consequences.",
    relatedAnimalId: 1,
  },
  {
    id: 2,
    title: "The Elephant's Wisdom",
    summary: "A tale about how the elephant gained its wisdom and why it's respected across Uganda.",
    content:
      "In ancient times, all wisdom was kept in a clay pot by the creator. The animals argued about who should be the keeper of wisdom. The creator decided to test them. The elephant, with its gentle nature, suggested that wisdom should be shared among all creatures, not hoarded by one. Impressed by this answer, the creator gave the elephant the task of carrying wisdom in its large head and sharing it with others when needed. This is why elephants are known for their intelligence and memory, and why they're respected as symbols of wisdom in Ugandan culture.",
    moralLesson: "Knowledge and wisdom should be shared for the benefit of all, not kept for oneself.",
    relatedAnimalId: 2,
  },
  {
    id: 3,
    title: "The Chimpanzee's Gift",
    summary: "How the chimpanzee taught humans about medicinal plants and forest survival.",
    content:
      "When humans first entered the great forests of Uganda, they didn't know which plants were safe to eat or could heal sickness. They were hungry and suffering. A kind chimpanzee took pity on them and showed them which leaves could cure fevers, which roots could ease pain, and which fruits were safe to eat. The chimpanzee taught humans how to find water in the forest and how to build shelters from the rain. In return, the humans promised to protect the forest and its inhabitants. Over time, some humans forgot this promise, cutting down trees and hunting the animals. The tale reminds us of our debt to the chimpanzees and our promise to protect their home.",
    moralLesson: "We owe much of our knowledge to the natural world, and have a responsibility to protect it.",
    relatedAnimalId: 3,
  },
  {
    id: 4,
    title: "The Giraffe's Long Neck",
    summary: "A Ugandan folktale explaining how the giraffe got its long neck through generosity.",
    content:
      "In the beginning, the giraffe had a short neck like other animals. During a great drought, all the water dried up except for one small pool high in the mountains. The giraffe, being kind-hearted, would climb the mountain each day and bring water down to the other animals who couldn't make the journey. Each time the giraffe bent its neck to drink and then raised it to carry water, its neck stretched a little longer. After many months of this selfless act, the giraffe's neck had become the longest of all animals. When the rains finally returned, the giraffe kept its long neck as a reminder of the value of helping others. Today, the giraffe uses its height to spot danger and warn other animals, continuing its role as a protector.",
    moralLesson: "Selfless acts of kindness may change us, but make us more valuable to our community.",
    relatedAnimalId: 4,
  },
]

export default function Game() {
  const [activeTab, setActiveTab] = useState("gameplay")
  const [scale, setScale] = useState(1)
  const [infoOpen, setInfoOpen] = useState(false)
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [notification, setNotification] = useState(null)
  const [userPoints, setUserPoints] = useState(120)
  const [userLevel, setUserLevel] = useState(2)
  const [conservationProgress, setConservationProgress] = useState(35)
  const [loginOpen, setLoginOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [gameStarted, setGameStarted] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [eventResolved, setEventResolved] = useState(false)
  const [gameTime, setGameTime] = useState(0)
  const [gameSpeed, setGameSpeed] = useState(1)
  const [gamePaused, setGamePaused] = useState(true)
  const [dayNightCycle, setDayNightCycle] = useState("day") // "day", "sunset", "night", "sunrise"
  const isMobile = useMobile()

  // Game state
  const [protectedAnimals, setProtectedAnimals] = useState([])
  const [completedQuizzes, setCompletedQuizzes] = useState([])
  const [unlockedStories, setUnlockedStories] = useState([1]) // Start with first story unlocked
  const [poachersDefeated, setPoachersDefeated] = useState(0)
  const [habitatsRestored, setHabitatsRestored] = useState(0)
  const [achievements, setAchievements] = useState([
    { id: 1, name: "First Steps", description: "Start your conservation journey", completed: true },
    { id: 2, name: "Wildlife Protector", description: "Protect your first animal", completed: false },
    { id: 3, name: "Conservation Expert", description: "Complete all educational quizzes", completed: false },
    { id: 4, name: "Master Tracker", description: "Track all animals in the park", completed: false },
    { id: 5, name: "Poacher Hunter", description: "Stop 5 poaching attempts", completed: false },
    { id: 6, name: "Habitat Restorer", description: "Restore 3 degraded habitats", completed: false },
    { id: 7, name: "Folklore Keeper", description: "Unlock all Ugandan folklore stories", completed: false },
    { id: 8, name: "Kintu's Heir", description: "Reach maximum harmony with nature", completed: false },
  ])

  // Show notification
  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  // Show animal info
  const showAnimalInfo = (animal) => {
    setSelectedAnimal(animal)
    setInfoOpen(true)
  }

  // Protect animal
  const protectAnimal = (animalId) => {
    if (!protectedAnimals.includes(animalId)) {
      setProtectedAnimals([...protectedAnimals, animalId])
      setUserPoints(userPoints + 50)
      setConservationProgress(Math.min(conservationProgress + 10, 100))
      showNotification(`+50 points! You're helping protect wildlife!`)

      // Check for achievement
      if (protectedAnimals.length === 0) {
        const updatedAchievements = achievements.map((a) => (a.id === 2 ? { ...a, completed: true } : a))
        setAchievements(updatedAchievements)
        showNotification("Achievement unlocked: Wildlife Protector!")
      }

      // Unlock related folklore
      const relatedStory = folkloreStories.find((story) => story.relatedAnimalId === animalId)
      if (relatedStory && !unlockedStories.includes(relatedStory.id)) {
        setUnlockedStories([...unlockedStories, relatedStory.id])
        showNotification(`You've unlocked the tale of "${relatedStory.title}"!`)
      }
    }
  }

  // Complete quiz
  const completeQuiz = (quizId) => {
    if (!completedQuizzes.includes(quizId)) {
      setCompletedQuizzes([...completedQuizzes, quizId])
      setUserPoints(userPoints + 30)
      showNotification(`+30 points! Knowledge is power!`)

      // Check if all quizzes completed
      if (completedQuizzes.length + 1 === animals.length) {
        const updatedAchievements = achievements.map((a) => (a.id === 3 ? { ...a, completed: true } : a))
        setAchievements(updatedAchievements)
        showNotification("Achievement unlocked: Conservation Expert!")
      }
    }
  }

  // Start game
  const startGame = () => {
    if (!isLoggedIn) {
      setLoginOpen(true)
      return
    }

    setGameStarted(true)
    setGamePaused(false)
    showNotification("Game started! Protect Uganda's wildlife from threats!")

    // Trigger first event after a short delay
    setTimeout(() => {
      triggerRandomEvent()
    }, 5000)
  }

  // Handle login
  const handleLogin = (name) => {
    setUsername(name)
    setIsLoggedIn(true)
    setLoginOpen(false)
    showNotification(`Welcome, ${name}! Ready to start your conservation journey?`)
  }

  // Trigger random game event
  const triggerRandomEvent = () => {
    if (gamePaused) return

    const randomEvent = gameEvents[Math.floor(Math.random() * gameEvents.length)]
    setCurrentEvent(randomEvent)
    setEventResolved(false)
  }

  // Resolve event with selected option
  const resolveEvent = (option) => {
    setUserPoints(userPoints + option.points)

    if (option.points > 0) {
      showNotification(`+${option.points} points! Good decision!`)
    } else {
      showNotification(`${option.points} points. That wasn't the best choice.`)
    }

    // Update game stats based on event type
    if (currentEvent.type === "poaching" && option.success) {
      const newCount = poachersDefeated + 1
      setPoachersDefeated(newCount)

      // Check for achievement
      if (newCount >= 5) {
        const updatedAchievements = achievements.map((a) => (a.id === 5 ? { ...a, completed: true } : a))
        setAchievements(updatedAchievements)
        showNotification("Achievement unlocked: Poacher Hunter!")
      }
    }

    if (currentEvent.type === "habitat" && option.success) {
      const newCount = habitatsRestored + 1
      setHabitatsRestored(newCount)

      // Check for achievement
      if (newCount >= 3) {
        const updatedAchievements = achievements.map((a) => (a.id === 6 ? { ...a, completed: true } : a))
        setAchievements(updatedAchievements)
        showNotification("Achievement unlocked: Habitat Restorer!")
      }
    }

    setEventResolved(true)
    setTimeout(() => {
      setCurrentEvent(null)
    }, 2000)
  }

  // Game time progression
  useEffect(() => {
    if (gameStarted && !gamePaused) {
      const timer = setInterval(() => {
        setGameTime((prevTime) => {
          const newTime = prevTime + gameSpeed

          // Day-night cycle (0-100)
          const timeOfDay = newTime % 100
          if (timeOfDay < 25) {
            setDayNightCycle("morning")
          } else if (timeOfDay < 50) {
            setDayNightCycle("day")
          } else if (timeOfDay < 75) {
            setDayNightCycle("sunset")
          } else {
            setDayNightCycle("night")
          }

          // Trigger random events periodically
          if (newTime % 20 === 0 && !currentEvent) {
            triggerRandomEvent()
          }

          return newTime
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [gameStarted, gamePaused, gameSpeed, currentEvent])

  // Check for all stories unlocked achievement
  useEffect(() => {
    if (unlockedStories.length === folkloreStories.length) {
      const updatedAchievements = achievements.map((a) => (a.id === 7 ? { ...a, completed: true } : a))
      setAchievements(updatedAchievements)
      showNotification("Achievement unlocked: Folklore Keeper!")
    }
  }, [unlockedStories])

  return (
    <div className="w-full max-w-md">
      {!gameStarted ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full h-48 bg-gradient-to-b from-amber-300 to-emerald-600 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h2 className="text-xl font-bold drop-shadow-md">Guardians of Kintu's Legacy</h2>
              <p className="text-sm drop-shadow-md">Protect Uganda's wildlife and discover ancient folklore</p>
            </div>
          </div>

          <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={startGame}>
            <Play className="mr-2 h-4 w-4" /> Start Your Journey
          </Button>

          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" onClick={() => setActiveTab("education")}>
              Learn About Wildlife
            </Button>
            <Button variant="outline" onClick={() => setActiveTab("folklore")}>
              Discover Folklore
            </Button>
          </div>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="gameplay" className="flex flex-col items-center py-2">
              <Play className="h-4 w-4 mb-1" />
              <span className="text-xs">Play</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex flex-col items-center py-2">
              <MapPin className="h-4 w-4 mb-1" />
              <span className="text-xs">Map</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex flex-col items-center py-2">
              <BookOpen className="h-4 w-4 mb-1" />
              <span className="text-xs">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="folklore" className="flex flex-col items-center py-2">
              <Menu className="h-4 w-4 mb-1" />
              <span className="text-xs">Tales</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex flex-col items-center py-2">
              <Award className="h-4 w-4 mb-1" />
              <span className="text-xs">Achieve</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col items-center py-2">
              <User className="h-4 w-4 mb-1" />
              <span className="text-xs">Profile</span>
            </TabsTrigger>
          </TabsList>

          <div
            className={`w-full p-2 mb-2 rounded-md text-white text-sm ${
              dayNightCycle === "morning"
                ? "bg-amber-400"
                : dayNightCycle === "day"
                  ? "bg-emerald-600"
                  : dayNightCycle === "sunset"
                    ? "bg-orange-500"
                    : "bg-indigo-900"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold">Day {Math.floor(gameTime / 100) + 1}</span> •
                <span className="ml-1">
                  {dayNightCycle === "morning"
                    ? "Morning"
                    : dayNightCycle === "day"
                      ? "Midday"
                      : dayNightCycle === "sunset"
                        ? "Sunset"
                        : "Night"}
                </span>
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  onClick={() => setGamePaused(!gamePaused)}
                >
                  {gamePaused ? "▶️" : "⏸️"}
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="gameplay" className="mt-0">
            <GameplayPanel
              animals={animals}
              currentEvent={currentEvent}
              eventResolved={eventResolved}
              resolveEvent={resolveEvent}
              dayNightCycle={dayNightCycle}
              poachersDefeated={poachersDefeated}
              habitatsRestored={habitatsRestored}
              protectedAnimals={protectedAnimals}
              gamePaused={gamePaused}
            />
          </TabsContent>

          <TabsContent value="map" className="mt-0">
            <MapView
              animals={animals}
              scale={scale}
              setScale={setScale}
              position={position}
              setPosition={setPosition}
              showAnimalInfo={showAnimalInfo}
              isMobile={isMobile}
              dayNightCycle={dayNightCycle}
              protectedAnimals={protectedAnimals}
            />

            <div className="mt-4 grid grid-cols-2 gap-2">
              {animals.map((animal) => (
                <div
                  key={animal.id}
                  className={`border rounded-md p-2 cursor-pointer hover:bg-emerald-50 transition-colors ${
                    protectedAnimals.includes(animal.id) ? "border-emerald-500 bg-emerald-50" : ""
                  }`}
                  onClick={() => showAnimalInfo(animal)}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-sm">{animal.name.split(" ")[0]}</span>
                    <div
                      className={`w-2 h-2 rounded-full ${animal.threatLevel > 70 ? "bg-red-500" : "bg-yellow-500"}`}
                    />
                  </div>
                  <div className="text-xs mt-1 text-gray-600">Pop: {animal.population}</div>
                </div>
              ))}
            </div>

            <QuickActions
              onInfoClick={() => {
                if (selectedAnimal) {
                  setInfoOpen(true)
                } else {
                  showAnimalInfo(animals[0])
                }
              }}
            />
          </TabsContent>

          <TabsContent value="education" className="mt-0">
            <EducationPanel animals={animals} completedQuizzes={completedQuizzes} onQuizComplete={completeQuiz} />
          </TabsContent>

          <TabsContent value="folklore" className="mt-0">
            <FolklorePanel stories={folkloreStories} unlockedStories={unlockedStories} />
          </TabsContent>

          <TabsContent value="achievements" className="mt-0">
            <AchievementsPanel achievements={achievements} />
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <ProfilePanel
              username={username}
              points={userPoints}
              level={userLevel}
              conservationProgress={conservationProgress}
              protectedAnimals={protectedAnimals}
              animals={animals}
              poachersDefeated={poachersDefeated}
              habitatsRestored={habitatsRestored}
              unlockedStories={unlockedStories}
              totalStories={folkloreStories.length}
            />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <SettingsPanel gameSpeed={gameSpeed} setGameSpeed={setGameSpeed} />
          </TabsContent>
        </Tabs>
      )}

      {notification && (
        <div className="fixed top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-in fade-in slide-in-from-top-5 duration-300">
          {notification}
        </div>
      )}

      <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
        {selectedAnimal && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedAnimal.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-2">
              <div className="w-full h-32 bg-gray-200 rounded-md mb-3">
                <img
                  src={selectedAnimal.image || "/placeholder.svg"}
                  alt={selectedAnimal.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <p className="text-red-500 font-medium">Conservation Status: {selectedAnimal.status}</p>
              <p className="text-sm mt-2">{selectedAnimal.description}</p>

              <div className="mt-3">
                <h4 className="font-medium mb-1">Population</h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full"
                    style={{ width: `${(selectedAnimal.population / 500) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Current: {selectedAnimal.population}</span>
                  <span>Target: 500</span>
                </div>
              </div>

              <div className="mt-3">
                <h4 className="font-medium mb-1">Threat Level</h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${selectedAnimal.threatLevel > 70 ? "bg-red-500" : "bg-yellow-500"}`}
                    style={{ width: `${selectedAnimal.threatLevel}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Low</span>
                  <span>Critical</span>
                </div>
              </div>

              <div className="mt-3">
                <h4 className="font-medium mb-1">Cultural Significance</h4>
                <p className="text-sm">{selectedAnimal.totemSpirit}</p>
              </div>

              <div className="mt-3">
                <h4 className="font-medium mb-1">Poaching Risk</h4>
                <p className="text-sm">{selectedAnimal.poachingRisk}</p>
              </div>

              <div className="mt-4">
                <Button
                  className="w-full"
                  onClick={() => {
                    protectAnimal(selectedAnimal.id)
                    setInfoOpen(false)
                  }}
                >
                  {protectedAnimals.includes(selectedAnimal.id) ? "Already Protected" : "Help Conservation Efforts"}
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} onLogin={handleLogin} />
    </div>
  )
}
