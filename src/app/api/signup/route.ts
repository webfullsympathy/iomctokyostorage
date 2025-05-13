import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

import bcrypt from 'bcrypt';

import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { id, password } = body;

    if (!id) {
        return NextResponse.json({ "response": 'id is required' }, { status: 400 });
    }

    try {
        const [rows] = await pool.execute<RowDataPacket[]>(
            "SELECT * FROM users WHERE id = ?",[id]
        );

        if (rows.length > 0) {
            return NextResponse.json({ "response": 'User already exists' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [rows2] = await pool.execute<RowDataPacket[]>(
            "INSERT INTO `users` (`id`, `password`, `num`) VALUES ('" + id + "', '" + hashedPassword + "', NULL);"
        );
        
        return NextResponse.json({ "response": 'Account Created' }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ "response": 'DB error' }, { status: 500 });
    }
}
