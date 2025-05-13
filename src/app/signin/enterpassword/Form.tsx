'use client';

import "./style.css";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Query = { session?: string; id?: string; };

export default function Form({
    session,
    id,
}: {
    session: string;
    id: string;
}) {
    const [username, setUsername] = useState<string>('');
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Misskey.ioからユーザーデータを取得
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch('https://misskey.io/api/i', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ i: session, id: id }),
                });
                const data = await res.json();
                setUsername(data.username);
                setAvatarUrl(data.avatarUrl);
                setDisplayName(data.name);
            } catch (error) {
                console.error('ユーザーデータの取得に失敗しました:', error);
            }
        };

        fetchUserData();
    }, [session, id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    password: password,
                }),
            });
            const data = await res.json();

            if (data.respose !== "Auth Verified") {
                alert("サインインに失敗しました: " + data.respose);
            } else {
                alert("サインインしました");
                window.location.href = "/";
            }
        } catch (error) {
            console.error('サインイン中にエラーが発生しました:', error);
        }
    };

    return (
        <div className="content has-text-centered">
            <h2>サインイン</h2>

            <form onSubmit={handleSubmit}>
                {avatarUrl && (
                    <Image
                        src={avatarUrl}
                        alt="アイコン"
                        width="80"
                        height="80"
                        style={{ borderRadius: "100%" }}
                    />
                )}

                {displayName && (
                    <p className="name">
                        {displayName}さん
                    </p>
                )}

                <label className="label">ユーザー名</label>
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
        </div>
    );
}