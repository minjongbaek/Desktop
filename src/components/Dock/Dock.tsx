"use client";

import DockItem from "./DockItem";
import { useState } from "react";

const APPS = ["finder", "chrome"] as const;

const Dock = () => {
  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <footer className="fixed inset-x-0 bottom-0 w-full z-50">
      <nav className="flex mx-auto w-max justify-center rounded-2xl bg-white/30 backdrop-blur-sm shadow-2xl">
        <ul
          className={`flex justify-center items-end h-[76px] p-0.5`}
          onMouseMove={(event) => setMouseX(event.clientX)}
          onMouseLeave={() => setMouseX(null)}
        >
          {APPS.map((appName) => (
            <DockItem
              key={`dock-item-${appName}`}
              appName={appName}
              mouseX={mouseX}
            />
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Dock;
