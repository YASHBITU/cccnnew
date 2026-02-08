
"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"

interface NavItem {
  name: string
  id: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  onNavigate: (id: string) => void
  activeTab: string
}

export function TubelightNavBar({ items, className, onNavigate, activeTab }: NavBarProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 md:top-0 left-1/2 -translate-x-1/2 z-[200] mb-6 md:pt-6 h-fit pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center gap-1 md:gap-3 bg-white/80 border border-slate-200/50 backdrop-blur-xl py-1.5 px-1.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] pointer-events-auto">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "relative cursor-pointer text-[10px] md:text-sm font-black px-4 md:px-6 py-2 md:py-2.5 rounded-full transition-all duration-300 uppercase tracking-widest",
                "text-slate-400 hover:text-[#4285F4]",
                isActive && "text-[#4285F4]",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-[#4285F4]/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#4285F4] rounded-t-full shadow-[0_0_15px_#4285F4]">
                    <div className="absolute w-12 h-6 bg-[#4285F4]/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-[#4285F4]/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-[#4285F4]/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
