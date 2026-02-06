import type { Metadata } from "next";
import "./globals.css";
import { Sidebar, MobileNav } from "@/components/shared/navigation";

export const metadata: Metadata = {
  title: "家庭医疗助手 - Family Medical Assistant",
  description: "用 AI 将复杂的医疗信息翻译成家人能懂的语言，辅助就医决策",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <Sidebar />
        <MobileNav />
        <main className="md:ml-64 min-h-screen pb-20 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}
