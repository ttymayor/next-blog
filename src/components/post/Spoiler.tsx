"use client";

import { Spoiler } from "spoiled";
import { useState } from "react";

interface SpoilerProps {
  children: React.ReactNode;
}

export default function BetterSpoiler({ children }: SpoilerProps) {
  const [hidden, setHidden] = useState(true);

  return (
    <div className="my-6">
      <Spoiler
        hidden={hidden}
        revealOn="click"
        tagName="div"
        fps={16}
        density={0.01}
        onHiddenChange={() => {
          if (hidden) {
            setHidden(false);
          }
        }}
      >
        {children}
      </Spoiler>
    </div>
  );
}
