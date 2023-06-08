"use client";

import DockItem from "./DockItem";
import { useState } from "react";

const APPS = ["finder", "chrome"] as const;
const DOCK_ITEM_SIZE = 64;
const DOCK_HEIGHT = `h-[${DOCK_ITEM_SIZE + 10}px]`;
const MAGNIFICATION_MAX = 1.8;

const Dock = () => {
  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <footer className="fixed inset-x-0 bottom-0 w-full z-50">
      <nav className="flex mx-auto w-max justify-center rounded-2xl bg-white/30 backdrop-blur-sm shadow-2xl">
        <ul
          className={`flex justify-center items-end ${DOCK_HEIGHT} p-0.5`}
          onMouseMove={(event) => setMouseX(event.clientX)}
          onMouseLeave={() => setMouseX(null)}
        >
          {APPS.map((appName) => (
            <DockItem
              key={`dock-item-${appName}`}
              appName={appName}
              mouseX={mouseX}
              defaultSize={DOCK_ITEM_SIZE}
              magnificationMax={MAGNIFICATION_MAX}
            />
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Dock;
