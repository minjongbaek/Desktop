"use client";

import Image from "next/image";
import { useState } from "react";

interface AppIconProps {
  appName: "finder" | "chrome";
}

const AppIcon = ({ appName }: AppIconProps) => {
  const [active, _] = useState(true);

  return (
    <div className="group p-0.5 pb-1.5 flex flex-col items-center">
      <div className="group-hover:block hidden absolute mt-[-2.5rem] px-4 py-0.5 text-sm bg-lightgrey/90 rounded shadow-2xl after:content-[''] after:border-t-[0.5rem] after:border-x-[0.5rem] after:border-transparent after:border-t-lightgrey/90 after:absolute after:bottom-[-0.5rem] after:left-[50%] after:translate-x-[-50%] after:h-0">
        {appName}
      </div>
      <Image
        src={`/icons/app/${appName}.png`}
        alt="chrome"
        width={64}
        height={64}
        quality={100}
      />
      <div className="absolute bottom-[0.15rem] w-1 h-1 bg-slate-900 rounded-full"></div>
    </div>
  );
};

export default AppIcon;
