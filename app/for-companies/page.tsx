"use client"

import { useState, useEffect } from "react"
import { SubmissionForm } from "@/components/submission-form"
import { SubmissionsGrid } from "@/components/submissions-grid"
import { PermissionGuard } from "@/components/permission-guard"
import { getSubmissions } from "@/app/actions/submissions"
import { Building } from "lucide-react"
import type { Submission } from "@/lib/db"

export default function ForCompaniesPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  // Load initial submissions
  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const data = await getSubmissions("/for-companies")
        setSubmissions(data)
      } catch (error) {
        console.error("Error loading submissions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSubmissions()
  }, [])

  const handleNewSubmission = (newSubmission: Submission) => {
    // Add new submission to the top of the list (newest first)
    setSubmissions((prev) => [newSubmission, ...prev])
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Building className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Company Submissions</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Submit information on behalf of your company. View all company submissions below.
        </p>
      </div>

      {/* Anyone can submit (including anonymous users) */}
      <div className="flex justify-center">
        <SubmissionForm pagePath="/for-companies" onSuccess={handleNewSubmission} />
      </div>

      {/* Only logged-in users can view submissions */}
      <PermissionGuard requiredRole="user">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Your Submissions ({submissions.length})</h2>
          {loading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <SubmissionsGrid initialSubmissions={submissions} pagePath="/for-companies" />
          )}
        </div>
      </PermissionGuard>
    </div>
  )
}
