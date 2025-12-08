"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";

interface Tool {
  name: string;
  description: string;
  url?: string;
}

const tools: Tool[] = [
  {
    name: "Zeabur",
    description: "部署服務的好平台，僅需 5 美元即可部屬許多服務",
    url: "https://zeabur.com/referral?referralCode=tantuyu",
  },
  {
    name: "GCP VM",
    description: "Google Cloud Platform 的 VM 虛擬機器，用來自架服務",
    url: "https://cloud.google.com",
  },
  {
    name: "Cursor",
    description: "已經退訂 Cursor，改用 Zed，因為我沒錢了 T_T",
    url: "https://cursor.com/",
  },
  {
    name: "Zed",
    description: "已經成為我多數情況下會使用的編輯器，原因是不吃效能",
    url: "https://zed.dev/",
  },
  {
    name: "Visual Studio Code",
    description: "快被我遺棄了",
    url: "https://code.visualstudio.com/",
  },
  {
    name: "Obsidian",
    description: "筆記軟體，缺點是同步要錢錢",
    url: "https://obsidian.md/",
  },
  {
    name: "Chrome",
    description: "主要瀏覽器",
    url: "https://www.google.com/chrome/",
  },
  {
    name: "Zen Browser",
    description: "備用的絲滑瀏覽器，缺點是 base on Firefox",
    url: "https://zen-browser.app/",
  },
  {
    name: "ChatGPT",
    description: "問各種問題的 AI",
    url: "https://chatgpt.com/",
  },
  {
    name: "Claude",
    description: "暫時只使用其模型在 Cursor 中使用",
    url: "https://claude.ai/",
  },
  {
    name: "Gemini Pro",
    description: "學生免費試用 1 年",
    url: "https://gemini.google.com/",
  },
  {
    name: "Copilot Pro",
    description: "學生免費試用 1 年",
    url: "https://copilot.github.com/",
  },
];

export default function MyTools() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section id="my-tools" className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">我的開發工具</h2>

      <div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent className="w-full">
            {tools.map((tool, index) => (
              <CarouselItem
                key={index}
                className="basis-1/1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full p-1">
                  <Card className="flex h-full">
                    <CardContent className="flex flex-1 flex-col gap-2">
                      <span className="text-lg font-semibold">{tool.name}</span>
                      <p className="text-muted-foreground m-0 text-sm select-none">
                        {tool.description}
                      </p>

                      {/* footer - 固定在底部 */}
                      {tool.url && (
                        <div className="mt-auto pt-2">
                          <Link
                            href={tool.url}
                            target="_blank"
                            prefetch={false}
                          >
                            <Button
                              variant="secondary"
                              size="sm"
                              className="bg-tty-pink text-tty-pink-foreground hover:bg-tty-pink/80 w-full cursor-pointer select-none"
                            >
                              前往
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="text-muted-foreground py-2 text-center text-sm">
          {current} / {count}
        </div>
      </div>
    </section>
  );
}
