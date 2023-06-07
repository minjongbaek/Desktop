declare module "*.svg?react" {
  import React from "react";
  const svg: React.FC<React.SVGProps<SVGSVGElement>>;
  export default svg;
}
