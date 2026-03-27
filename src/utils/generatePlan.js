export async function generatePlan({ goal, level, schedule }) {
  const scheduleText = Object.entries(schedule)
    .filter(([, value]) => value.trim() !== '')
    .map(([day, activity]) => `${day}: ${activity}`)
    .join('\n')

  // Use Netlify function in production, direct API call locally
  const isLocal = window.location.hostname === 'localhost'

  if (isLocal) {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1500,
        messages: [{ role: 'user', content: buildPrompt(goal, level, scheduleText) }],
      }),
    })
    const data = await response.json()
    const text = data.content[0].text
    const clean = text.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)

  } else {
    const response = await fetch('/.netlify/functions/generate-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal, level, schedule }),
    })
    if (!response.ok) throw new Error('Failed to generate plan')
    return response.json()
  }
}

function buildPrompt(goal, level, scheduleText) {
  return `
You are a professional fitness coach. Based on the user's profile below,
create a personalized weekly workout plan.

User Profile:
- Goal: ${goal}
- Fitness Level: ${level}
- Weekly Schedule:
${scheduleText}

Create a workout plan that fits their schedule, matches their level, and helps achieve their goal.
Include specific exercises, duration, and intensity for each workout day and rest days where appropriate.

Format your response as a JSON object like this:
{
  "summary": "A 2-3 sentence overview of the plan",
  "days": {
    "Lundi": { "type": "workout or rest", "title": "workout name", "duration": "45 min", "exercises": ["exercise 1", "exercise 2"] },
    "Mardi": { "type": "rest", "title": "Rest Day", "duration": "-", "exercises": [] }
  }
}

Only respond with the JSON, nothing else.
  `
}