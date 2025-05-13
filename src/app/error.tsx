'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="content has-text-centered">
            <h1>500 - サーバーエラー</h1>
            <p>{error.message}</p>
            <button onClick={() => reset()} className="button">リトライ</button>
        </div>
    );
}