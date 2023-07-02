"use client";

import { appAtomFamily } from "@/stores/app";
import { AppData } from "@/types/app";
import { PropsWithChildren } from "react";
import { useRecoilState } from "recoil";

const Window = ({ id, children }: Pick<AppData, "id"> & PropsWithChildren) => {
  const [app, setApp] = useRecoilState(appAtomFamily(id));

  const { isMaxSize, size, position } = app;

  const sizeStyle = {
    width: isMaxSize ? "100%" : size.width,
    height: isMaxSize ? "100%" : size.height,
  };

  const positionStyle = {
    left: isMaxSize ? "0px" : position.x,
    top: isMaxSize ? "0px" : position.y,
  };

  const handleMouseDown = (event: React.MouseEvent, direction: string) => {
    if (event.button !== 0) return;
    if (!(event.target instanceof HTMLElement)) return;

    const mainElement = document.getElementById("main");
    if (!mainElement) return;

    const windowElement = event.target.parentElement;
    if (!windowElement) return;

    const windowRect = windowElement.getBoundingClientRect();

    windowElement.style.transitionProperty = "";
    windowElement.style.transitionDuration = "";
    const windowBodyElement =
      windowElement.getElementsByClassName("window-body")[0];
    if (!(windowBodyElement instanceof HTMLDivElement)) return;
    windowBodyElement.style.pointerEvents = "none";

    const handleMouseMove = (event: MouseEvent) => {
      const moveTop = () => {
        const isOverMainElement = event.clientY < mainElement.offsetTop;
        const top = isOverMainElement
          ? "0px"
          : `${event.clientY - mainElement.offsetTop}px`;
        const height = isOverMainElement
          ? `${windowRect.bottom - mainElement.offsetTop}px`
          : `${windowRect.bottom - event.clientY}px`;

        windowElement.style.height = height;
        windowElement.style.top = top;
      };

      const moveRight = () => {
        const isOverMainElement = event.clientX > mainElement.offsetWidth;
        const rightMargin = event.clientX - windowRect.right;
        const width = isOverMainElement
          ? `${mainElement.offsetWidth - windowRect.left}px`
          : `${windowRect.width + rightMargin}px`;

        windowElement.style.width = width;
      };

      const moveBottom = () => {
        const mainElementHeight =
          mainElement.offsetTop + mainElement.offsetHeight;
        const isOverMainElement = event.clientY > mainElementHeight;
        const bottomMargin = event.clientY - windowRect.bottom;
        const height = isOverMainElement
          ? `${mainElementHeight - windowRect.top}px`
          : `${windowRect.height + bottomMargin}px`;

        windowElement.style.height = height;
      };

      const moveLeft = () => {
        const isOverMainElement = event.clientX < mainElement.offsetLeft;
        const left = isOverMainElement ? "0px" : `${event.clientX}px`;
        const width = isOverMainElement
          ? `${windowRect.right - mainElement.offsetLeft}px`
          : `${windowRect.right - event.clientX}px`;

        windowElement.style.left = left;
        windowElement.style.width = width;
      };

      switch (direction) {
        case "top-left": {
          moveTop();
          moveLeft();
          break;
        }
        case "top": {
          moveTop();
          break;
        }
        case "top-right":
          moveTop();
          moveRight();
          break;
        case "right": {
          moveRight();
          break;
        }
        case "bottom-right": {
          moveBottom();
          moveRight();
          break;
        }
        case "bottom": {
          moveBottom();
          break;
        }
        case "bottom-left": {
          moveBottom();
          moveLeft();
          break;
        }
        case "left": {
          moveLeft();
          break;
        }
        default: {
          break;
        }
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      const size = {
        width: windowElement.offsetWidth,
        height: windowElement.offsetHeight,
      };
      const position = {
        x: windowElement.offsetLeft,
        y: windowElement.offsetTop,
      };
      windowBodyElement.style.pointerEvents = "auto";
      setApp({ ...app, size, position });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="window absolute flex rounded-lg flex-col z-10"
      style={{ ...sizeStyle, ...positionStyle }}
    >
      <div
        className="absolute -top-0.5 -left-0.5 w-2.5 h-2.5 cursor-nwse-resize z-30 select-none"
        onMouseDown={(event) => handleMouseDown(event, "top-left")}
      />
      <div
        className="absolute -top-1 w-full h-2 cursor-ns-resize z-20 select-none"
        onMouseDown={(event) => handleMouseDown(event, "top")}
      />
      <div
        className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 cursor-nesw-resize z-30 select-none"
        onMouseDown={(event) => handleMouseDown(event, "top-right")}
      />
      <div
        className="absolute -right-1 w-2 h-full cursor-ew-resize z-20 select-none"
        onMouseDown={(event) => handleMouseDown(event, "right")}
      />
      <div
        className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 cursor-nwse-resize z-30 select-none"
        onMouseDown={(event) => handleMouseDown(event, "bottom-right")}
      />
      <div
        className="absolute -bottom-1 w-full h-2 cursor-ns-resize z-20 select-none"
        onMouseDown={(event) => handleMouseDown(event, "bottom")}
      />
      <div
        className="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 cursor-nesw-resize z-30 select-none"
        onMouseDown={(event) => handleMouseDown(event, "bottom-left")}
      />
      <div
        className="absolute -left-1 w-2 h-full cursor-ew-resize z-20 select-none"
        onMouseDown={(event) => handleMouseDown(event, "left")}
      />
      <Header id={id} />
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
    if (!(event.target instanceof HTMLElement)) return;
    const headerElement = event.target;

    const windowElement = headerElement.closest(".window");
    if (!(windowElement instanceof HTMLElement)) return;

    windowElement.style.transitionProperty = "top,left,width,height";
    windowElement.style.transitionDuration = "150ms";

    setApp({ ...app, isMaxSize: !app.isMaxSize });

    windowElement.style.transform = "";
    event.preventDefault();
  };

  const handleMouseDown = (downEvent: React.MouseEvent) => {
    if (downEvent.button !== 0) return;

    if (!(downEvent.target instanceof HTMLElement)) return;
    const headerElement = downEvent.target;

    const windowElement = headerElement.closest(".window");
    if (!(windowElement instanceof HTMLElement)) return;

    const mainElement = document.getElementById("main");
    if (!mainElement) return;

    windowElement.style.transitionDuration = "";
    windowElement.style.transitionProperty = "";

    let marginTop = 0;
    let marginLeft = 0;
    const handleMouseMove = (moveEvent: MouseEvent) => {
      marginTop = moveEvent.clientY - downEvent.clientY;
      marginLeft = moveEvent.clientX - downEvent.clientX;
      windowElement.style.transform = `translate(${marginLeft}px,${marginTop}px)`;
    };

    const handleMouseUp = (event: MouseEvent) => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      if (downEvent.detail === 2) {
        windowElement.style.transitionProperty = "top,left,width,height";
        windowElement.style.transitionDuration = "150ms";
        setApp({ ...app, isMaxSize: !app.isMaxSize });
        downEvent.preventDefault();
        windowElement.style.transform = "";
        return;
      }

      if (app.isMaxSize) {
        // TODO: 리팩터링
        marginTop = event.clientY - downEvent.clientY;
        marginLeft = event.clientX - downEvent.clientX;
        if (
          windowElement.offsetWidth !== mainElement.offsetWidth ||
          windowElement.offsetHeight !== mainElement.offsetHeight ||
          marginLeft !== windowElement.offsetLeft ||
          marginTop !== windowElement.offsetTop
        ) {
          const size = {
            width: windowElement.offsetWidth,
            height: windowElement.offsetHeight,
          };
          const position = {
            x: marginLeft,
            y: marginTop,
          };
          setApp({ ...app, size, position, isMaxSize: false });
        }
      } else {
        const position = {
          x: windowElement.offsetLeft + marginLeft,
          y: windowElement.offsetTop + marginTop,
        };
        setApp({ ...app, position });
      }
      windowElement.style.transform = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="window-header relative flex items-center justify-center px-4 py-1 bg-lightgrey/95 rounded-t-lg select-none z-10"
      onMouseDown={handleMouseDown}
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
      <h1 className="self-center text-sm py-1">{app.name}</h1>
    </div>
  );
};

const Body = ({ children }: PropsWithChildren) => {
  return (
    <div className="window-body w-full h-full bg-white rounded-b-lg z-[9]">
      {children}
    </div>
  );
};

Window.Header = Header;
Window.Body = Body;

export default Window;

const minWidth = 600;
const minHeight = 400;
