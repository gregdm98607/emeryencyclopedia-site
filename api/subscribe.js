export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, source } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const API_SECRET = process.env.CONVERTKIT_API_SECRET;

  // Route to per-chapter tag when source === "chapter", otherwise use generic EEC tag.
  // CONVERTKIT_TAG_ID_CHAPTERS: tag ID for subscribers from chapter pages (eec-chapters).
  // CONVERTKIT_EEC_TAG_ID: tag ID for general site subscribers (eec-swell-report).
  const TAG_ID =
    source === 'chapter'
      ? process.env.CONVERTKIT_TAG_ID_CHAPTERS
      : process.env.CONVERTKIT_EEC_TAG_ID;

  if (!API_SECRET || !TAG_ID) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/tags/${TAG_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_secret: API_SECRET, email }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      return res.status(response.status).json({ error: data.message || 'Subscription failed' });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: 'Subscription failed' });
  }
}
