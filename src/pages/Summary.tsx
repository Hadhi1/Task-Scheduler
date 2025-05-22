"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import type { Todo } from "@/types/Todo"
import { useToast } from "@/hooks/use-toast"
import { toast } from "sonner"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import axios from "axios"

const Summary = () => {
  const [summary, setSummary] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState(
    "https://hooks.slack.com/services/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",
  )
  const [isSending, setIsSending] = useState(false)
  const { toast: uiToast } = useToast()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [link, setLink] = useState<string>("")

  const fetchTasks = async () => {
    if (!user) throw new Error("User not authenticated")

    const { data, error } = await supabase.from("tasks").select("*")

    if (error) throw error

    // Convert database rows to Todo objects
    return data.map(
      (task): Todo => ({
        id: task.id,
        title: task.title,
        description: task.description || "",
        completed: task.completed,
        dueDate: task.due_date ? new Date(task.due_date) : null,
        priority: (task.priority || "medium") as "low" | "medium" | "high",
        createdAt: new Date(task.created_at),
      }),
    )
  }

  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos", user?.id],
    queryFn: fetchTasks,
    enabled: !!user,
  })

  useEffect(() => {
    // Generate summary automatically when todos are loaded
    if (todos.length > 0 && !isGenerating && !summary) {
      generateSummary()
    }
  }, [todos])

  const generateSummary = async () => {
    if (todos.length === 0) {
      toast.error("No tasks available to summarize")
      return
    }

    setIsGenerating(true)

    try {
      // Format tasks for the API
      const tasksForApi = todos.map((todo) => ({
        title: todo.title,
        completed: todo.completed,
        priority: todo.priority,
        dueDate: todo.dueDate ? todo.dueDate.toISOString() : null,
      }))

      // Call our backend API that uses Gemini
      const response = await axios.post(
        "https://backend-nl2k.onrender.com/api/summarize-and-send",
        {
          tasks: tasksForApi,
          link: link,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (response.data.summary) {
        setSummary(response.data.summary)
        toast.success("Summary generated successfully")
      } else {
        toast.error("Failed to generate summary")
      }
    } catch (error) {
      console.error("Error generating summary:", error)
      toast.error("Error generating summary. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSendToSlack = async () => {
    if (todos.length === 0) {
      toast.error("No tasks available to send")
      return
    }

    setIsSending(true)

    try {
      // Format tasks for the API
      const tasksForApi = todos.map((todo) => ({
        title: todo.title,
        completed: todo.completed,
        priority: todo.priority,
        dueDate: todo.dueDate ? todo.dueDate.toISOString() : null,
      }))

      // Use custom webhook URL if provided, otherwise use the default from the API
      const apiUrl =
        webhookUrl !== "https://hooks.slack.com/services/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"
          ? "https://backend-nl2k.onrender.com/api/summarize-and-send?webhookUrl=" + encodeURIComponent(webhookUrl)
          : "https://backend-nl2k.onrender.com/api/summarize-and-send"

      // Call our backend API
      const response = await axios.post(apiUrl, {
        tasks: tasksForApi,
        link: link,
      })

      if (response.data.success) {
        toast.success("Your task summary was shared to Slack successfully")
      } else {
        toast.error("Failed to send to Slack")
      }
    } catch (error) {
      console.error("Error sending to Slack:", error)
      toast.error("Error sending to Slack. Please check your webhook URL and try again.")
    } finally {
      setIsSending(false)
    }
  }

  const handleRegenerateSummary = () => {
    generateSummary()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-red-50 p-6 rounded-lg border border-red-200 max-w-lg mx-auto">
            <h2 className="text-xl font-medium text-red-800 mb-2">Error loading tasks</h2>
            <p className="text-red-700">{(error as Error).message}</p>
            <Button onClick={() => navigate("/todos")} className="mt-4">
              Back to Tasks
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-inter font-bold mb-4 md:mb-0">Task Summary</h1>
            <Button onClick={handleRegenerateSummary} variant="outline" disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Regenerate Summary"}
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-inter">AI-Generated Summary NOTE : Backend deployed in render so take time to load the instance may be 2 to 3 mainues </CardTitle>
              <CardDescription>
                Here's a summary of your tasks generated by Google Gemini AI that you can share with your team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[85%]" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
              ) : (
                <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-100 font-mono text-sm">
                  {summary}
                </div>
              )}
            </CardContent>
          </Card>

         

          <Card>
            <CardHeader>
              <CardTitle className="font-inter">Share to Slack</CardTitle>
              <CardDescription>The summary will be sent to Slack using the webhook URL below.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor="webhook">Slack Webhook URL</Label>
                <Input
                  id="webhook"
                  placeholder="https://hooks.slack.com/services/..."
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Don't have a webhook? Learn how to create one in the{" "}
                  <a
                    href="https://api.slack.com/messaging/webhooks"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Slack documentation
                  </a>
                  .
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/todos")}>
                Back to Tasks
              </Button>
              <Button onClick={handleSendToSlack} disabled={isGenerating || isSending || !summary}>
                {isSending ? "Sending..." : "Send to Slack"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Summary
