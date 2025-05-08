import Form from './Form';

type Query = { session?: string; id?: string; };

export default async function EnterPasswordPage({
    searchParams,
}: {
    searchParams: Promise<Query>;
}) {
    const { session, id } = await searchParams;
    if (!session || !id) {
        return <p>session または id が指定されていません。</p>;
    }

    // Misskey.ioからユーザーデータ取得
    const res = await fetch('https://misskey.io/api/i', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ i: session, id }),
    });
    const data = await res.json();
    const username = data.username as string;

    return (
        <Form
            username={username}
            session={session}
            id={id}
        />
    );
}
