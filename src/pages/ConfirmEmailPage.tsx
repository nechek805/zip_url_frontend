import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { confirmEmail } from "@/api/auth"
import type { ApiError } from "@/types"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ConfirmEmailPage() {
  const [params] = useSearchParams()
  const token = params.get("token") ?? ""
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("No confirmation token found in the URL.")
      return
    }
    confirmEmail(token)
      .then((res) => {
        setMessage(res.message)
        setStatus("success")
      })
      .catch((err: ApiError) => {
        setMessage(err.message ?? "Confirmation failed.")
        setStatus("error")
      })
  }, [token])

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email confirmation</CardTitle>
          <CardDescription>
            {status === "loading" && "Confirming your email…"}
            {status === "success" && (
              <>
                {message}{" "}
                <Link to="/login" className="text-primary underline">
                  Log in now
                </Link>
                .
              </>
            )}
          </CardDescription>
        </CardHeader>
        {status === "error" && (
          <div className="px-6 pb-6">
            <Alert variant="destructive">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          </div>
        )}
      </Card>
    </div>
  )
}
