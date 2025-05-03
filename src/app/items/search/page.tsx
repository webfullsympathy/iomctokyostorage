import { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function ItemsSearchPage() {
  return (
    <Suspense fallback={<div className="content"><p>読み込み中...</p></div>}>
      <SearchContent />
    </Suspense>
  );
}
