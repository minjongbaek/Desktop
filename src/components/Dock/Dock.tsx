"use client";

import DockItem from "./DockItem";
import { useState } from "react";
import { appsAtom } from "@/stores/app";
import { useRecoilState } from "recoil";

const Dock = () => {
  const [apps, setApps] = useRecoilState(appsAtom);

  const handleClickDockItem = (id: string) => {
    const copiedApps = [...apps].map((app) => ({
      ...app,
      active: app.id === id ? !app.active : app.active,
      focus: app.id === id ? true : false,
    }));
    setApps(copiedApps);
  };

  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <footer className="w-full z-20">
      <nav className="flex mx-auto w-max justify-center rounded-2xl bg-white/30 backdrop-blur-sm shadow-2xl">
        <ul
          className={`flex justify-center items-end h-[76px] p-0.5`}
          onMouseMove={(event) => setMouseX(event.clientX)}
          onMouseLeave={() => setMouseX(null)}
        >
          {apps.map((app) => (
            <DockItem
              key={app.id}
              mouseX={mouseX}
              onClick={() => handleClickDockItem(app.id)}
              {...app}
            />
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Dock;
