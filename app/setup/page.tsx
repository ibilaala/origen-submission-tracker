import { DatabaseSetup } from "@/components/database-setup"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Zap, Shield, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SetupPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">🚀 Ready to Test!</h1>
        <p className="text-lg text-muted-foreground">
          Your submission tracker is configured with Neon database and ready for testing
        </p>
      </div>

      <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <Zap className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          <strong>Database pre-configured!</strong> Your Neon database connection is already set up. Just initialize and
          start testing.
        </AlertDescription>
      </Alert>

      <DatabaseSetup />

      {/* Quick Start Guide */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-700 dark:text-blue-400">🧪 Testing Guide</CardTitle>
          <CardDescription>Follow these steps to test all features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">1. Initialize Database</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Click "Test Connection" above</li>
                <li>• Click "Initialize Database"</li>
                <li>• Creates tables + sample data</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">2. Test Forms</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Submit client forms</li>
                <li>• Submit company forms</li>
                <li>• Data saves to Neon database</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex space-x-2">
            <Button asChild>
              <Link href="/for-clients">
                Test Client Forms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/for-companies">
                Test Company Forms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feature Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <CardTitle className="text-lg">Instant Testing</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Database is pre-configured. Just initialize and start testing immediately.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <CardTitle className="text-lg">Data Persistence</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All form submissions are saved to your Neon PostgreSQL database.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg">Production Ready</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Deploy to Vercel, Netlify, or any platform with zero additional configuration.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* What You Can Test */}
      <Card>
        <CardHeader>
          <CardTitle>✅ What You Can Test Right Now</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-green-600">✅ Working Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Form submissions (anonymous)</li>
                <li>• Data persistence in Neon</li>
                <li>• Beautiful responsive UI</li>
                <li>• Dark/light theme toggle</li>
                <li>• Form validation</li>
                <li>• Statistics display</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-orange-600">🔒 Requires Authentication</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Viewing submissions</li>
                <li>• User-specific data</li>
                <li>• Admin features</li>
                <li>• Role-based permissions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
