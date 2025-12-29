"use client";

import { Noto_Serif_TC } from "next/font/google";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
});

type SingleEvent = {
  kind: "single";
  title: string;
  description: string;
  role: {
    date: Date;
    name: string;
  }[];
  img?: string;
  color?: string;
};

type RangeEvent = {
  kind: "range";
  title: string;
  description: string;
  role: {
    startDate: Date;
    endDate?: Date;
    name: string;
  }[];
  img?: string;
  color?: string;
};

type Event = SingleEvent | RangeEvent;

const events: Event[] = [
  {
    kind: "single",
    title: "SITCON",
    description:
      "SITCON 是由學生組成、投身資訊教育與推廣開源精神的社群。也是一個由學生主辦的資訊研討會，給學生們一個發表交流技術的舞台。",
    role: [
      {
        date: new Date("2025-03-08"),
        name: "Attendee",
      },
      {
        date: new Date("2024-03-09"),
        name: "Attendee",
      },
      {
        date: new Date("2022-09-04"),
        name: "Attendee",
      },
    ],
    color: "#77b55a",
    img: "https://sitcon.org/branding/assets/logos/logo.svg",
  },
  {
    kind: "range",
    title: "COSCUP",
    description:
      "COSCUP 是由一群自由與開放原始碼軟體愛好者發起，致力於推廣開放原始碼精神與技術。",
    role: [
      {
        startDate: new Date("2025-08-09"),
        endDate: new Date("2025-08-10"),
        name: "Attendee",
      },
    ],
    img: "https://volunteer.coscup.org/img/coscup_logo_tw.png",
  },
  {
    kind: "range",
    title: "THU Hacker Club",
    description: "東海駭客社",
    role: [
      {
        startDate: new Date("2025-07-01"),
        name: "Leader and Academic",
      },
    ],
    img: "/images/events/hacker_club.png",
  },
  {
    kind: "range",
    title: "TSC 2026",
    description:
      "Taiwan Security Club。此次活動是第一次完全由學生聯合舉辦的 CTF，目標是成為全台灣資安社團交流活動，為臺灣剛入門的資安新手們建立一場符合新手導向的資安試煉大會，以燃起並延續新手對資安的熱忱為目的的活動。",
    role: [
      {
        startDate: new Date("2025-11-08"),
        name: "Sponsor Group",
      },
    ],
    img: "https://ctfd.tscctf.com/themes/tsc/static/img/logo.png?d=2015666e",
  },
];

export default function Events() {
  return (
    <section id="events" className="mb-8">
      <h2 className={`${notoSerifTC.className} mb-8 text-2xl font-bold`}>
        活動參與
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <Card
            key={index}
            className="group relative min-h-50 overflow-hidden rounded-3xl border-0 shadow-none"
          >
            <CardHeader>
              <CardTitle
                className={`${notoSerifTC.className} text-primary relative z-10 text-lg font-bold`}
              >
                {event.title}
              </CardTitle>
              <CardDescription className="relative z-10">
                {event.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              {event.kind === "single" &&
                event.role.map((role, index) => (
                  <p key={index} className="mb-0 text-sm">
                    {role.date && role.date.toLocaleDateString()} - {role.name}
                  </p>
                ))}
              {event.kind === "range" &&
                event.role.map((role, index) => (
                  <p key={index} className="mb-0 text-sm">
                    {role.startDate && role.startDate.toLocaleDateString()} ~{" "}
                    {role.endDate
                      ? role.endDate.toLocaleDateString()
                      : "Present"}{" "}
                    - {role.name}
                  </p>
                ))}
            </CardContent>

            <div className="absolute right-5 bottom-5 flex w-28 items-center justify-center sm:aspect-square">
              {event.img && (
                <div className="relative">
                  <img
                    src={event.img}
                    alt=""
                    className={cn(
                      "absolute z-0 w-full opacity-25 transition-all duration-300 group-hover:blur-xl",
                    )}
                  />
                  <img
                    src={event.img}
                    alt=""
                    className={cn(
                      "w-full opacity-15 transition-all duration-300 group-hover:opacity-50",
                    )}
                  />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
