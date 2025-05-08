import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function SignInAPI(request: Request) {
    /*const q = new URL(request.url).searchParams.get('q') || '';
    const [rows] = await pool.query('SELECT * FROM items WHERE name LIKE ?', [`%${q}%`]);*/
    
    return NextResponse.json("でけた");
}
