import { redirect } from 'next/navigation';

type Query = {
    type?: string;
    uuid?: string;
};

export default async function Callback({
    searchParams,
}: {
    searchParams: Promise<Query>;
}) {
    const { type = 'login', uuid } = await searchParams;

    if (!uuid) {
        return (
            <div className="content">
                <h1>Callback エラー</h1>
                <p>session が指定されていません。</p>
            </div>
        );
    }

    const res = await fetch(`https://misskey.io/api/miauth/${uuid}/check`, {
        method: 'POST',
    });

    const data = await res.json();

    if (!data.token || !data.user?.id) {
        return (
            <div className="content">
                <h1>Callback エラー</h1>
                <p>Misskey.ioから必要なデータを取得できませんでした。</p>
            </div>
        );
    }

    const token = data.token as string;
    const userId = data.user.id as string;

    if (type === 'signin') {
        redirect(`/signin/enterpassword?session=${token}&id=${userId}`);
    } else if (type === 'signup') {
        redirect(`/signup/setpassword?session=${token}&id=${userId}`);
    }
}