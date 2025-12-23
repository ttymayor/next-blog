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

interface Event {
  title: string;
  description: string;
  role: {
    date: Date;
    name: string;
  }[];
  img?: string;
  color?: string;
}

const events: Event[] = [
  {
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
    title: "COSCUP",
    description:
      "COSCUP 是由一群自由與開放原始碼軟體愛好者發起，致力於推廣開放原始碼精神與技術。",
    role: [
      {
        date: new Date("2025-08-09"),
        name: "Attendee",
      },
    ],
    img: "https://volunteer.coscup.org/img/coscup_logo_tw.png",
  },
  {
    title: "THU Hacker Club",
    description: "東海駭客社",
    role: [
      {
        date: new Date("2025-07-01"),
        name: "Leader and Academic",
      },
    ],
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
            className="group relative mb-4 overflow-hidden rounded-3xl border-0 shadow-none"
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
              {event.role.map((role, index) => (
                <p key={index} className="mb-0 text-sm">
                  {role.date.toLocaleDateString()} - {role.name}
                </p>
              ))}
            </CardContent>

            <div className="absolute right-5 bottom-5 flex aspect-square w-30 items-center justify-center">
              {event.img && (
                <img
                  src={event.img}
                  alt=""
                  className="w-full opacity-25 transition-opacity duration-300 group-hover:opacity-50"
                />
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
