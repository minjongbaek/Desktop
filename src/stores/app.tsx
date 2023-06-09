import Window from "@/components/Window/Window";
import { AppData } from "@/types/app";
import { atom } from "recoil";

export const appsState = atom<AppData[]>({
  key: "apps",
  default: [
    {
      id: "finder",
      name: "Finder",
      iconUrl: "/icons/app/finder.png",
      active: false,
      content: (
        <Window>
          <Window.Header>Finder</Window.Header>
        </Window>
      ),
    },
    {
      id: "chrome",
      name: "Google Chrome",
      iconUrl: "/icons/app/chrome.png",
      active: false,
      content: (
        <Window>
          <Window.Header>Chrome</Window.Header>
        </Window>
      ),
    },
  ],
});
