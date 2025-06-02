import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';
import type { User } from '@/types/users';

import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

import { NextResponse, NextRequest } from 'next/server';
import { headers } from 'next/headers';

function findClientIPAddress(str: string): string {
	let arr: string[] = str.split(", ");
	let res = "";

	if (arr.length > 0) {
		res = arr[0];
		arr = res.split(":");
		if (arr.length > 0) {
			res = arr[arr.length - 1];
		}
	}
	return res;
}

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();

    const body = await request.json();
    const H = await headers();
    const { id, password, session } = body;

    if (!id) {
        return NextResponse.json({ "respose": 'id is required' }, { status: 400 });
    }

    try {
        const [rows] = await pool.execute<RowDataPacket[]>(
            "SELECT * FROM users WHERE id = ?",[id]
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

            const noticeRes = await fetch("https://misskey.io/api/notifications/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    body: `iomc東京倉庫ツールにログインされました。IPアドレス：${findClientIPAddress(H.get("X-Forwarded-For") || "")}`,
                    header: "iomc東京倉庫ツール",
                    i: session,
                }),
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
