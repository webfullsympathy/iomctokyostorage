import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { users } = await request.json();
    
    try {
        const userDataMap: {
            [key: string]: any
        } = {};
        
        for (const userId of users) {
            const [tokenRows] = await pool.execute<RowDataPacket[]>(
                "SELECT token FROM users WHERE id = ?",
                [userId]
            );
            const token = tokenRows[0]?.token;
            
            const res = await fetch(`https://misskey.io/api/i`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    i: token,
                    id: userId,
                })
            });
            const data = await res.json();
            userDataMap[userId] = data;
        }
        
        return NextResponse.json(userDataMap);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
    }
}