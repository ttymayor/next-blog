"use cache";

import TechStacks from "@/components/TechStacks";
import Slides from "@/components/Slides";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import { LatestPost } from "@/components/LatestPost";
import Events from "@/components/Events";

export default async function Home() {
  return (
    <>
      <main>
        <TechStacks />
        <Slides />
        <Experience />
        <Projects />
        <Events />
        <LatestPost />
      </main>
    </>
  );
}
