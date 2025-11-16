"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/images/ise-logo-official.png" alt="ISE Logo" className="w-16 h-16 object-contain" />
          </div>
        </div>

        <Card className="glass-effect border-blue-200 dark:border-gray-700 shadow-2xl">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-center text-blue-700 dark:text-blue-300">Check Your Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">
                We've sent you a confirmation email. Please check your inbox and click the confirmation link to activate
                your account.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don't forget to check your spam folder if you don't see the email.
              </p>
            </div>

            <div className="pt-4">
              <Link href="/auth/login">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Go to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
