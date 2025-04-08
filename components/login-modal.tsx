"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginModal({ open, onOpenChange, onLogin }) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Please enter your name")
      return
    }

    onLogin(name)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Uganda Wildlife Conservation</DialogTitle>
          <DialogDescription>Enter your name to begin your journey as a wildlife guardian.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError("")
                }}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Start Adventure</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
