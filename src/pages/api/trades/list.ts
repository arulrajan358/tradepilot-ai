import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const filePath = path.join(process.cwd(), "data", "trades.json");

    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const trades = JSON.parse(fileData);

        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: "User ID required" });
        }

        const userTrades = trades.filter(
            (trade: any) => trade.userId == userId
        );

        res.status(200).json(userTrades);
    } catch (error) {
        res.status(500).json({ message: "Error reading data" });
    }
}
