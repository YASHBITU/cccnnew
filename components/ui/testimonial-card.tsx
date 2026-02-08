
import React from 'react';
import { cn } from "../../lib/utils"
import { Avatar, AvatarImage } from "./avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  author,
  text,
  href,
  className
}) => {
  const Card = (href ? 'a' : 'div') as any
  
  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "flex flex-col rounded-[2.5rem] border border-slate-200/60",
        "bg-white",
        "p-8 text-start sm:p-10",
        "hover:border-[#4285F4]/30",
        "w-[340px] md:w-[420px]",
        "transition-all duration-300 soft-shadow select-none",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 border-2 border-slate-50 shadow-sm">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start min-w-0">
          <h3 className="text-lg font-black leading-none truncate w-full text-slate-950">
            {author.name}
          </h3>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#4285F4] mt-1.5 truncate w-full opacity-80">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="text-sm sm:text-base mt-6 text-slate-600 font-medium leading-relaxed italic">
        "{text}"
      </p>
    </Card>
  )
}
