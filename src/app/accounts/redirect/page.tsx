import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

export default async function RedirectPage({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>;
}) {
    const { type } = await searchParams;

    const h = await headers();
    const host = h.get('x-forwarded-host') || h.get('host');

    const sessionId = uuidv4();
    const params = new URLSearchParams({
        name: 'iomc東京倉庫ツール',
        permission: `read:account,write:notifications`,
        callback: `http://${host}/accounts/callback?uuid=${sessionId}&type=${type}`
    }).toString();

    const url = `https://misskey.io/miauth/${sessionId}?${params}`;

    redirect(url);
}
