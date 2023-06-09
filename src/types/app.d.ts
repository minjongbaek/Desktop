export interface AppData {
  id: "blog" | "photo-booth";
  name: string;
  iconUrl: string;
  content: JSX.Element;
  active: boolean;
  isMaxSize: boolean;
  size: {
    width: number;
    height: number;
  };
  position: {
    x: number;
    y: number;
  };
  focus: boolean;
}
