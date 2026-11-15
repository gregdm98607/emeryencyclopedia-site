export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, source, name, township, preorder } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const API_SECRET = process.env.CONVERTKIT_API_SECRET;

  // Route to per-chapter tag when source === "chapter", otherwise use generic EEC tag.
  // CONVERTKIT_TAG_ID_CHAPTERS: tag ID for subscribers from chapter pages (eec-chapters).
  // CONVERTKIT_EEC_TAG_ID: tag ID for general site subscribers (eec-swell-report).
  // CONVERTKIT_TAG_ID_ATLAS: tag ID for Reserve signals from the settler atlas sample page
  // (source === "atlas", W-CCO-206 / BID-R-011). No fallback: an atlas signal is never
  // filed under the general tag, so the count stays clean.
  const TAG_ID =
    source === 'atlas'
      ? process.env.CONVERTKIT_TAG_ID_ATLAS
      : source === 'chapter'
        ? process.env.CONVERTKIT_TAG_ID_CHAPTERS
        : process.env.CONVERTKIT_EEC_TAG_ID;

  // Atlas reserve form: name plus two custom fields (create both in Kit first).
  const clip = (v, n) => (typeof v === 'string' ? v.trim().slice(0, n) : '');
  const extra =
    source === 'atlas'
      ? {
          first_name: clip(name, 100),
          fields: {
            atlas_next_township: clip(township, 200),
            atlas_preorder_19: preorder === true ? 'yes' : 'no',
          },
        }
      : {};

  if (!API_SECRET || !TAG_ID) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/tags/${TAG_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept-Encoding': 'gzip' },
        body: JSON.stringify({ api_secret: API_SECRET, email, ...extra }),
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
