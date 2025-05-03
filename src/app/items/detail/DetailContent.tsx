'use client';

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import itemsJson from "../items.json";

type ItemData = {
  name: string;
  locate: string;
  group: string;
};

const items: Record<string, ItemData> = itemsJson;

export default function DetailContent() {
  const searchParams = useSearchParams();
  const key = searchParams.get("item");

  const item = useMemo(() => (key ? items[key] : undefined), [key]);

  if (!key || !item) {
    return (
      <div className="content">
        <h1 className="title">アイテム詳細</h1>
        <p>指定されたアイテムが見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div className="content">
      <h1 className="title">{item.name}</h1>
      <p><strong>アイテムID：</strong> {key}</p>
      <p><strong>座標：</strong> {item.locate}</p>
      <p><strong>ジャンル：</strong> {item.group}</p>
    </div>
  );
}
