import rawItems from "../items.json";

type ItemData = {
    name: string;
    locate: string;
    group: string;
};

const items: Record<string, ItemData> = rawItems;

type Props = {
    searchParams: {
        item?: string;
    };
};

export default function ItemDetail({ searchParams }: Props) {
    const key = searchParams.item;

    if (!key || !(key in items)) {
        return (
            <div className="content">
                <h1 className="title">iomc東京倉庫</h1>
                <h2>アイテム詳細</h2>

                <p>指定されたアイテムが見つかりませんでした。</p>
            </div>
        );
    }

    const item = items[key];

    return (
        <div className="content">
            <h1 className="title">iomc東京倉庫</h1>
            <h2>アイテム詳細</h2>

            <h1 className="title">{item.name}</h1>
            
            <p>
                <strong>
                    アイテムID：
                </strong>
                {key}
            </p>
            
            <p>
                <strong>
                    座標：
                </strong>
                {item.locate}
            </p>
            
            <p>
                <strong>
                    ジャンル：
                </strong>
                {item.group}
            </p>
        </div>
    );
}
