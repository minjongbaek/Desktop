"use client";

import { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

const RecoilRootWrapper = ({ children }: PropsWithChildren) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootWrapper;
