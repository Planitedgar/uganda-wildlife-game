import Game from "@/components/game"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-50 to-emerald-50">
      <h1 className="text-2xl font-bold text-emerald-800 mb-2">Uganda Wildlife Conservation</h1>
      <p className="text-sm text-center mb-4 max-w-md text-emerald-700">
        Explore Queen Elizabeth National Park, protect wildlife, and discover the ancient tales of Kintu
      </p>
      <Game />
    </main>
  )
}
