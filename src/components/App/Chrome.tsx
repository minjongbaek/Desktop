import { AppData } from "@/types/app";
import Window from "../Window/Window";

const ID: AppData["id"] = "chrome";

const Chrome = () => {
  return (
    <Window>
      <Window.Header id={ID} />
      <Window.Body>Body...</Window.Body>
    </Window>
  );
};

export default Chrome;
