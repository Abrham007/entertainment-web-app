import { FC, useEffect } from "react";
import Iframe from "react-iframe";

interface IframePlayerProps {
  id: string;
}

const IframePlayer: FC<IframePlayerProps> = ({ id }) => {
  useEffect(() => {
    new YT.Player(`yt-player-${id}`, {
      events: {
        onReady: (event) => {
          event.target.mute();
          event.target.playVideo();
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Iframe
      id={`yt-player-${id}`}
      url={`https://www.youtube.com/embed/${id}?enablejsapi=1`}
      width="100%"
      height="100%"
      className={`z-30`}
      display="block"
      position="relative"
    />
  );
};

export default IframePlayer;
