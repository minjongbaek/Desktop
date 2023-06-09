"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import DockItem from "./DockItem";
import { useState } from "react";
import { appsState } from "@/stores/app";
import { AppData } from "@/types/app";

const Dock = () => {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [apps, setApps] = useRecoilState(appsState);

  const handleClickDockItem = (id: AppData["id"]) => {
    setApps(
      apps.map((app) => {
        if (app.id === id) return { ...app, active: !app.active };
        return app;
      })
    );
  };

  return (
    <footer className="fixed inset-x-0 bottom-0 w-full z-50">
      <nav className="flex mx-auto w-max justify-center rounded-2xl bg-white/30 backdrop-blur-sm shadow-2xl">
        <ul
          className={`flex justify-center items-end h-[76px] p-0.5`}
          onMouseMove={(event) => setMouseX(event.clientX)}
          onMouseLeave={() => setMouseX(null)}
        >
          {apps.map((app) => (
            <DockItem
              key={app.id}
              {...app}
              mouseX={mouseX}
              onClick={() => handleClickDockItem(app.id)}
            />
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Dock;
