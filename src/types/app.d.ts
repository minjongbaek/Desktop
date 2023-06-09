export interface AppData {
  id: "finder" | "chrome";
  name: string;
  iconUrl: string;
  content: JSX.Element;
  active: boolean;
}
