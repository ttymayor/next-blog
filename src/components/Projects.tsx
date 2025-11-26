"use client";

import { BadgeIcon, ExternalLinkIcon, ImageOff } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import Link from "next/link";
import { icons, IconProps } from "@/lib/icon";
import { Noto_Serif_TC } from "next/font/google";
const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
});
interface Project {
  title: string;
  description: string;
  url?: string;
  tags: { name: string; icon: (props: IconProps) => React.ReactNode }[];
  image?: string;
  github: string;
}

const projects: Project[] = [
  {
    title: "東海選課資訊",
    description: "利用爬蟲獲取選課資訊，優化 UI 介面，提供更方便的排課模擬功能",
    url: "https://thc.ttymayor.com",
    tags: [
      {
        name: "Next.js",
        icon: icons["Next.js"],
      },
      {
        name: "Tailwind CSS",
        icon: icons["Tailwind CSS"],
      },
      {
        name: "MongoDB",
        icon: icons.MongoDB,
      },
    ],
    image: "thu-course-frontend.png",
    github: "https://github.com/ttymayor/thu-course-frontend",
  },
  {
    title: "東海選課資訊（爬蟲）",
    description: "使用 Python 爬蟲獲取東海選課資訊，並儲存到 MongoDB 中",
    tags: [
      {
        name: "Python",
        icon: icons.Python,
      },
      {
        name: "MongoDB",
        icon: icons.MongoDB,
      },
    ],
    image: "thu-course-crawler.png",
    github: "https://github.com/ttymayor/thu-course-crawler",
  },
  {
    title: "THU Hacker Club",
    description:
      "114 THU Hacker Club 的官網，雖然我在資安方面沒有過多深入研究，但在網頁開發上，為駭客社留下一個網站",
    url: "https://thu-hacker-club.zeabur.app",
    tags: [
      {
        name: "Astro",
        icon: icons.Astro,
      },
      {
        name: "React",
        icon: icons.React,
      },
      {
        name: "Tailwind CSS",
        icon: icons["Tailwind CSS"],
      },
    ],
    image: "thu-hacker-club.png",
    github: "https://github.com/ttymayor/thu-hacker-club",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mb-8">
      <h2 className={`${notoSerifTC.className} mb-8 text-2xl font-bold`}>
        專案
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-card group flex flex-col gap-4 rounded-lg border p-6 transition-shadow hover:shadow-lg"
          >
            {project.image ? (
              <AspectRatio ratio={2 / 1} className="">
                <Image
                  src={`/images/${project.image}`}
                  alt={project.title}
                  width={1200}
                  height={600}
                  className="h-full w-full rounded-sm object-cover transition-all duration-300 group-hover:scale-101"
                />
              </AspectRatio>
            ) : (
              <AspectRatio
                ratio={2 / 1}
                className="bg-muted flex flex-col items-center justify-center gap-2 rounded-lg text-sm"
              >
                <ImageOff className="text-muted-foreground size-6" />
                <span className="text-muted-foreground">Not Set Image</span>
              </AspectRatio>
            )}

            <div className="flex flex-col gap-2">
              {/* title */}
              <h3
                className={`${notoSerifTC.className} group-hover:text-primary m-0 flex items-center text-xl font-bold transition-all duration-300`}
              >
                {project.title}
              </h3>

              {/* description */}
              <p className="text-muted-foreground m-0 text-base">
                {project.description}
              </p>

              {/* tags */}
              <div className="mb-2 flex gap-2">
                {project.tags?.map((tag) => (
                  <Badge key={tag.name} variant="secondary">
                    {tag.icon ? (
                      <tag.icon className="size-4" />
                    ) : (
                      <BadgeIcon className="size-4" />
                    )}{" "}
                    {tag.name}
                  </Badge>
                ))}
              </div>

              {/* Link */}
              <div className="flex items-center gap-2">
                {project.github && (
                  <Link href={project.github} target="_blank" prefetch={false}>
                    <Button
                      variant="ghost"
                      className="bg-background/50 text-foreground hover:text-primary cursor-pointer"
                    >
                      <SiGithub className="size-4" />
                      GitHub
                    </Button>
                  </Link>
                )}
                {project.url && (
                  <Link href={project.url} target="_blank" prefetch={false}>
                    <Button
                      variant="ghost"
                      className="bg-background/50 text-foreground hover:text-primary cursor-pointer"
                    >
                      <ExternalLinkIcon className="size-4" />
                      Site
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
