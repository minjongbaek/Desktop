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
    <Window id={ID} lockSize>
      <Window.Body>
        <video
          ref={videoRef}
          className="w-full rotate-y-180 rounded-b-lg object-contain"
        />
      </Window.Body>
    </Window>
  );
};

export default PhotoBooth;
