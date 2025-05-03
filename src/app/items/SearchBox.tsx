"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (query.trim() !== "") {
            router.push(`/items/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <>
            <input
                type="text"
                placeholder="アイテム名を入力"
                className="input"
                id="itemname"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="button" onClick={handleSearch}>検索</button>
        </>
    );
}
