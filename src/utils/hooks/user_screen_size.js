import { useEffect, useState } from "react";
import mediaQeries from "../config/mediaqueries";

const useScreenSize = () => {
  const getMediaQuery = (size) => {
    if (size < 400) return mediaQeries.extraSmall;
    else if (size > 400 && size < 700) return mediaQeries.medium;
    else if (size > 700 && size < 1200) return mediaQeries.large;
    else return mediaQeries.extraLarge;
  };
  const [media, setMedia] = useState(getMediaQuery(window.innerWidth));
  useEffect(() => {
    window.addEventListener("resize", () => {
      setMedia(getMediaQuery(window.innerWidth));
    });
  }, []);
  return media;
};

export default useScreenSize;
