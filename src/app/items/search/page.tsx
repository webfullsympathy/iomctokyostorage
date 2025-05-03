import Link from "next/link";
import items from "../items.json";

type Item = {
    name: string;
    locate: string;
    group: string;
};

type Props = {
    searchParams: { q?: string };
};

export default function ItemsSearch({ searchParams }: Props) {
    const query = searchParams.q?.trim()?.toLowerCase() || "";

    const matchedItems = Object.entries(items).filter(([key, value]) => {
        const lowerKey = key.toLowerCase();
        const lowerName = value.name?.toLowerCase() || "";
        const lowerGroup = value.group?.toLowerCase() || "";

        return (
            lowerKey.includes(query) ||
            lowerName.includes(query) ||
            lowerGroup.includes(query)
        );
    });

    return (
        <div className="content">
            <h1 className="title">iomc東京倉庫</h1>
            <h3>検索結果：</h3>

            {matchedItems.length === 0 ? (
                <div className="search-result">
                    <p>検索結果はありません</p>
                </div>
            ) : (
                <div className="search-result">
                    <ul>
                        {matchedItems.map(([key, item]) => (
                            <li key={key}>
                                <Link href={`/items/detail?item=${key}`}>{item.name}</Link>
                                <br />
                                <small>{item.locate}（ジャンル: {item.group}）</small>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
