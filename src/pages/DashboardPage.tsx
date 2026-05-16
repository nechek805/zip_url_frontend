import { useState } from "react"
import { ExternalLink, Link2, Shield } from "lucide-react"
import { createZipUrl } from "@/api/urls"
import { useAuth } from "@/context/AuthContext"
import type { ApiError } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CopyButton } from "@/components/CopyButton"

function formatDate(iso: string) {
  return new Date(iso).toLocaleString()
}

function truncate(url: string, max = 60) {
  return url.length > max ? url.slice(0, max) + "…" : url
}

export function DashboardPage() {
  const { user, refreshUser } = useAuth()
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<{ original: string; short: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleShorten(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const res = await createZipUrl(url)
      setResult({ original: res.originalUrl, short: res.zipped_url })
      setUrl("")
      await refreshUser()
    } catch (err) {
      const apiErr = err as ApiError
      setError(apiErr.message ?? "Failed to shorten URL.")
    } finally {
      setLoading(false)
    }
  }

  const zipUrls = user?.zip_urls ?? []
  const sessions = user?.sessions ?? []

  return (
    <div className="space-y-8">
      {/* Shorten section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            Shorten a URL
          </CardTitle>
          <CardDescription>Paste any long URL and get a short link instantly.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleShorten} className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/very/long/url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Shortening…" : "Shorten"}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert className="mt-4 border-green-500/50 text-green-700 dark:text-green-400">
              <AlertDescription>
                <p className="mb-1 font-medium">Your short link is ready!</p>
                <div className="flex items-center gap-2 break-all">
                  <a
                    href={result.short}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-primary underline"
                  >
                    {result.short}
                  </a>
                  <CopyButton text={result.short} />
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Links table */}
      <Card>
        <CardHeader>
          <CardTitle>My Links</CardTitle>
          <CardDescription>{zipUrls.length} shortened URL{zipUrls.length !== 1 ? "s" : ""}</CardDescription>
        </CardHeader>
        <CardContent>
          {zipUrls.length === 0 ? (
            <p className="text-sm text-muted-foreground">No links yet. Shorten one above!</p>
          ) : (
            <div className="divide-y">
              {[...zipUrls].reverse().map((item) => (
                <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <a
                      href={item.zipped_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      {item.zipped_url}
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                    <p className="text-xs text-muted-foreground truncate mt-0.5" title={item.original_url}>
                      {truncate(item.original_url)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">{formatDate(item.created_at)}</span>
                    <CopyButton text={item.zipped_url} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>{sessions.length} active session{sessions.length !== 1 ? "s" : ""}</CardDescription>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active sessions.</p>
          ) : (
            <div className="space-y-2">
              {sessions.map((session, i) => (
                <div key={session.id}>
                  <div className="flex items-center justify-between py-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">
                        Started: <span className="text-foreground">{formatDate(session.created_at)}</span>
                      </p>
                      <p className="text-muted-foreground">
                        Expires: <span className="text-foreground">{formatDate(session.expires_at)}</span>
                      </p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  {i < sessions.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
