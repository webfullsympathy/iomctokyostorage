"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from 'js-cookie';

export default function CreatePost() {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const userId = Cookies.get('user');
        if (userId === null) {
            router.push('/signin');
            return;
        }

        try {
            const res = await fetch("/api/community/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: userId,
                    value: value
                }),
            });

            if (res.ok) {
                router.push("/community");
                router.refresh();
            } else {
                alert("投稿に失敗しました");
            }
        } catch (error) {
            console.error(error);
            alert("エラーが発生しました");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container section">
            <div className="columns is-centered">
                <div className="column is-two-fifths">
                    <h1 className="title">新規投稿</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    placeholder="投稿内容を入力してください"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button
                                    type="submit"
                                    className={`button is-primary ${isLoading ? "is-loading" : ""}`}
                                    disabled={isLoading}
                                >
                                    投稿
                                </button>
                            </div>
                            <div className="control">
                                <Link href="/community" className="button is-light">
                                    キャンセル
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}