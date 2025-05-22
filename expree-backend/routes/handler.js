// routes/handler.js
const express = require("express")
const router = express.Router()
const axios = require("axios")

const GOOGLE_API_KEY ="AIzaSyDaE6b8QxYyHnWtOb6OUAVsRdW8-4SJh2U"
const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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"

// Update the route to accept a link parameter
router.post("/summarize-and-send", async (req, res) => {
  const { tasks, link } = req.body

  if (!tasks || !Array.isArray(tasks)) {
    return res.status(400).json({ error: "Tasks array is required" })
  }

  try {
    // Format the task list
    const taskList = tasks
      .map((task, i) => {
        const due = task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleDateString()}` : ""
        return `${i + 1}. ${task.title} [${task.completed ? "Completed" : "Pending"}] [${task.priority}] ${due}`
      })
      .join("\n")

    // Add link to the prompt if provided
    const linkSection = link ? `\n\nInclude this link in the summary: ${link}` : ""

    const prompt = `Summarize the following tasks in Markdown format with the following sections:
I. main detailed explanation of the tasks and proprly arranging them in a correct order for working and explaining them correctly
1. Overview (total, completed, pending)
2. High Priority Tasks
3. Completed Tasks
4. Pending Tasks${linkSection}


Tasks:
${taskList}`

    // 1. Call Gemini API
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      },
    )

    const summary = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated."

    // 2. Format Slack message with blocks
    const blocks = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "📋 Todo Summary",
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: summary,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `*Generated at:* ${new Date().toLocaleString()}`,
          },
        ],
      },
    ]

    // Check if webhook URL is provided in query params
    const webhookUrl = req.query?.webhookUrl || SLACK_WEBHOOK_URL

    // Only send to Slack if not just updating the summary
    if (!req.query?.summaryOnly) {
      // 3. Send to Slack
      await axios.post(webhookUrl, { blocks })
    }

    // 4. Respond to client
    res.json({ success: true, summary })
  } catch (error) {
    console.error("Error:", error.response?.data || error.message)
    res.status(500).json({
      error: "Something went wrong while summarizing or sending to Slack.",
      message: error.message,
    })
  }
})

module.exports = router
