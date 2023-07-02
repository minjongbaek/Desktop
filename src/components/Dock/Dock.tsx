"use client";

import DockItem from "./DockItem";
import { useState } from "react";
import { appIds } from "@/utils/constants/app";

const Dock = () => {
  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <footer className="w-full z-20">
      <nav className="flex mx-auto w-max justify-center rounded-2xl bg-white/30 backdrop-blur-sm shadow-2xl">
        <ul
          className={`flex justify-center items-end h-[76px] p-0.5`}
          onMouseMove={(event) => setMouseX(event.clientX)}
          onMouseLeave={() => setMouseX(null)}
        >
          {appIds.map((id) => (
            <DockItem key={id} id={id} mouseX={mouseX} />
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Dock;
