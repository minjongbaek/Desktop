"use client";

import { appsState } from "@/stores/app";
import { useRecoilValue } from "recoil";

export default function Home() {
  const apps = useRecoilValue(appsState);

  return (
    <main className="relative w-full h-full flex flex-col justify-center items-center">
      {apps.map(({ active, content }) => (active ? content : null))}
    </main>
  );
}
