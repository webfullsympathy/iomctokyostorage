"use client";

import { useRouter, useSearchParams } from "next/navigation";
import "./style.css";

export default function SetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const session = searchParams.get("session");
    const id = searchParams.get("id");
    const password = searchParams.get("password");

    if (!session || !id) {
        return (
            <div className="content">
                <h1>処理エラー</h1>
                <p>sessionまたはidが指定されていません。</p>
            </div>
        );
    }

    if (!password) {
        return (
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const password = formData.get("password") as string;

                    router.replace(
                        `/signup/setpassword?session=${session}&id=${id}&password=${password}`
                    );
                }}
            >
                <div className="has-text-centered content">
                    <h2>サインアップ</h2>

                    <label className="label">パスワード</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="パスワードを入力してください"
                        className="input"
                        required
                    />

                    <br />

                    <button type="submit" className="button is-primary">
                        次へ
                    </button>
                </div>
            </form>
        );
    }

    return (
        <div className="content">
            <h2>サインアップ処理中...</h2>
        </div>
    );
}