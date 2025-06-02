import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { id, value } = await request.json();

    try{
        const [rows] = await pool.execute<RowDataPacket[]>(
            "INSERT INTO `community` (`user`, `value`, `time`, `num`) VALUES (?, ?, CURRENT_TIMESTAMP(3), NULL);",
            [id, value]
        );

        return NextResponse.json({"response": 'Successfully Posted'}, { status: 200 });
    }catch(err){
        console.log(err);
        return NextResponse.json({ "response": 'DB error' }, { status: 500 });
    }
}