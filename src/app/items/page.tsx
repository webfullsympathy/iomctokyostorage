import type { Metadata } from "next";
import "./items.css";
import SearchBox from "./SearchBox";

export const metadata: Metadata = {
    title: "アイテム検索 | iomc東京倉庫",
    description: "iomc東京倉庫のツールを用意しています",
};

export default function Items() {
    return (
        <div className="content">
            <h2>アイテム検索</h2>

            <SearchBox />
        </div>
    );
}
