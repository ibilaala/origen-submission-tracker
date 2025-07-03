"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Globe, Link } from "lucide-react"
import type { Submission } from "@/lib/db"
import { getGravatarUrl, getPravatarUrl } from "@/lib/utils/avatar"

interface SubmissionCardProps {
  submission: Submission
}

export function SubmissionCard({ submission }: SubmissionCardProps) {
  const [avatarError, setAvatarError] = useState(false)
  const [pravatarError, setPravatarError] = useState(false)

  const gravatarUrl = getGravatarUrl(submission.email, 80)
  const pravatarUrl = getPravatarUrl(submission.email, 80)

  const initials = submission.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleGravatarError = () => {
    setAvatarError(true)
  }

  const handlePravatarError = () => {
    setPravatarError(true)
  }

  return (
    <Card className="overflow-hidden border border-border/50 bg-card hover:shadow-lg transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-4">
      {/* Header section with blurred background */}
      <div className="relative h-32 bg-gradient-to-br from-muted/50 to-muted/80 dark:from-muted/20 dark:to-muted/40">
        {/* Blurred background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/60 to-background/40 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative p-6 flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-background shadow-lg">
            {!avatarError && (
              <AvatarImage
                src={gravatarUrl || "/placeholder.svg"}
                alt={submission.name}
                onError={handleGravatarError}
              />
            )}
            {avatarError && !pravatarError && (
              <AvatarImage
                src={pravatarUrl || "/placeholder.svg"}
                alt={submission.name}
                onError={handlePravatarError}
              />
            )}
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate">{submission.name}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {submission.company_name && submission.position
                ? `${submission.position} @ ${submission.company_name}`
                : submission.company_name || "Individual Client"}
            </p>
          </div>
        </div>
      </div>

      {/* Details section */}
      <CardContent className="p-6 space-y-4">
        {/* Email */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            <Mail className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">Email</p>
            <p className="text-sm text-muted-foreground truncate">{submission.email}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            <Phone className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">Phone</p>
            <p className="text-sm text-muted-foreground">{submission.phone}</p>
          </div>
        </div>

        {/* Accepts marketing */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            <Globe className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">Accepts marketing</p>
            <p className="text-sm text-muted-foreground">{submission.accepts_marketing ? "Yes" : "No"}</p>
          </div>
        </div>

        {/* Page source */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            <Link className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">Page source</p>
            <p className="text-sm text-muted-foreground font-mono">{submission.page_path}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
