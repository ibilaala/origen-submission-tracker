import { StatsCards } from "@/components/stats-cards"
import { PermissionGuard } from "@/components/permission-guard"
import { getSubmissionStats } from "./actions/submissions"
import { getCurrentUser } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building, ArrowRight, Shield, User, Globe } from "lucide-react"

export default async function HomePage() {
  const currentUser = await getCurrentUser()
  const userRole = currentUser?.role || "anonymous"

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Submission Tracker</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Manage and track submissions from clients and companies with role-based access control.
        </p>

        {/* User status indicator */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-full">
            {userRole === "admin" ? (
              <>
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Admin Access</span>
              </>
            ) : userRole === "user" ? (
              <>
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Logged In</span>
              </>
            ) : (
              <>
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Anonymous User</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Permission-based stats display */}
      <PermissionGuard
        requiredRole="user"
        fallback={
          <Card className="text-center p-8">
            <CardContent>
              <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Statistics Available for Logged-in Users</h3>
              <p className="text-muted-foreground mb-4">
                Sign in to view submission statistics and manage your submissions.
              </p>
            </CardContent>
          </Card>
        }
        showLoginPrompt={false}
      >
        <StatsCards stats={await getSubmissionStats()} />
      </PermissionGuard>

      {/* Permission info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <CardTitle className="text-green-700 dark:text-green-400">Anonymous Users</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">
              <li>✅ Can submit forms</li>
              <li>❌ Cannot view submissions</li>
              <li>❌ Cannot view statistics</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-blue-700 dark:text-blue-400">Logged-in Users</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">
              <li>✅ Can submit forms</li>
              <li>✅ Can view own submissions</li>
              <li>✅ Can view own statistics</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-purple-700 dark:text-purple-400">Super Admin</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">
              <li>✅ Can submit forms</li>
              <li>✅ Can view all submissions</li>
              <li>✅ Can view all statistics</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle>For Clients</CardTitle>
            </div>
            <CardDescription>Individual client submissions and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Submit your information as an individual client. We'll collect your basic contact details and preferences.
            </p>
            <Button asChild className="w-full">
              <Link href="/for-clients">
                Go to Client Page
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Building className="h-6 w-6 text-primary" />
              <CardTitle>For Companies</CardTitle>
            </div>
            <CardDescription>Business submissions with company information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Submit information on behalf of your company. We'll collect your business details and your role within the
              organization.
            </p>
            <Button asChild className="w-full">
              <Link href="/for-companies">
                Go to Company Page
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
