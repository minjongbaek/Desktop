import AppleIcon from "@icons/menu/apple.svg?react";
import ControlCenterIcon from "@icons/menu/control-center.svg?react";
import Clock from "./Clock";
import { PropsWithChildren } from "react";

const MenuBar = () => {
  return (
    <div className="flex items-center justify-between bg-white/30 backdrop-blur-sm select-none text-sm px-2">
      <div className="flex items-center">
        <Menu>
          <AppleIcon width={20} />
        </Menu>
        <Menu>
          <div className="font-semibold">Finder</div>
        </Menu>
      </div>
      <div className="flex items-center">
        <Menu>
          <ControlCenterIcon width={16} />
        </Menu>
        <Menu>
          <Clock />
        </Menu>
      </div>
    </div>
  );
};

const Menu = ({ children }: PropsWithChildren) => {
  return <div className="py-1 px-2">{children}</div>;
};

export default MenuBar;
