import Image from "next/image";
import "./globals.css";
import wallpaperSrc from "@public/images/wallpaper/ventura.jpg";

export const metadata = {
  title: "Desktop.minjong",
  description: "제 데스크탑을 소개합니다!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="w-full h-screen fixed">
        <div className="w-full h-full absolute">
          <Image
            src={wallpaperSrc}
            alt="desktop"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            placeholder="blur"
          />
        </div>
        <div className="relative w-full h-full">{children}</div>
      </body>
    </html>
  );
}
