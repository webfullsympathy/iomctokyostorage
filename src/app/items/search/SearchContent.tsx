'use client';

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import itemsJson from "../items.json";

type Item = {
  name: string;
  locate: Array<number>;
  group: string;
};

const items: Record<string, Item> = itemsJson;

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim().toLowerCase() || "";

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
                <small>
                  X {item.locate[0]} Y {item.locate[1]} Z {item.locate[2]}
                  （ジャンル: {item.group}）
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
