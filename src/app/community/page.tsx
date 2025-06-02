"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./style.css";

import Link from "next/link";

interface PostsProps {
    setIsLoading: (value: boolean) => void;
}

interface UserData {
    id: string;
    name: string | null;
    username: string;
    host: string | null;
    avatarUrl: string | null;
    avatarDecorations: any[];
    isBot: boolean;
    isCat: boolean;
    emojis: {
        name: string;
        url: string;
    }[];
    onlineStatus: "unknown" | "online" | "active" | "offline";
}

function Posts({ setIsLoading }: PostsProps) {
    const [posts, setPosts] = useState<React.ReactElement[]>([]);
    const [userData, setUserData] = useState<{ [key: string]: UserData }>({});

    useEffect(() => {
        const postsFunc = async () => {
            const postRes = await fetch(`/api/community/get`, {
                method: "POST"
            });
            const postData = await postRes.text();
            const postJson = postData ? JSON.parse(postData as string) : null;
            const postArray: Array<any> = Object.values(postJson);

            // ユーザーデータをバッチで取得
            const userIds = postArray.map(post => post.user);
            const userRes = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ users: userIds })
            });
            const userDataMap = await userRes.json();
            setUserData(userDataMap);

            const newPosts: React.ReactElement[] = postArray.reverse().map((post, i) => (
                <div key={i} className="column is-two-fifths">
                    <article className="box message">
                        <div className="media">
                            <div className="media-left">
                                <Image src={userDataMap[post.user]?.avatarUrl || ''} width={48} height={48} alt="User Icon" className="is-rounded usericon" />
                            </div>
                            <div className="media-content">
                                <p className="title is-4">{userDataMap[post.user]?.name}</p>
                                <p className="subtitle is-6">@{userDataMap[post.user]?.username}</p>
                            </div>
                        </div>
                        <div className="content">
                            <p>
                                {(post.value || "").split('\n').map((line: string, index: number) => (
                                    <span key={index}>
                                        {line}
                                        {index < (post.value || "").split('\n').length - 1 && <br />}
                                    </span>
                                ))}
                            </p>
                            <p className="has-text-right has-text-grey is-size-7">
                                {new Date(post.time).toLocaleString('ja-JP')}
                            </p>
                        </div>
                    </article>
                </div>
            ));
            setPosts(newPosts);
            setIsLoading(false);
        };
        postsFunc();
    }, [setIsLoading]);

    // columnsの外側や全体にcontentクラスを付けない
    return <div className="columns is-multiline is-centered" style={{marginTop: "5px"}}>{posts}</div>;
}

export default function Community() {
    const [isLoading, setIsLoading] = useState(true);

    return(
        <div className="container section">
            <span className="title">掲示板</span>
            <Link href="/community/create" className="button" style={{marginLeft: "5px"}}>投稿</Link>

            {isLoading && <button className="button is-loading" />}
            <Posts setIsLoading={setIsLoading}/>
        </div>
    )
}