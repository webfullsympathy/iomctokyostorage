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

    return (
        <Form
            session={session}
            id={id}
        />
    );
}
