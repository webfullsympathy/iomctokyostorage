import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';
import type { User } from '@/types/users';

import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();

    const body = await request.json();
    const { id, password } = body;

    if (!id) {
        return NextResponse.json({ "respose": 'id is required' }, { status: 400 });
    }

    try {
        const [rows] = await pool.execute<RowDataPacket[]>(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return NextResponse.json({ "respose": 'User not found' }, { status: 404 });
        }

        const user = rows[0] as User;

        if(await bcrypt.compare(password, user.password)){
            cookieStore.set({
                name: 'user',
                value: id,
                httpOnly: true,
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                sameSite: 'lax',
            });

            cookieStore.set({
                name: 'password',
                value: password,
                httpOnly: true,
                secure: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                sameSite: 'lax',
            });

            return NextResponse.json({ "respose": 'Auth Verified' }, { status: 200 });
        }else{
            return NextResponse.json({ "respose": 'Password Not Matched' }, { status: 401 });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ "respose": 'DB error' }, { status: 500 });
    }
}
