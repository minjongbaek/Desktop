import Image from "next/image";
import AppIcon from "./AppIcon";

const Dock = () => {
  return (
    <div className="fixed bottom-0 w-full">
      <div className="flex mx-auto w-max rounded-2xl bg-white/30 backdrop-blur-sm p-0.5 shadow-2xl">
        <AppIcon appName="finder" />
        <AppIcon appName="chrome" />
      </div>
    </div>
  );
};

export default Dock;
