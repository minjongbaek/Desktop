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
      dragHandleClassName="header"
      className="relative rounded-lg bg-lightgrey/95"
    >
      {children}
    </Rnd>
  );
};

const WindowHeader = ({
  id,
  children,
}: Pick<AppData, "id"> & PropsWithChildren) => {
  const [app, setApp] = useRecoilState(appAtomFamily(id));

  const handleClickRedButton = () => {
    setApp({ ...app, active: !app.active });
  };

  const handleClickGreenButton = () => {};

  return (
    <div className="header flex px-4 py-1">
      <div className="flex items-center gap-1.5">
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
      {children}
    </div>
  );
};

export default Window;
