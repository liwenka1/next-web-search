"use client"

import { Settings } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Dock, DockIcon } from "@/components/ui/dock"
import { ThemeToggle } from "@/components/theme-toggle"
import SettingModal from "./components/setting-modal"
import { SocialConfig, WebsiteLinks } from "@/config/site"

const Footer = () => {
  const [isMobile, setisMobile] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        setisMobile(true)
      }
    }
  }, [])

  return (
    <TooltipProvider>
      <Dock direction="middle" iconDistance={isMobile ? 0 : 140}>
        {WebsiteLinks.map(({ icon: Icon, title, href }) => (
          <DockIcon key={title}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  target="_blank"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}
                >
                  <Icon className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        {SocialConfig.map(({ icon: Icon, title, href }) => (
          <DockIcon key={title}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  target="_blank"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}
                >
                  <Icon className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}>
                <SettingModal TriggerChild={<Settings className="size-5" />} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Setting</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <ThemeToggle />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </TooltipProvider>
  )
}

export default Footer
