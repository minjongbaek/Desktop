"use client";

import { appAtomFamily, appIdsAtom } from "@/stores/app";
import { AppData } from "@/types/app";
import { useRecoilValue } from "recoil";

export default function Home() {
  const appIds = useRecoilValue(appIdsAtom);

  return (
    <main className="relative w-full h-full flex flex-col justify-center items-center">
      {appIds.map((id) => (
        <AppWindow key={id} id={id} />
      ))}
    </main>
  );
}

const AppWindow = ({ id }: Pick<AppData, "id">) => {
  const app = useRecoilValue(appAtomFamily(id));
  return app.active ? app.content : null;
};
