import Link from "next/link";
import { Noto_Serif_TC } from "next/font/google";

const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
});

export default function NotFound() {
  return (
    <div className="mx-[3%] px-4 py-12 md:mx-[10%] lg:mx-[15%]">
      <div className="flex flex-col items-center justify-center">
        <h2 className={`${notoSerifTC.className} mb-2 text-2xl font-bold`}>
          肆〇肆 🤣 哈哈，你迷路了
        </h2>
        <p className={`${notoSerifTC.className} mb-4 text-lg`}>
          找不到你想要的頁面，請返回首頁
        </p>
        <p className={`mb-4 text-lg`}>
          <Link href="/" className="text-tty-pink hover:underline">
            返回首頁
          </Link>{" "}
          或{" "}
          <Link href="/posts" className="text-tty-pink hover:underline">
            文章列表
          </Link>
        </p>
      </div>
    </div>
  );
}
