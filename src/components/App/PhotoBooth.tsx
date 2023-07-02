import { AppData } from "@/types/app";
import Window from "../Window/Window";
import { useEffect, useRef } from "react";

const ID: AppData["id"] = "photo-booth";

const PhotoBooth = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      videoRef.current?.play();
    });
  }, []);

  return (
    <Window id={ID}>
      <Window.Body>
        <div className="rounded-b-lg">
          <video
            ref={videoRef}
            className="w-full h-full rotate-y-180 rounded-b-lg"
          />
        </div>
      </Window.Body>
    </Window>
  );
};

export default PhotoBooth;
