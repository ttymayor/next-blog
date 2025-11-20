import TechStacks from "@/components/TechStacks";
import Slides from "@/components/Slides";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import { LatestPost } from "@/components/LatestPost";

export default async function Home() {
  return (
    <>
      <div className="mx-[3%] px-4 py-12 md:mx-[10%] lg:mx-[15%]">
        <main>
          <TechStacks />
          <div>
            <Slides />
          </div>
          <Experience />
          <Projects />
          <LatestPost />
        </main>
      </div>
    </>
  );
}
