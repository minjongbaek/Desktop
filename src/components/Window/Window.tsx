"use client";

import { PropsWithChildren, useState } from "react";
import { Rnd } from "react-rnd";

type WindowState = {
  width: number;
  height: number;
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

  return (
    <Rnd
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
      <Header />
      {children}
    </Rnd>
  );
};

const Header = ({ children }: PropsWithChildren) => {
  return <div className="header px-2 py-1">{children}</div>;
};

Window.Header = Header;

export default Window;
