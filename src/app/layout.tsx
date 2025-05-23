import type { Metadata } from "next";

import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from "@next/third-parties/google";

import Link from "next/link";

import "./bulma.css";
import "./style.css"

export const metadata: Metadata = {
  title: "iomc東京倉庫",
  description: "iomc東京倉庫のツールを用意しています",
};

export default function RootLayout(
  {children,}:
  Readonly<{
    children: React.ReactNode;
  }>
){
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <html lang="ja">
      <body>
        <header className="header">
          <span className="title" style={{margin: "0"}}>iomc東京倉庫</span>

          <Link href="/signin" className="signinLink">
            <button className="button">サインイン</button>
          </Link>
        </header>

        <br />

        {children}

        <div className="content has-text-centered">
          <p>
            <a href="https://github.com/webfullsympathy/iomctokyostorage"><strong>iomc東京倉庫ツール</strong></a>

            <br />

            <a
              href="https://support.misskey.io/hc/articles/8890525417999-ブランドアセット利用ガイドライン"
              target="_blank"
            >Misskey.ioブランドアセット利用ガイドライン</a>

            <br />

            <strong>※このサイトは非公式です。iomcプレイヤーによって開発・運営されています。</strong>
          </p>
        </div>

        {gaId && <GoogleAnalytics gaId={gaId} />}
        <Analytics />
      </body>
    </html>
  );
}
