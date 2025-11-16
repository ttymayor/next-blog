import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-[3%] px-4 py-12 md:mx-[10%] lg:mx-[15%]">
      <h2>404 - 哈哈，你迷路了</h2>
      <p>找不到你想要的頁面，請返回首頁</p>
      <Link href="/" className="text-tty-pink hover:underline">
        返回首頁
      </Link>
    </div>
  );
}
