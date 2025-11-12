import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-[3%] px-4 py-12 md:mx-[10%] lg:mx-[15%]">
      <main>
        <section className="mb-16">
          <h1 className="mb-4 text-2xl font-bold">關於我</h1>

          <p>Hi 👋</p>

          <p>
            你可以叫我彈塗魚可能比較親切一點，我很喜歡探索很多資訊圈子的新工具，同時我很擅長在短時間學習新的工具並實際應用。
          </p>

          <p>該站使用 Astro、Tailwind CSS、React 等技術構建。</p>

          <p>
            寫 Astro 只是覺得寫部落格很方便自己刻，我還是比較喜歡寫 React 和
            Next.js。
          </p>

          <p>
            後端可能以後有專案會用 FastAPI 或是 Golang 來寫，Laravel 也不錯 ( •̀
            ω •́ )✧
          </p>

          <Separator className="my-4" />

          <p>開發時我願意遵守：</p>

          <ul>
            <li>
              <Link
                href="https://www.conventionalcommits.org/en/v1.0.0/"
                className="text-tty-primary hover:text-tty-secondary transition-colors"
                prefetch={false}
              >
                Conventional Commits
              </Link>
            </li>
            <li>
              <Link
                href="https://conventional-branch.github.io/"
                className="text-tty-primary hover:text-tty-secondary transition-colors"
                prefetch={false}
              >
                Conventional Branch
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/sparanoid/chinese-copywriting-guidelines"
                className="text-tty-primary hover:text-tty-secondary transition-colors"
                prefetch={false}
              >
                中文文案排版指北
              </Link>
            </li>
            <li>
              <Link
                href="https://nohello.net/en/"
                className="text-tty-primary hover:text-tty-secondary transition-colors"
                prefetch={false}
              >
                No Hello
              </Link>
            </li>
            <li>GitHub 的 G 和 H 大寫</li>
            <li>SITCON 和 COSCUP 全字母大寫（或是 s1t(0n 和 (0s(vp www</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
