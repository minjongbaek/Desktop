import { AppData } from "@/types/app";
import Window from "../Window/Window";
import { ComponentProps, FormEvent, MouseEvent, useRef } from "react";

import LeftArrowIcon from "@public/icons/chrome/left-arrow.svg?react";
import RightArrowIcon from "@public/icons/chrome/right-arrow.svg?react";
import RefreshIcon from "@public/icons/chrome/refresh.svg?react";
import HomeIcon from "@public/icons/chrome/home.svg?react";
import { useRouter } from "next/navigation";

const ID: AppData["id"] = "blog";

const Blog = () => {
  const urlInputRef = useRef<HTMLInputElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();

  const handleClickLeftButton = () => {
    router.back();
  };

  const handleClickRightButton = () => {
    router.forward();
  };

  const handleClickRefreshButton = () => {
    if (!urlInputRef.current) return;
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    router.refresh();
  };

  const handleClickHomeButton = () => {
    if (!urlInputRef.current) return;
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    urlInputRef.current.value = blogUrl;
    iframeRef.current.contentWindow.location.href = blogUrl;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!urlInputRef.current) return;
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    iframeRef.current.contentWindow.location.href = urlInputRef.current.value;
  };

  return (
    <Window id={ID}>
      <Window.Body>
        <div className="flex flex-col h-full">
          <form
            className="flex text-sm px-1.5 py-1 gap-1.5"
            onSubmit={(event) => handleSubmit(event)}
          >
            <div className="flex items-center gap-0.5">
              <ChromeMenuButton onClick={handleClickLeftButton}>
                <LeftArrowIcon className="w-3" />
              </ChromeMenuButton>
              <ChromeMenuButton onClick={handleClickRightButton}>
                <RightArrowIcon className="w-3" />
              </ChromeMenuButton>
              <ChromeMenuButton onClick={handleClickRefreshButton}>
                <RefreshIcon className="w-3" />
              </ChromeMenuButton>
              <ChromeMenuButton onClick={handleClickHomeButton}>
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
            ref={iframeRef}
            src={blogUrl}
          />
        </div>
      </Window.Body>
    </Window>
  );
};

const ChromeMenuButton = ({
  children,
  disabled,
  type = "button",
  onClick,
}: ComponentProps<"button">) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClick && onClick(event);
  };
  return (
    <button
      type={type}
      className="rounded-full hover:bg-gray-200 hover:disabled:bg-transparent transition-colors duration-300 p-1.5 disabled:stroke-gray-300 disabled:fill-gray-300"
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Blog;

const blogUrl = "https://blog.minjong.codes";
