"use client";

import { appAtomFamily } from "@/stores/app";
import { AppData } from "@/types/app";
import { PropsWithChildren, useState } from "react";
import { Rnd } from "react-rnd";
import { useRecoilState } from "recoil";

type WindowState = {
  width: number;
  height: number;
  x: number;
  y: number;
  isMax: boolean;
};

const Window = ({ children }: PropsWithChildren) => {
  const [size, setSize] = useState<WindowState>({
    width: 800,
    height: 600,
    x: 200,
    y: 100,
    isMax: false,
  });

  return (
    <Rnd
      bounds="parent"
      handle=".cursor"
      minWidth={600}
      minHeight={400}
      size={{
        width: size.width,
        height: size.height,
      }}
      position={{
        x: size.x,
        y: size.y,
      }}
      onResizeStop={(
        _event,
        _direction,
        { style: { width, height } },
        _delta,
        position
      ) =>
        setSize({
          ...size,
          width: Number(width),
          height: Number(height),
          ...position,
        })
      }
      onDragStop={(_event, { x, y }) => setSize({ ...size, x, y })}
      style={{
        display: "flex",
      }}
      dragHandleClassName="header"
      className="relative rounded-lg flex-col"
    >
      {children}
    </Rnd>
  );
};

const Header = ({ id }: Pick<AppData, "id"> & PropsWithChildren) => {
  const [app, setApp] = useRecoilState(appAtomFamily(id));

  const handleClickRedButton = () => {
    setApp({ ...app, active: !app.active });
  };

  const handleClickGreenButton = () => {};

  return (
    <div className="header flex items-center justify-center px-4 py-1 bg-lightgrey/95 rounded-t-lg">
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
    <div className="w-full h-full px-2 py-0.5 bg-white/95 rounded-b-lg">
      {children}
    </div>
  );
};

Window.Header = Header;
Window.Body = Body;

export default Window;
