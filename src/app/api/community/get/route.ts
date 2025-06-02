import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try{
        const [rows] = await pool.execute<RowDataPacket[]>(
            "SELECT * FROM `community`"
        );

        return NextResponse.json(rows, { status: 200 });
    }catch(err){
        console.log(err);
        return NextResponse.json({ "response": 'DB error' }, { status: 500 });
    }
}