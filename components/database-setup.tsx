"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, Database, CheckCircle, AlertCircle, Zap } from "lucide-react"
import { initializeDatabase, testDatabaseConnection } from "@/lib/db-setup"

export function DatabaseSetup() {
  const [isInitializing, setIsInitializing] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [status, setStatus] = useState<{
    type: "success" | "error" | "info" | null
    message: string
  }>({ type: null, message: "" })

  const handleTestConnection = async () => {
    setIsTesting(true)
    setStatus({ type: null, message: "" })

    const result = await testDatabaseConnection()
    setStatus({
      type: result.success ? "success" : "error",
      message: result.success ? result.message : result.error || "Unknown error",
    })
    setIsTesting(false)
  }

  const handleInitialize = async () => {
    setIsInitializing(true)
    setStatus({ type: null, message: "" })

    const result = await initializeDatabase()
    setStatus({
      type: result.success ? "success" : "error",
      message: result.success ? result.message : result.error || "Unknown error",
    })
    setIsInitializing(false)
  }

  return (
    <Card className="mb-8 border-green-200 dark:border-green-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-green-600" />
            <CardTitle className="text-green-700 dark:text-green-400">Your Neon Database</CardTitle>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Pre-configured ✅
          </Badge>
        </div>
        <CardDescription>Your Neon database connection is already set up and ready to use!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Alert */}
        {status.type && (
          <Alert variant={status.type === "error" ? "destructive" : "default"}>
            {status.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertDescription>{status.message}</AlertDescription>
          </Alert>
        )}

        {/* Database Info */}
        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-4 w-4 text-green-600" />
            <h4 className="font-medium text-green-800 dark:text-green-200">Database Status</h4>
          </div>
          <ul className="text-sm space-y-1 text-green-700 dark:text-green-300">
            <li>✅ Neon PostgreSQL database connected</li>
            <li>✅ Connection string configured</li>
            <li>✅ Ready for testing</li>
          </ul>
        </div>

        {/* Quick Test Instructions */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">🚀 Quick Test Steps:</h4>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>Click "Test Connection" to verify database access</li>
            <li>Click "Initialize Database" to create tables and sample data</li>
            <li>Go to homepage and test form submissions</li>
            <li>Check your Neon dashboard to see the data!</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button onClick={handleTestConnection} disabled={isTesting} variant="outline">
            {isTesting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Test Connection
          </Button>
          <Button onClick={handleInitialize} disabled={isInitializing} className="bg-green-600 hover:bg-green-700">
            {isInitializing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Initialize Database
          </Button>
        </div>

        {/* Connection Details */}
        <div className="bg-muted p-3 rounded text-sm">
          <div className="text-muted-foreground mb-1">Database: Neon PostgreSQL</div>
          <div className="text-muted-foreground">Region: AWS US East 1</div>
          <div className="text-muted-foreground">Status: Connected ✅</div>
        </div>
      </CardContent>
    </Card>
  )
}
