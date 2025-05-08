/*
    【予定】
    コメント・コミュニティ(情報共有場みたいな)機能の
    アカウント管理にMisskey.ioを使う予定

    コミュニティはScratchのプロフィールのコメントみたいな感じにする予定
    コメントはアイテム概要の所に在庫少ないよーとかを共有する場にする予定

    MiAuthの予定URL
    https://misskey.io/miauth/{UUID}?name=iomc東京倉庫ツール&permission=read:account
*/

import Link from 'next/link';

export default function SignUp() {
    return (
        <div className="has-text-centered content">
            <h2>サインアップ</h2>

            <a href="/accounts/redirect?type=signup" className="button is-primary" style={{marginBottom: '5px'}}>
            Misskey.ioでアカウントを作成
            </a>

            <br />

            <Link href="/signin">
                <button className="button">既存のアカウントでログイン</button>
            </Link>
        </div>
    );
}
