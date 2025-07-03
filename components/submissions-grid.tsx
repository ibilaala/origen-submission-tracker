"use client"

import { useState, useEffect } from "react"
import type { Submission } from "@/lib/db"
import { SubmissionCard } from "./submission-card"
import { Users } from "lucide-react"

interface SubmissionsGridProps {
  initialSubmissions: Submission[]
  pagePath?: string
}

export function SubmissionsGrid({ initialSubmissions, pagePath }: SubmissionsGridProps) {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions)

  // Update submissions when initialSubmissions change (from server)
  useEffect(() => {
    setSubmissions(initialSubmissions)
  }, [initialSubmissions])

  const addSubmission = (newSubmission: Submission) => {
    setSubmissions((prev) => [newSubmission, ...prev])
  }

  // Expose the addSubmission function to parent components
  useEffect(() => {
    // Store the function in a way that parent components can access it
    if (typeof window !== "undefined") {
      ;(window as any).addSubmissionToGrid = addSubmission
    }
  }, [])

  if (submissions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
          <Users className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No submissions yet</h3>
        <p className="text-muted-foreground">Be the first to submit your information!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {submissions.map((submission, index) => (
        <div
          key={submission.id}
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          <SubmissionCard submission={submission} />
        </div>
      ))}
    </div>
  )
}
