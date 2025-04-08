"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Volume2, Globe, Moon, Clock } from "lucide-react"

export default function SettingsPanel({ gameSpeed = 1, setGameSpeed }) {
  const [notifications, setNotifications] = useState(true)
  const [sound, setSound] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [volume, setVolume] = useState([70])
  const [language, setLanguage] = useState("english")
  const [speed, setSpeed] = useState([gameSpeed * 50])

  const handleSpeedChange = (value) => {
    setSpeed(value)
    setGameSpeed(value[0] / 50)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Settings</h2>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Game Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <Label>Game Speed</Label>
            </div>
            <Slider value={speed} onValueChange={handleSpeedChange} max={100} step={25} />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Slow</span>
              <span>Normal</span>
              <span>Fast</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <Label htmlFor="notifications">Notifications</Label>
            </div>
            <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4" />
              <Label htmlFor="sound">Sound Effects</Label>
            </div>
            <Switch id="sound" checked={sound} onCheckedChange={setSound} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Moon className="h-4 w-4" />
              <Label htmlFor="darkMode">Dark Mode</Label>
            </div>
            <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4" />
              <Label>Volume</Label>
            </div>
            <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <Label>Language</Label>
            </div>
            <select
              className="w-full p-2 border rounded-md"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="english">English</option>
              <option value="swahili">Swahili</option>
              <option value="luganda">Luganda</option>
              <option value="french">French</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
          <Button variant="outline" className="w-full">
            Privacy Settings
          </Button>
          <Button variant="destructive" className="w-full">
            Reset Progress
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
