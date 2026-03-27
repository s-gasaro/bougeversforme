exports.handler = async function(event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { goal, level, schedule } = JSON.parse(event.body)

    const scheduleText = Object.entries(schedule)
      .filter(([, value]) => value.trim() !== '')
      .map(([day, activity]) => `${day}: ${activity}`)
      .join('\n')

    const prompt = `
You are a professional fitness coach. Based on the user's profile below,
create a personalized weekly workout plan.

User Profile:
- Goal: ${goal}
- Fitness Level: ${level}
- Weekly Schedule:
${scheduleText}

Create a workout plan that:
1. Fits around their existing schedule
2. Matches their fitness level
3. Helps them achieve their goal
4. Includes specific exercises, duration, and intensity for each workout day
5. Includes rest days where appropriate

Format your response as a JSON object like this:
{
  "summary": "A 2-3 sentence overview of the plan",
  "days": {
    "Lundi": { "type": "workout or rest", "title": "workout name", "duration": "45 min", "exercises": ["exercise 1", "exercise 2"] },
    "Mardi": { ... },
    ...
  }
}

Only respond with the JSON, nothing else.
    `

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    const text = data.content[0].text
    const clean = text.replace(/```json|```/g, '').trim()

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(JSON.parse(clean)),
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}