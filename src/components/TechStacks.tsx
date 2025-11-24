import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/marquee";
import "@/styles/marquee.css";
import "devicon/devicon.min.css";
import icons from "@/lib/icon";

export const techStacks = [
  {
    name: "Astro",
    icon: icons.Astro,
  },
  {
    name: "React",
    icon: icons.React,
  },
  {
    name: "Next.js",
    icon: icons["Next.js"],
  },
  {
    name: "PHP",
    icon: icons.PHP,
  },
  {
    name: "Laravel",
    icon: icons.Laravel,
  },
  {
    name: "Python",
    icon: icons.Python,
  },
  {
    name: "Flask",
    icon: icons.Flask,
  },
  {
    name: "C++",
    icon: icons["C++"],
  },
  {
    name: "TypeScript",
    icon: icons.TypeScript,
  },
  {
    name: "Vue.js",
    icon: icons["Vue.js"],
  },
  {
    name: "MongoDB",
    icon: icons.MongoDB,
  },
  {
    name: "MariaDB",
    icon: icons.MariaDB,
  },
  {
    name: "MySQL",
    icon: icons.MySQL,
  },
  {
    name: "Docker",
    icon: icons.Docker,
  },
  {
    name: "Golang",
    icon: icons.Golang,
  },
  {
    name: "Google Cloud",
    icon: icons["Google Cloud"],
  },
  {
    name: "Cloudflare",
    icon: icons.Cloudflare,
  },
  {
    name: "Ubuntu",
    icon: icons.Ubuntu,
  },
  {
    name: "Git",
    icon: icons.Git,
  },
  {
    name: "pnpm",
    icon: icons.pnpm,
  },
  {
    name: "VS Code",
    icon: icons["VS Code"],
  },
  {
    name: "Bash",
    icon: icons.Bash,
  },
  {
    name: "GitHub",
    icon: icons.GitHub,
  },
  {
    name: "Tailwind CSS",
    icon: icons["Tailwind CSS"],
  },
  {
    name: "Markdown",
    icon: icons.Markdown,
  },
  {
    name: "Hugo",
    icon: icons.Hugo,
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
      {/* 向左滾動的 Marquee */}
      <Marquee className="py-4">
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent direction="left" pauseOnHover>
          {firstHalf.map((techStack, index) => (
            <MarqueeItem key={`left-${index}`}>
              <div className="flex items-center justify-center gap-3 opacity-80 transition-all duration-300 hover:scale-110 hover:opacity-100">
                <techStack.icon className="size-10 flex-shrink-0" />
                <span className="text-primary text-xl font-bold">
                  {techStack.name}
                </span>
              </div>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
      {/* 向右滾動的 Marquee */}
      <Marquee className="gap-10 py-4">
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent direction="right" pauseOnHover>
          {secondHalf.map((techStack, index) => (
            <MarqueeItem key={`right-${index}`}>
              <div className="flex items-center justify-center gap-3 opacity-80 transition-all duration-300 hover:scale-110 hover:opacity-100">
                <techStack.icon className="size-10 flex-shrink-0" />
                <span className="text-primary text-xl font-bold">
                  {techStack.name}
                </span>
              </div>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </section>
  );
}
