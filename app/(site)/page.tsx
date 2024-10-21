"use client"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

const Site = () => {
  const { setTheme } = useTheme()

  return (
    <div>
      <Button onClick={() => setTheme("system")}>System</Button>
      <Button onClick={() => setTheme("light")}>light</Button>
      <Button onClick={() => setTheme("dark")}>dark</Button>
    </div>
  )
}

export default Site
