"use client";

import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Sub {
  name: string;
  cost: number;
  cycle: string;
  currency: string;
  startDate: Date;
  image?: string;
}

const subs: Sub[] = [
  {
    name: "Zeabur",
    cost: 5,
    cycle: "月",
    currency: "USD",
    startDate: new Date("2025-04-05"),
    image: "/images/zeabur.svg",
  },
  // {
  //   name: "Zeabur Tencent Cloud Server",
  //   cost: 3,
  //   cycle: "月",
  //   currency: "USD",
  //   startDate: new Date("2025-07-21"),
  //   image: "/images/zeabur.svg",
  // },
  // {
  //   name: "Cursor",
  //   cost: 20,
  //   cycle: "月",
  //   currency: "USD",
  //   startDate: new Date("2025-10-09"),
  //   image: "/images/cursor.png",
  // },
  {
    name: "Spotify Premium Student",
    cost: 88,
    cycle: "月",
    currency: "TWD",
    startDate: new Date("2025-11-18"),
    image: "/images/spotify.png",
  },
  {
    name: "Netflix Standard",
    cost: 380,
    cycle: "月",
    currency: "TWD",
    startDate: new Date("2025-10-28"),
    image: "/images/netflix.png",
  },
  {
    name: "Discord Nitro",
    cost: 9.99,
    cycle: "月",
    currency: "USD",
    startDate: new Date("2025-09-10"),
    image: "/images/discord.svg",
  },
  {
    name: "Cloudflare Registrar Domain",
    cost: 10.96,
    cycle: "年",
    currency: "USD",
    startDate: new Date("2025-03-23"),
    image: "/images/cloudflare.webp",
  },
];

// 根據日期獲取訂閱資訊（在扣款日顯示）
function getSubscriptions(date: Date, subs: Sub[]): Sub[] {
  // 標準化日期（只比較日期部分，不包含時間）
  const normalizeDate = (d: Date) => {
    const normalized = new Date(d);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  const normalizedDate = normalizeDate(date);

  // 找到在該日期或之前開始的訂閱，且該日期是該訂閱的扣款日
  const activeSubs = subs.filter((sub) => {
    const normalizedStartDate = normalizeDate(sub.startDate);
    const isAfterStartDate = normalizedDate >= normalizedStartDate;

    // 根據訂閱週期判斷是否為扣款日
    let isBillingDay = false;
    if (sub.cycle === "月") {
      // 每月訂閱：每月的同一天
      isBillingDay = date.getDate() === sub.startDate.getDate();
    } else if (sub.cycle === "年") {
      // 每年訂閱：每年的同月同日
      isBillingDay =
        date.getDate() === sub.startDate.getDate() &&
        date.getMonth() === sub.startDate.getMonth();
    }

    return isAfterStartDate && isBillingDay;
  });

  return activeSubs;
}

export default function MySubs() {
  // 追蹤哪些訂閱被選中（預設全部選中）
  const [selectedSubs, setSelectedSubs] = useState<Set<string>>(
    new Set(subs.map((sub) => sub.name)),
  );

  const toggleSub = (subName: string) => {
    setSelectedSubs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(subName)) {
        newSet.delete(subName);
      } else {
        newSet.add(subName);
      }
      return newSet;
    });
  };

  const getTotalCost = () => {
    // 換算成台幣，1 USD = 30 TWD
    const exchangeRate = 30; // 1 USD = 30 TWD

    const totalTWD = subs.reduce((total, sub) => {
      // 只計算被選中的訂閱
      if (!selectedSubs.has(sub.name)) return total;

      let monthlyCost = sub.cost;

      // 將年度訂閱換算成每月成本
      if (sub.cycle === "年") {
        monthlyCost = sub.cost / 12;
      }

      if (sub.currency === "USD") {
        return total + monthlyCost * exchangeRate;
      } else if (sub.currency === "TWD") {
        return total + monthlyCost;
      }
      return total;
    }, 0);

    return Math.round(totalTWD);
  };

  return (
    <section id="subs" className="mb-8">
      <h2 className="mb-8 text-2xl font-bold">我的訂閱</h2>

      <div className="flex flex-col justify-center gap-4 md:flex-row">
        {/* 月曆 */}
        <Calendar
          mode="single"
          className="bg-card w-full rounded-lg border shadow-sm [--cell-size:--spacing(11)] md:w-fit md:[--cell-size:--spacing(13)]"
          captionLayout="dropdown"
          formatters={{
            formatMonthDropdown: (date) => {
              return date.toLocaleString("default", { month: "long" });
            },
          }}
          components={{
            DayButton: ({ children, modifiers, day, ...props }) => {
              const subscriptions = !modifiers.outside
                ? getSubscriptions(day.date, subs)
                : [];
              return (
                <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                  {children}

                  {/* 顯示訂閱名稱和價格 */}
                  {subscriptions.length > 0 ? (
                    <TooltipProvider>
                      <div className="mt-1 flex flex-col gap-0.5">
                        {subscriptions.map((sub) => (
                          <div
                            key={sub.name}
                            className="flex items-center gap-1"
                          >
                            {sub.image && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Image
                                    src={sub.image}
                                    alt={sub.name}
                                    width={16}
                                    height={16}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  {sub.name}: {sub.cost} {sub.currency} /{" "}
                                  {sub.cycle}
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        ))}
                      </div>
                    </TooltipProvider>
                  ) : (
                    <span className="text-muted-foreground text-xs">-</span>
                  )}
                </CalendarDayButton>
              );
            },
          }}
        />

        {/* 顯示訂閱列表 */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>訂閱列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">
                    <Checkbox
                      checked={selectedSubs.size === subs.length}
                      onCheckedChange={() => {
                        if (selectedSubs.size === subs.length) {
                          setSelectedSubs(new Set());
                        } else {
                          setSelectedSubs(new Set(subs.map((sub) => sub.name)));
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>訂閱名稱</TableHead>
                  <TableHead className="text-right">價格</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subs.map((sub) => (
                  <TableRow key={sub.name}>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={selectedSubs.has(sub.name)}
                        onCheckedChange={() => toggleSub(sub.name)}
                        className="cursor-pointer"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {sub.image && (
                          <Image
                            src={sub.image}
                            alt={sub.name}
                            width={16}
                            height={16}
                          />
                        )}
                        <span className="text-sm">{sub.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {sub.cost} {sub.currency} / {sub.cycle}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="text-right">
                    換算約 {getTotalCost()} TWD / 月
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
          <CardFooter className="text-muted-foreground text-center">
            ㄟ我好像不該訂閱那麼多東西
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
