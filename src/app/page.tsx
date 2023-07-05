"use client";

import Dock from "@/components/Dock/Dock";
import MenuBar from "@/components/MenuBar/MenuBar";
import { appsAtom } from "@/stores/app";
import { AppData } from "@/types/app";
import { useRecoilValue } from "recoil";

export default function Home() {
  const apps = useRecoilValue(appsAtom);

  return (
    <div className="relative w-full h-full flex flex-col">
      <MenuBar />
      <main
        id="main"
        className="relative w-full h-full flex flex-col justify-center items-center"
      >
        {apps.map((app) => (
          <AppWindow key={app.id} {...app} />
        ))}
      </main>
      <Dock />
    </div>
  );
}

const AppWindow = ({ active, content }: AppData) => {
  return active ? content : null;
};
