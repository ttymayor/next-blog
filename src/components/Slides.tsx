"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPinIcon,
  FileIcon,
  LinkIcon,
  CalendarIcon,
  TagIcon,
  ClockIcon,
} from "lucide-react";
import Link from "next/link";
import { Noto_Serif_TC } from "next/font/google";

const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
});

type Slide = {
  title: string;
  slideLink: string;
  pdfLink?: string;
  tags?: string[];
  madeBy?: string;
  location?: string;
  duration?: number;
  date?: string;
};

const slides = [
  {
    title: "Linux - 你應該要認識的企鵝",
    slideLink: "https://url.ttymayor.com/linux-slide",
    pdfLink: "https://url.ttymayor.com/linux-slide-pdf",
    tags: ["Linux", "General Skills"],
    madeBy: "Figma",
    location: "東海大學 - 駭客社",
    duration: 3.5,
    date: "2025/09/18",
  },
  {
    title: "入門 Docker 開發技能 +1",
    slideLink: "https://url.ttymayor.com/docker-slide",
    pdfLink: "https://url.ttymayor.com/docker-slide-pdf",
    tags: ["Docker", "Development"],
    madeBy: "Figma",
    location: "東海大學 - 駭客社",
    duration: 2.5,
    date: "2025/05/15",
  },
  {
    title: "入門網頁漏洞",
    slideLink: "https://url.ttymayor.com/web-vuln-slide",
    location: "東海大學 - 駭客社",
    tags: ["Web", "Security"],
    madeBy: "Slidev",
    duration: 3,
    date: "2025/10/02",
  },
];

export default function Slides() {
  return (
    <section id="slides" className="mb-8 w-full">
      <h2 className={`${notoSerifTC.className} mb-8 text-2xl font-bold`}>
        簡報
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {slides.map((slide) => (
          <div key={slide.title} className="bg-card rounded-3xl p-6">
            <SlideHeader slide={slide} />

            <SlideContent slide={slide} />

            <SlideFooter slide={slide} />
          </div>
        ))}
      </div>
    </section>
  );
}

interface SlideHeaderProps {
  slide: Slide;
}

function SlideHeader({ slide }: SlideHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      <h3
        className={`${notoSerifTC.className} text-primary mb-0 text-xl font-bold`}
      >
        {slide.title}
      </h3>
      {slide.madeBy && (
        <pre className="text-muted-foreground text-sm font-bold">
          {slide.madeBy}
        </pre>
      )}
    </div>
  );
}

interface SlideFooterProps {
  slide: Slide;
}

function SlideFooter({ slide }: SlideFooterProps) {
  return (
    <div className="flex gap-2">
      {slide.slideLink && (
        <Link href={slide.slideLink} target="_blank" prefetch={false}>
          <Button
            variant="secondary"
            className="cursor-pointer bg-blue-500/10 text-blue-500"
          >
            <LinkIcon className="size-4" />
            Slide
          </Button>
        </Link>
      )}
      {slide.pdfLink && (
        <Link href={slide.pdfLink} target="_blank" prefetch={false}>
          <Button
            variant="secondary"
            className="cursor-pointer bg-red-500/10 text-red-500"
          >
            <FileIcon className="size-4" />
            PDF
          </Button>
        </Link>
      )}
    </div>
  );
}

interface SlideContentProps {
  slide: Slide;
}

function SlideContent({ slide }: SlideContentProps) {
  return (
    <div className="text-muted-foreground mb-4 flex flex-col gap-2 text-sm">
      {slide.tags && (
        <div className="flex items-center gap-2">
          <TagIcon className="size-4" />
          {slide.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      {slide.location && (
        <div className="flex items-center gap-2">
          <MapPinIcon className="size-4" />
          {slide.location}
        </div>
      )}
      {slide.date && (
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-4" />
          {slide.date}
        </div>
      )}
      {slide.duration && (
        <div className="flex items-center gap-2">
          <ClockIcon className="size-4" />
          {slide.duration} hr
        </div>
      )}
    </div>
  );
}
