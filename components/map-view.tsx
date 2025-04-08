"use client"

import { useRef, useEffect, useState } from "react"
import { Maximize, Minimize, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MapView({
  animals,
  scale,
  setScale,
  position,
  setPosition,
  showAnimalInfo,
  isMobile,
  dayNightCycle = "day",
  protectedAnimals = [],
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [startDistance, setStartDistance] = useState(0)
  const mapRef = useRef(null)

  const handlePinchStart = (e) => {
    if (e.touches && e.touches.length === 2) {
      e.preventDefault()
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY)
      setStartDistance(distance)
    }
  }

  const handlePinchMove = (e) => {
    if (e.touches && e.touches.length === 2 && startDistance > 0) {
      e.preventDefault()
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY)
      const newScale = Math.min(Math.max(scale * (distance / startDistance), 1), 3)
      setScale(newScale)
      setStartDistance(distance)
    }
  }

  const handlePinchEnd = () => {
    setStartDistance(0)
  }

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setIsDragging(true)
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - startPos.x
      const newY = e.clientY - startPos.y
      const boundedX = Math.min(Math.max(newX, -300 * (scale - 1)), 300 * (scale - 1))
      const boundedY = Math.min(Math.max(newY, -200 * (scale - 1)), 200 * (scale - 1))
      setPosition({ x: boundedX, y: boundedY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      setIsDragging(true)
      setStartPos({ x: touch.clientX - position.x, y: touch.clientY - position.y })
    }
  }

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0]
      const newX = touch.clientX - startPos.x
      const newY = touch.clientY - startPos.y
      const boundedX = Math.min(Math.max(newX, -300 * (scale - 1)), 300 * (scale - 1))
      const boundedY = Math.min(Math.max(newY, -200 * (scale - 1)), 200 * (scale - 1))
      setPosition({ x: boundedX, y: boundedY })
    }
  }

  const zoomIn = () => {
    setScale(Math.min(scale + 0.2, 3))
  }

  const zoomOut = () => {
    setScale(Math.max(scale - 0.2, 1))
  }

  useEffect(() => {
    const map = mapRef.current
    if (map) {
      map.addEventListener("touchstart", handlePinchStart, { passive: false })
      map.addEventListener("touchmove", handlePinchMove, { passive: false })
      map.addEventListener("touchend", handlePinchEnd)
      map.addEventListener("touchcancel", handlePinchEnd)
      map.addEventListener("mousedown", handleMouseDown)
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      map.addEventListener("touchstart", handleTouchStart, { passive: false })
      map.addEventListener("touchmove", handleTouchMove, { passive: false })
    }

    return () => {
      if (map) {
        map.removeEventListener("touchstart", handlePinchStart)
        map.removeEventListener("touchmove", handlePinchMove)
        map.removeEventListener("touchend", handlePinchEnd)
        map.removeEventListener("touchcancel", handlePinchEnd)
        map.removeEventListener("mousedown", handleMouseDown)
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
        map.removeEventListener("touchstart", handleTouchStart)
        map.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [scale, position, isDragging, startPos, startDistance])

  // Get background color based on time of day
  const getMapBackground = () => {
    switch (dayNightCycle) {
      case "morning":
        return "bg-gradient-to-b from-amber-200 to-emerald-300"
      case "day":
        return "bg-emerald-300"
      case "sunset":
        return "bg-gradient-to-b from-orange-300 to-purple-400"
      case "night":
        return "bg-gradient-to-b from-indigo-900 to-gray-900"
      default:
        return "bg-emerald-300"
    }
  }

  return (
    <div className="relative rounded-lg overflow-hidden border-2 border-emerald-800 bg-emerald-200 shadow-md">
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <Button variant="secondary" size="icon" onClick={zoomIn} className="h-8 w-8 bg-white/80">
          <Maximize className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={zoomOut} className="h-8 w-8 bg-white/80">
          <Minimize className="h-4 w-4" />
        </Button>
      </div>

      <div
        ref={mapRef}
        className="relative w-full h-[350px] overflow-hidden touch-none cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        <div
          className="absolute w-full h-full transition-transform duration-200"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transformOrigin: "center center",
          }}
        >
          {/* Map background with day/night cycle */}
          <div className={`relative w-full h-full ${getMapBackground()}`}>
            {/* Lake Katwe */}
            <div className="absolute top-[20%] left-[30%] w-32 h-32 bg-blue-400 rounded-full opacity-40">
              <div className="absolute inset-0 flex items-center justify-center text-xs text-blue-900 font-semibold">
                Lake Katwe
              </div>
            </div>

            {/* Maramagambo Forest */}
            <div className="absolute top-[60%] left-[20%] w-40 h-24 bg-green-800 rounded-lg opacity-40">
              <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-semibold">
                Maramagambo Forest
              </div>
            </div>

            {/* Ishasha Plains */}
            <div className="absolute top-[30%] left-[60%] w-32 h-24 bg-yellow-200 rounded-lg opacity-40">
              <div className="absolute inset-0 flex items-center justify-center text-xs text-yellow-800 font-semibold">
                Ishasha Plains
              </div>
            </div>

            {/* Rwenzori Mountains */}
            <div className="absolute top-[10%] left-[70%] w-24 h-24 bg-gray-400 rounded-lg opacity-40">
              <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-800 font-semibold">
                Rwenzori
              </div>
            </div>

            {/* Animal locations */}
            {animals.map((animal) => (
              <div
                key={animal.id}
                className="absolute cursor-pointer transform transition-transform hover:scale-110"
                style={{
                  top: animal.location.top,
                  left: animal.location.left,
                }}
                onClick={() => showAnimalInfo(animal)}
              >
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      protectedAnimals.includes(animal.id)
                        ? "bg-emerald-100 border-emerald-600"
                        : "bg-white border-amber-600"
                    }`}
                  >
                    <span className="text-lg">{animal.name.charAt(0)}</span>
                    {protectedAnimals.includes(animal.id) && (
                      <Shield className="absolute -bottom-1 -right-1 h-4 w-4 text-emerald-600 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <div
                      className={`w-3 h-3 rounded-full ${animal.threatLevel > 70 ? "bg-red-500" : "bg-yellow-500"}`}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add some wildlife tracks */}
            <div className="absolute top-[45%] left-[40%] w-20 h-1 bg-gray-700 opacity-30 rotate-45"></div>
            <div className="absolute top-[55%] left-[45%] w-20 h-1 bg-gray-700 opacity-30 rotate-[30deg]"></div>
            <div className="absolute top-[25%] left-[50%] w-16 h-1 bg-gray-700 opacity-30 rotate-[60deg]"></div>

            {/* Add some vegetation */}
            <div className="absolute top-[70%] left-[35%] w-3 h-3 bg-green-700 rounded-full"></div>
            <div className="absolute top-[72%] left-[37%] w-2 h-2 bg-green-700 rounded-full"></div>
            <div className="absolute top-[71%] left-[33%] w-2 h-2 bg-green-700 rounded-full"></div>

            <div className="absolute top-[40%] left-[75%] w-3 h-3 bg-green-700 rounded-full"></div>
            <div className="absolute top-[42%] left-[77%] w-2 h-2 bg-green-700 rounded-full"></div>
            <div className="absolute top-[41%] left-[73%] w-2 h-2 bg-green-700 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="p-2 bg-emerald-700 text-white text-sm">
        <p className="flex justify-between">
          <span>{isMobile ? "Pinch to zoom" : "Drag to move"} | Tap markers to learn about animals</span>
          <span>Queen Elizabeth National Park</span>
        </p>
      </div>
    </div>
  )
}
