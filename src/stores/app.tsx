import Blog from "@/components/App/Blog";
import { AppData } from "@/types/app";
import { atom, atomFamily } from "recoil";

const getName = (appId: AppData["id"]) => {
  switch (appId) {
    case "blog":
      return "Blog.minjong";
    default:
      console.error(`${appId}는 올바르지 않은 appId 에요.`);
      return "";
  }
};

const getContent = (appId: AppData["id"]) => {
  switch (appId) {
    case "blog":
      return <Blog />;
    default:
      console.error(`${appId}는 올바르지 않은 appId 에요.`);
      return <></>;
  }
};

export const appAtomFamily = atomFamily<AppData, AppData["id"]>({
  key: "appAtomFamily",
  default: (id) => ({
    id,
    name: getName(id),
    iconUrl: `/icons/app/${id}.png`,
    active: false,
    content: getContent(id),
    isMaxSize: false,
    size: {
      width: 800,
      height: 600,
    },
    position: {
      x: 200,
      y: 50,
    },
  }),
});

export const appIdsAtom = atom<AppData["id"][]>({
  key: "appIdsAtom",
  default: ["blog"],
});
