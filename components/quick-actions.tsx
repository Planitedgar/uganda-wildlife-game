"use client"

import { Button } from "@/components/ui/button"
import { Camera, Heart, Info, MapPin, Share2 } from "lucide-react"

export default function QuickActions({ onInfoClick }) {
  return (
    <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm mt-2">
      <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1" onClick={onInfoClick}>
        <Info className="h-4 w-4 mb-1" />
        <span className="text-xs">Info</span>
      </Button>

      <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1">
        <Camera className="h-4 w-4 mb-1" />
        <span className="text-xs">Photo</span>
      </Button>

      <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1">
        <MapPin className="h-4 w-4 mb-1" />
        <span className="text-xs">Track</span>
      </Button>

      <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1">
        <Heart className="h-4 w-4 mb-1" />
        <span className="text-xs">Donate</span>
      </Button>

      <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1">
        <Share2 className="h-4 w-4 mb-1" />
        <span className="text-xs">Share</span>
      </Button>
    </div>
  )
}
