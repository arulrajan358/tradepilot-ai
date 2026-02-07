import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

type Data = {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, email, password } = req.body;

    try {
        // Check if user exists
        const { data: existingUser, error: searchError } = await supabase
            .from("users")
            .select("email")
            .eq("email", email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { error: insertError } = await supabase
            .from("users")
            .insert([
                {
                    name,
                    email,
                    password: hashedPassword, // Storing hashed password
                    created_at: new Date().toISOString(),
                },
            ]);

        if (insertError) {
            throw insertError;
        }

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Register API Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
