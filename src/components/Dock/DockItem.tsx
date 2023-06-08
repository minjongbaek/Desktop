"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { RefObject, useRef, useState } from "react";

const DEFAULT_SIZE = 64;
const MAGNIFICATION_MAX = 1.8;

const useCalculateSize = (
  element: RefObject<HTMLDivElement>,
  mouseX: number | null
) => {
  const magnification = useMotionValue(0);

  const transformedMagnification = useTransform(
    magnification,
    [0, 1],
    [1, MAGNIFICATION_MAX]
  );

  const calculateSize = useSpring(DEFAULT_SIZE, {
    mass: 0.5,
  });

  const limit = 120;

  if (element.current !== null) {
    if (mouseX === null) {
      calculateSize.set(DEFAULT_SIZE);
    } else {
      const rect = element.current.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - center);

      if (distance <= limit) {
        magnification.set(1 - distance / limit);
      } else {
        magnification.set(0);
      }
      calculateSize.set(DEFAULT_SIZE * transformedMagnification.get());
    }
  }
  return calculateSize;
};

interface DockItemProps {
  appName: "finder" | "chrome";
  mouseX: number | null;
}

const DockItem = ({ appName, mouseX }: DockItemProps) => {
  const [active, _] = useState(true);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const calculateSize = useCalculateSize(imageWrapRef, mouseX);

  return (
    <li className="group p-0.5 pb-1.5 flex flex-col items-center">
      <div className="group-hover:block hidden absolute mt-[-2.5rem] px-4 py-0.5 text-sm bg-lightgrey/90 rounded shadow-2xl after:content-[''] after:border-t-[0.5rem] after:border-x-[0.5rem] after:border-transparent after:border-t-lightgrey/90 after:absolute after:bottom-[-0.5rem] after:left-[50%] after:translate-x-[-50%] after:h-0">
        {appName}
      </div>
      <motion.div
        ref={imageWrapRef}
        className="relative"
        style={{
          width: calculateSize,
          height: calculateSize,
        }}
      >
        <Image
          src={`/icons/app/${appName}.png`}
          alt="chrome"
          fill
          sizes="128px"
          quality={75}
          priority={true}
        />
      </motion.div>

      {active && (
        <div className="absolute bottom-[0.15rem] rounded-full w-1 h-1 bg-slate-700/90" />
      )}
    </li>
  );
};

export default DockItem;