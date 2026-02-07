import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message?: string;
    trade?: any;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const filePath = path.join(process.cwd(), "data", "trades.json");
    const fileData = fs.readFileSync(filePath, 'utf8');
    const trades = JSON.parse(fileData);

    const { userId, pair, result, notes, type, entry, exit } = req.body;

    const newTrade = {
        id: Date.now(),
        userId,
        pair,
        type, // 'long' | 'short'
        entry: Number(entry),
        exit: Number(exit),
        result,
        notes,
        createdAt: new Date(),
    };

    trades.push(newTrade);

    fs.writeFileSync(filePath, JSON.stringify(trades, null, 2));

    res.status(200).json({ message: "Trade added", trade: newTrade });
}
