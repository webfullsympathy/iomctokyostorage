'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "./style.css";

export default function EnterPasswordForm({
    username,
    session,
    id,
}: {
    username: string;
    session: string;
    id: string;
}) {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams({
            session: session,
            id: id,
            password: password,
        });
        const res = await fetch(`/api/signin?${params.toString()}`, {
            method: 'GET',
        });

        if (res.ok) {
            router.push('/');
        } else {
            const body = await res.json();
            setError(body.message || 'サインインに失敗しました');
        }
    };

    return (
        <div className="content has-text-centered">
            <h2>サインイン</h2>

            <form onSubmit={handleSubmit}>
                <label className="label">ユーザー名</label>
                <br />
                <input
                    type="text"
                    value={username}
                    disabled
                    className="input"
                />

                <br />

                <label>パスワード</label>
                <br />
                <input
                    type="password"
                    name="password"
                    required
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />

                <br />

                <button type="submit" className="button is-primary">サインイン</button>
            </form>

            {error && <p className="error">{error}</p>}
        </div>
    );
}
