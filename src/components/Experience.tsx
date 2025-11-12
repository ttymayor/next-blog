import { BadgeIcon, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ExperienceItem {
  title: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  tags: { name: string; icon: string }[];
}
const experience: ExperienceItem[] = [
  {
    title: "Full Stack",
    company: "JTX 嘉泰興",
    position: "Intern",
    startDate: "2025/06/23",
    endDate: "2025/08/22",
    description:
      "使用 Laravel 與 Vue.js 開發前後端，主要開發功能：出入庫功能的資料庫設計、後端 API 開發、前端 API 串接",
    tags: [
      {
        name: "Laravel",
        icon: "laravel/laravel-original.svg",
      },
      {
        name: "Vue.js",
        icon: "vuejs/vuejs-original.svg",
      },
      {
        name: "MySQL",
        icon: "mysql/mysql-original.svg",
      },
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="mb-8">
      <h2 className="mb-8 text-2xl font-bold">經歷</h2>

      <div className="ml-6 flex flex-col">
        {experience?.map((item, index) => (
          <div key={item.title} className="flex flex-row gap-6">
            {/* leading line and circle */}
            <ExperienceLeadingItem index={index} />

            <ExperienceContent item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceLeadingItem({ index }: { index: number }) {
  return (
    <div>
      {/* line */}
      <div
        className={`bg-tty-pink h-full w-1 ${index === 0 ? "rounded-t-full" : ""} ${index === experience.length - 1 ? "rounded-b-full" : ""}`}
      >
        {/* circle */}
        <div className="bg-tty-pink relative top-2 right-2 h-5 w-5 rounded-full">
          <div className="bg-background absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

interface ExperienceContentProps {
  item: ExperienceItem;
}

function ExperienceContent({ item }: ExperienceContentProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* date */}
      <p className="text-muted-foreground m-0 mt-1 text-sm">
        {new Date(item.startDate).toLocaleDateString("zh-TW")}
        {item.endDate ? (
          <> ~ {new Date(item.endDate).toLocaleDateString("zh-TW")}</>
        ) : (
          <> ~ Present</>
        )}
      </p>

      {/* title and position */}
      <div className="text-primary flex items-center justify-between">
        <h3 className="my-0 text-xl font-bold">
          {item.title} <span className="text-base">{item.position}</span>
        </h3>
      </div>

      {/* company */}
      <div className="flex items-center gap-2">
        <Building2 className="size-4" /> {item.company}
      </div>

      {/* tags */}
      {item.tags && (
        <div className="flex items-center gap-2">
          {item.tags?.map((tag) => (
            <Badge key={tag.name} variant="secondary" className="text-sm">
              {tag.icon ? (
                <Image
                  alt={tag.name}
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tag.icon}`}
                  className="size-4"
                  width={16}
                  height={16}
                />
              ) : (
                <BadgeIcon className="size-4" />
              )}{" "}
              {tag.name}
            </Badge>
          ))}
        </div>
      )}

      {/* description */}
      <p className="text-muted-foreground mb-2">{item.description}</p>
    </div>
  );
}
