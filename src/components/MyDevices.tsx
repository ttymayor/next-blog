import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Cpu,
  Smartphone,
  Keyboard,
  Headphones,
  Mouse,
  Monitor,
  PcCase,
} from "lucide-react";

interface Device {
  name: string;
  icon: React.ElementType;
  image?: string;
  releaseDate?: string;
  bornDate?: string;
}

const devices: Device[] = [
  {
    name: "Pixel 7",
    icon: Smartphone,
    image: "/images/devices/pixel7.png",
    releaseDate: "2022-10-13",
    bornDate: "2023-01-13",
  },
  {
    name: "Pixel Buds Pro",
    icon: Headphones,
    image: "/images/devices/pixel-buds-pro.png",
    releaseDate: "2022-07-21",
    bornDate: "2023-03-08",
  },
  {
    name: "AMD Ryzen 7 9700X",
    icon: Cpu,
    image: "/images/devices/amd-ryzen-7-9700x.png",
    releaseDate: "2024-08-08",
    bornDate: "2025-06-22",
  },
  {
    name: "Rainy 75 Pro",
    icon: Keyboard,
    image: "/images/devices/rainy-75-pro.png",
    releaseDate: "2024",
    bornDate: "2025-01-26",
  },
  {
    name: "Logitech G G304 LIGHTSPEED",
    icon: Mouse,
    image: "/images/devices/logitech-g-g304-lightspeed.png",
    releaseDate: "2018",
    bornDate: "2023-07-24",
  },
  {
    name: "TUF Gaming VG249Q3A",
    icon: Monitor,
    image: "/images/devices/tuf-gaming-vg249q3a.png",
    releaseDate: "",
    bornDate: "2025-06-22",
  },
  {
    name: "AIR 1000 PREMIUM",
    icon: PcCase,
    image: "/images/devices/air-1000-premium.png",
    releaseDate: "2021-09-06",
    bornDate: "2025-06-22",
  },
];

export default function MyDevices() {
  return (
    <section id="my-devices" className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">我的設備</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {devices.map((device) => (
          <Card
            key={device.name}
            className="group hover:bg-muted/50 relative min-h-40 overflow-hidden transition-colors"
          >
            {device.image && (
              <div className="absolute -top-8 -right-10 z-0">
                {/* 光暈背景 */}
                <div className="from-primary/0 via-primary/70 to-primary/0 absolute inset-0 scale-150 rounded-full bg-linear-to-r opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative rotate-12 p-5">
                  <img
                    src={device.image}
                    alt={device.name}
                    className="aspect-square h-48 w-auto object-contain opacity-40 transition-all duration-300 group-hover:-translate-x-8 group-hover:translate-y-4 group-hover:scale-120 group-hover:opacity-75"
                  />
                </div>
              </div>
            )}
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary rounded-full p-2">
                  <device.icon className="h-6 w-6" />
                </div>
                {device.name}
              </CardTitle>
              {device.releaseDate && (
                <CardDescription className="text-muted-foreground text-xs">
                  上市日期：
                  {new Date(device.releaseDate).toLocaleDateString("zh-TW", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              )}
              {device.bornDate && (
                <CardDescription className="text-muted-foreground text-xs">
                  入手日期：
                  {new Date(device.bornDate).toLocaleDateString("zh-TW", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
