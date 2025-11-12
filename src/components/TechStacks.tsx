import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/marquee";
import "@/styles/marquee.css";
import "devicon/devicon.min.css";

export const techStacks = [
  {
    name: "Astro",
    icon: "devicon-astro-plain colored",
  },
  {
    name: "React",
    icon: "devicon-react-original colored",
  },
  {
    name: "Next.js",
    icon: "devicon-nextjs-plain",
  },
  {
    name: "PHP",
    icon: "devicon-php-plain colored",
  },
  {
    name: "Laravel",
    icon: "devicon-laravel-original colored",
  },
  {
    name: "Python",
    icon: "devicon-python-plain colored",
  },
  {
    name: "Flask",
    icon: "devicon-flask-original",
  },
  {
    name: "C++",
    icon: "devicon-cplusplus-plain colored",
  },
  {
    name: "TypeScript",
    icon: "devicon-typescript-plain colored",
  },
  {
    name: "Vue.js",
    icon: "devicon-vuejs-plain colored",
  },
  {
    name: "MongoDB",
    icon: "devicon-mongodb-plain colored",
  },
  {
    name: "MariaDB",
    icon: "devicon-mariadb-original colored",
  },
  {
    name: "MySQL",
    icon: "devicon-mysql-plain colored",
  },
  {
    name: "Docker",
    icon: "devicon-docker-plain colored",
  },
  {
    name: "Golang",
    icon: "devicon-go-plain colored",
  },
  {
    name: "Cloudflare",
    icon: "devicon-cloudflare-plain colored",
  },
  {
    name: "Ubuntu",
    icon: "devicon-ubuntu-plain colored",
  },
  {
    name: "Git",
    icon: "devicon-git-plain colored",
  },
  {
    name: "pnpm",
    icon: "devicon-pnpm-plain colored",
  },
  {
    name: "VS Code",
    icon: "devicon-vscode-plain colored",
  },
  {
    name: "Bash",
    icon: "devicon-bash-plain",
  },
  {
    name: "GitHub",
    icon: "devicon-github-plain",
  },
  {
    name: "Tailwind CSS",
    icon: "devicon-tailwindcss-plain colored",
  },
  {
    name: "Markdown",
    icon: "devicon-markdown-plain",
  },
  {
    name: "Hugo",
    icon: "devicon-hugo-plain colored",
  },
];

export default function TechStacks() {
  // 將技術棧分成兩半，用於兩個方向的 Marquee
  const midPoint = Math.ceil(techStacks.length / 2);
  const firstHalf = techStacks.slice(0, midPoint);
  const secondHalf = techStacks.slice(midPoint);

  return (
    <section
      id="tech-stacks"
      className="group mb-8 w-full transition-all duration-300"
    >
      <h2 className="mb-8 text-2xl font-bold">工具 & 技能</h2>
      <div className="flex size-full flex-col items-center justify-center gap-4">
        {/* 向左滾動的 Marquee */}
        <Marquee className="py-4">
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
          <MarqueeContent direction="left" pauseOnHover>
            {firstHalf.map((techStack, index) => (
              <MarqueeItem className="mx-4" key={`left-${index}`}>
                <div className="flex items-center justify-center gap-3">
                  <i className={`${techStack.icon} text-4xl`} />
                  <span className="text-primary text-xl font-bold">
                    {techStack.name}
                  </span>
                </div>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
      <div className="flex size-full flex-col items-center justify-center gap-4">
        {/* 向右滾動的 Marquee */}
        <Marquee className="py-4">
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
          <MarqueeContent direction="right" pauseOnHover>
            {secondHalf.map((techStack, index) => (
              <MarqueeItem className="mx-4" key={`right-${index}`}>
                <div className="flex items-center justify-center gap-3">
                  <i className={`${techStack.icon} text-4xl`} />
                  <span className="text-primary text-xl font-bold">
                    {techStack.name}
                  </span>
                </div>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </section>
  );
}
