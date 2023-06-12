"use client";

import { appAtomFamily } from "@/stores/app";
import { AppData } from "@/types/app";
import {
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { Rnd } from "react-rnd";
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
    x: 200,
    y: 100,
  });

  const { isMaxSize } = useRecoilValue(appAtomFamily("chrome"));

  return (
    <Rnd
      bounds="parent"
      handle=".cursor"
      minWidth={600}
      minHeight={400}
      size={{
        width: isMaxSize ? "100%" : size.width,
        height: isMaxSize ? "100%" : size.height,
      }}
      position={{
        x: isMaxSize ? 0 : size.x,
        y: isMaxSize ? 0 : size.y,
      }}
      onResizeStop={(
        _event,
        _direction,
        { style: { width, height } },
        _delta,
        position
      ) => {
        if (!isMaxSize) {
          setSize({
            ...size,
            width: width,
            height: height,
            ...position,
          });
        }
      }}
      onDragStop={(_event, { x, y }) => {
        if (!isMaxSize) {
          setSize({ ...size, x, y });
        }
      }}
      disableDragging={isMaxSize}
      enableResizing={!isMaxSize}
      style={{
        display: "flex",
      }}
      dragHandleClassName="header"
      className="rounded-lg flex-col z-60"
    >
      {children}
    </Rnd>
  );
};

const Header = ({ id }: Pick<AppData, "id"> & PropsWithChildren) => {
  const [app, setApp] = useRecoilState(appAtomFamily(id));

  const handleClickRedButton = (event: MouseEvent<HTMLButtonElement>) => {
    setApp({ ...app, active: !app.active });
    event.preventDefault();
  };

  const handleClickGreenButton = (event: MouseEvent<HTMLElement>) => {
    setApp({ ...app, isMaxSize: !app.isMaxSize });
    event.preventDefault();
  };

  return (
    <div
      className="header flex items-center justify-center px-4 py-1 bg-lightgrey/95 rounded-t-lg"
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
