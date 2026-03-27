// generatePlan.js — AI Plan Generator
//
// Instead of calling the Anthropic API directly from the browser
// (which would expose our API key), we now call our own Netlify
// serverless function which makes the API call securely on the server.

export async function generatePlan({ goal, level, schedule }) {
  const response = await fetch('/.netlify/functions/generate-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goal, level, schedule }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate plan')
  }

  return response.json()
}