// pages/api/games.ts

import { NextApiRequest, NextApiResponse } from 'next';

// Import necessary modules and interfaces here

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch('http://localhost:8080/http://localhost:3001');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }

        const data = await response.json();

        // Clean up the name field
        const cleanedData = data.map((game: any) => ({
            ...game,
            name: game.name.trim().replace(/[\n\t]/g, ''),
        }));

        res.status(200).json(cleanedData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
