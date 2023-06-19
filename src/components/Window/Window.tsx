"use client";

import { appAtomFamily } from "@/stores/app";
import { AppData } from "@/types/app";
import { PropsWithChildren, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

type WindowState = {
  width: number | string;
  height: number | string;
  x: number;
  y: number;
};

const Window = ({ children }: PropsWithChildren) => {
  const [size, setSize] = useState<WindowState>({
    width: 800,
    height: 600,
    x: 50,
    y: 50,
  });

  const { isMaxSize } = useRecoilValue(appAtomFamily("chrome"));

  const windowRef = useRef<HTMLDivElement>(null);

  const sizeStyle = {
    width: isMaxSize ? "100%" : size.width,
    height: isMaxSize ? "100%" : size.height,
  };

  const positionStyle = {
    top: isMaxSize ? "0" : size.x,
    left: isMaxSize ? "0" : size.y,
  };

  const handleMouseDown = (event: React.MouseEvent, direction: string) => {
    if (event.button !== 0) return;
    if (!(event.target instanceof HTMLElement)) return;

    const mainElement = document.getElementById("main");
    if (!mainElement) return;

    const windowElement = windowRef.current;
    if (!windowElement) return;

    const windowRect = windowElement.getBoundingClientRect();
    windowElement.style.transitionDuration = "0s";

    const handleMouseMove = (event: MouseEvent) => {
      switch (direction) {
        case "top": {
          const isOverMainElement = event.clientY < mainElement.offsetTop;
          const top = isOverMainElement
            ? "0px"
            : `${event.clientY - mainElement.offsetTop}px`;
          const height = isOverMainElement
            ? `${windowRect.bottom - mainElement.offsetTop}px`
            : `${windowRect.bottom - event.clientY}px`;

          windowElement.style.height = height;
          windowElement.style.top = top;
          break;
        }
        case "right": {
          const isOverMainElement = event.clientX > mainElement.offsetWidth;
          const rightMargin = event.clientX - windowRect.right;
          const width = isOverMainElement
            ? `${mainElement.offsetWidth - windowRect.left}px`
            : `${windowRect.width + rightMargin}px`;

          windowElement.style.width = width;
          break;
        }
        case "bottom": {
          const mainElementHeight =
            mainElement.offsetTop + mainElement.offsetHeight;
          const isOverMainElement = event.clientY > mainElementHeight;
          const bottomMargin = event.clientY - windowRect.bottom;
          const height = isOverMainElement
            ? `${mainElementHeight - windowRect.top}px`
            : `${windowRect.height + bottomMargin}px`;

          windowElement.style.height = height;
          break;
        }
        case "left": {
          const isOverMainElement = event.clientX < mainElement.offsetLeft;
          const left = isOverMainElement ? "0px" : `${event.clientX}px`;
          const width = isOverMainElement
            ? `${windowRect.right - mainElement.offsetLeft}px`
            : `${windowRect.right - event.clientX}px`;

          windowElement.style.left = left;
          windowElement.style.width = width;
          break;
        }
        default: {
          break;
        }
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      windowElement.style.transitionDuration = "";
      setSize({
        width: windowElement.offsetWidth,
        height: windowElement.offsetHeight,
        x: windowElement.offsetLeft,
        y: windowElement.offsetTop,
      });
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="absolute flex rounded-lg flex-col z-60 transition-[width,height,top,left]"
      ref={windowRef}
      style={{ ...sizeStyle, ...positionStyle }}
    >
      <div
        className="absolute -top-1 w-full h-2 cursor-ns-resize z-50 select-none"
        onMouseDown={(event) => handleMouseDown(event, "top")}
      />
      <div
        className="absolute -right-1 w-2 h-full cursor-ew-resize z-50 select-none"
        onMouseDown={(event) => handleMouseDown(event, "right")}
      />
      <div
        className="absolute -bottom-1 w-full h-2 cursor-ns-resize z-50 select-none"
        onMouseDown={(event) => handleMouseDown(event, "bottom")}
      />
      <div
        className="absolute -left-1 w-2 h-full cursor-ew-resize z-50 select-none"
        onMouseDown={(event) => handleMouseDown(event, "left")}
      />
      {children}
    </div>
  );
};

const Header = ({ id }: Pick<AppData, "id"> & PropsWithChildren) => {
  const [app, setApp] = useRecoilState(appAtomFamily(id));

  const handleClickRedButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setApp({ ...app, active: !app.active });
    event.preventDefault();
  };

  const handleClickGreenButton = (event: React.MouseEvent<HTMLElement>) => {
    setApp({ ...app, isMaxSize: !app.isMaxSize });
    event.preventDefault();
  };

  return (
    <div
      className="relative header flex items-center justify-center px-4 py-1 bg-lightgrey/95 rounded-t-lg select-none"
      onDoubleClick={handleClickGreenButton}
    >
      <div className="absolute left-0 flex items-center gap-1.5 px-4 py-1">
        <button
          className="w-3 h-3 bg-red-400 border border-red-500 rounded-full"
          onClick={handleClickRedButton}
        />
        <button className="w-3 h-3 bg-yellow-400 border border-yellow-500 rounded-full" />
        <button
          className="w-3 h-3 bg-green-400 border border-green-500 rounded-full"
          onClick={handleClickGreenButton}
        />
      </div>
      <h1 className="self-center">{app.name}</h1>
    </div>
  );
};

const Body = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-full px-2 py-0.5 bg-white rounded-b-lg">
      {children}
    </div>
  );
};

Window.Header = Header;
Window.Body = Body;

export default Window;

const minWidth = 600;
const minHeight = 400;
