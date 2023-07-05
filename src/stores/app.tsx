import Blog from "@/components/App/Blog";
import PhotoBooth from "@/components/App/PhotoBooth";
import { AppData } from "@/types/app";
import { atom, selectorFamily } from "recoil";

export const appsAtom = atom<AppData[]>({
  key: "appsAtom",
  default: [
    {
      id: "blog",
      name: "Blog.minjong",
      iconUrl: `/icons/app/blog.png`,
      active: false,
      content: <Blog />,
      isMaxSize: false,
      size: {
        width: 800,
        height: 600,
      },
      position: {
        x: 50,
        y: 50,
      },
      focus: false,
    },
    {
      id: "photo-booth",
      name: "Photo Booth",
      iconUrl: `/icons/app/photo-booth.png`,
      active: false,
      content: <PhotoBooth />,
      isMaxSize: false,
      size: {
        width: 800,
        height: 600,
      },
      position: {
        x: 200,
        y: 400,
      },
      focus: false,
    },
  ],
});

export const appState = selectorFamily({
  key: "app",
  get:
    (appId: AppData["id"]) =>
    ({ get }) =>
      get(appsAtom).find((app) => app.id === appId) as AppData,
  set:
    (appId: AppData["id"]) =>
    ({ set }, newValue) => {
      set(appsAtom, (prevApps) => {
        const apps = [...prevApps];
        const index = apps.findIndex((app) => app.id === appId);
        apps[index] = newValue as AppData;
        return apps;
      });
    },
});
