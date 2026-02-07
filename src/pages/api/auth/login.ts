import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

type Data = {
    message: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password } = req.body;

    try {
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (error || !user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login API Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
