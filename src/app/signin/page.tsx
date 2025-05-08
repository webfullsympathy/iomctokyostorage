// サーバーコンポーネント：サインイン画面
import Link from 'next/link';

export default function SignIn() {
    return (
        <div className="has-text-centered content">
            <h2>サインイン</h2>

            <a href="/accounts/redirect?type=signin" className="button is-primary" style={{marginBottom: '5px'}}>
                Misskey.ioでサインイン
            </a>

            <br />

            <Link href="/signup">
                <button className="button">アカウントを作成</button>
            </Link>
        </div>
    );
}
