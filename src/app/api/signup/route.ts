import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

import bcrypt from 'bcrypt';

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
    const H = await headers();
    const body = await request.json();
    const { id, password, session } = body;

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
            "INSERT INTO `users` (`id`, `password`, `num`, `token`) VALUES (?, ?, NULL, ?);",
            [id, hashedPassword, session]
        );
        
        await fetch("https://misskey.io/api/notifications/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                body: `iomc東京倉庫ツールのアカウントが作成されました。IPアドレス：${findClientIPAddress(H.get("X-Forwarded-For") || "")}`,
                header: "iomc東京倉庫ツール",
                i: session,
            }),
        });

        return NextResponse.json({ "response": 'Account Created' }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ "response": 'DB error' }, { status: 500 });
    }
}
