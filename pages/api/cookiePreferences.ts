// pages/api/cookiePreferences.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { essential, analytics, marketing } = req.body;

    // Here, you would store the preferences in a database or any other storage mechanism
    // For this example, let's assume we set cookies directly

    // Set cookies for the preferences
    res.setHeader('Set-Cookie', [
        `essential=${essential}; HttpOnly; Max-Age=31536000; SameSite=Strict`,
        `analytics=${analytics}; HttpOnly; Max-Age=31536000; SameSite=Strict`,
        `marketing=${marketing}; HttpOnly; Max-Age=31536000; SameSite=Strict`,
    ]);

    res.status(200).json({ success: true });
}
