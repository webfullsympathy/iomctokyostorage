import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="content has-text-centered">
            <h1>NotFound 404</h1>
            <h3>お探しのページは見つかりませんでした。</h3>
            <Link href="/" className="button">ホームに戻る</Link>
        </div>
    );
}