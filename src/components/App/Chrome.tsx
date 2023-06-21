import { AppData } from "@/types/app";
import Window from "../Window/Window";
import { useRecoilValue } from "recoil";
import { appAtomFamily } from "@/stores/app";
import { PropsWithChildren, useRef } from "react";

import LeftArrowIcon from "@public/icons/chrome/left-arrow.svg?react";
import RightArrowIcon from "@public/icons/chrome/right-arrow.svg?react";
import RefreshIcon from "@public/icons/chrome/refresh.svg?react";
import HomeIcon from "@public/icons/chrome/home.svg?react";

const ID: AppData["id"] = "chrome";

const Chrome = () => {
  const app = useRecoilValue(appAtomFamily(ID));
  const urlInputRef = useRef<HTMLInputElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <Window id={ID}>
      <Window.Body>
        <div className="flex flex-col h-full">
          <form
            className="flex text-sm px-1.5 py-0.5 gap-1.5"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex items-center gap-0.5">
              <ChromeMenuButton>
                <LeftArrowIcon className="w-3" />
              </ChromeMenuButton>
              <ChromeMenuButton>
                <RightArrowIcon className="w-3" />
              </ChromeMenuButton>
              <ChromeMenuButton>
                <RefreshIcon className="w-3" />
              </ChromeMenuButton>
              <ChromeMenuButton>
                <HomeIcon className="w-3" />
              </ChromeMenuButton>
            </div>
            <input
              className="flex bg-gray-100 rounded-xl focus:bg-white px-2 w-full py-1"
              ref={urlInputRef}
              defaultValue={blogUrl}
            />
          </form>
          <iframe
            className="w-full h-full rounded-b-lg"
            src={blogUrl}
            ref={iframeRef}
          />
        </div>
      </Window.Body>
    </Window>
  );
};

const ChromeMenuButton = ({ children }: PropsWithChildren) => {
  return (
    <button
      type="button"
      className="rounded-full hover:bg-gray-200 transition-colors duration-300 p-1.5"
    >
      {children}
    </button>
  );
};

export default Chrome;

const blogUrl = "https://blog.minjong.codes";
