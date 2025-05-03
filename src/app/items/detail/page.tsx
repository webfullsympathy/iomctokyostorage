import { Suspense } from 'react';
import DetailContent from './DetailContent';

export default function ItemDetailPage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <DetailContent />
    </Suspense>
  );
}
