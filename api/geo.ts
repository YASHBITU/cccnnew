import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    // Vercel adds the 'x-vercel-ip-country' header automatically
    const countryCode = req.headers['x-vercel-ip-country'] || 'UNKNOWN';

    // Return the detected country code
    res.status(200).json({ country: countryCode });
}
