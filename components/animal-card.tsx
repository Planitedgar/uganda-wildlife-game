"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

export default function AnimalCard({ animal, onClick }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <img
          src={animal.image || "/placeholder.svg"}
          alt={animal.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{animal.name}</h3>
            <p className="text-sm text-red-500">{animal.status}</p>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs text-white ${animal.threatLevel > 70 ? "bg-red-500" : "bg-yellow-500"}`}
          >
            {animal.threatLevel > 70 ? "High Risk" : "At Risk"}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pb-4 px-4 pt-0">
        <Button onClick={onClick} variant="outline" className="w-full flex items-center gap-2">
          <Info className="h-4 w-4" /> View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
