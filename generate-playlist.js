export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { artist, theme, startBpm, playlistLength } = req.body
  const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `You are a hip-hop music expert for spin instructors. Generate a playlist of ${playlistLength} songs by or featuring ${artist} for a spin class themed "${theme}". 

Start at ${startBpm} BPM and increase by approximately 10 BPM each song, creating a natural intensity arc from warm-up through peak and into cool-down.

Format each song EXACTLY like this on a new line, with no other text:
SONG_NAME | ARTIST | BPM | ENERGY_LEVEL

Use energy levels: warm-up, building, peak, or cool-down

Only output the songs in this format, no explanations or extra text.`,
          },
        ],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('API Error:', data)
      return res
        .status(response.status)
        .json({ error: 'Failed to generate playlist' })
    }

    const content = data.content[0]?.text || ''

    // Parse the response
    const songs = content
      .split('\n')
      .filter((line) => line.trim())
      .map((line, i) => {
        const parts = line.split('|').map((p) => p.trim())
        return {
          name: parts[0] || `Song ${i + 1}`,
          artist: parts[1] || artist,
          bpm: parseInt(parts[2]) || startBpm + i * 10,
          energy: parts[3] || 'building',
        }
      })

    res.status(200).json({ songs })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to generate playlist' })
  }
}
