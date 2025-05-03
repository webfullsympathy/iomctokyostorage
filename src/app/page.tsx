import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "iomc東京倉庫",
  description: "iomc東京倉庫のツールを用意しています",
};

export default function Home() {
  return (
    <>
      <p>iomc東京倉庫のツールを用意しています</p>

      <div className="content">
        <h2>ツール一覧</h2>
        <ul>
          <li>
            <Link href="/maps" style={{textDecoration: "line-through"}}>マップ</Link>
            <p>(開発中)</p>
          </li>

          <li>
            <Link href="/items">アイテム検索</Link>
          </li>
        </ul>
        </div>
    </>
  );
}
