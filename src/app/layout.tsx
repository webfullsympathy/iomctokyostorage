import type { Metadata } from "next";
import "./bulma.css";

export const metadata: Metadata = {
  title: "iomc東京倉庫",
  description: "iomc東京倉庫のツールを用意しています",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <h1 className="title">iomc東京倉庫</h1>
        {children}

        <div className="content has-text-centered">
          <p>
            <strong>iomc東京倉庫ツール</strong> by <a href="https://wefusy.f5.si">Webfullsympathy</a>

            <br />

            <a
              href="https://support.misskey.io/hc/articles/8890525417999-ブランドアセット利用ガイドライン"
              target="_blank"
            >Misskey.ioブランドアセット利用ガイドライン</a>

            <p><strong>※このサイトは非公式です。iomcプレイヤーによって開発・運営されています。</strong></p>
          </p>
        </div>
      </body>
    </html>
  );
}
