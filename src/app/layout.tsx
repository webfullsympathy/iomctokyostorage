import type { Metadata } from "next";
import "./bulma.css";

export const metadata: Metadata = {
  title: "iomc東京倉庫",
  description: "iomc東京倉庫のツールを用意しています",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
