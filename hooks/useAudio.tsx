import { useCallback, useMemo, useState } from "react";

export enum AudioState {
   UNDEFINED,
   INIT,
   PLAYING,
   PAUSED
}

const useAudio = (src: string) => {
   const [audioState, setAudioState] = useState(AudioState.UNDEFINED);
   const audio = useMemo(() => {
      if (typeof Audio != "undefined") {
         const audio = new Audio(src);
         setAudioState(AudioState.INIT);
         return audio;
      }
      return undefined;
   }, [src]);

   const play = useCallback(() => {
      if (audioState == AudioState.PLAYING || audioState == AudioState.UNDEFINED) return;
      setAudioState(AudioState.PLAYING);
      audio?.play();
   }, [audio, audioState]);

   const pause = useCallback(() => {
      if (audioState == AudioState.PAUSED || audioState == AudioState.UNDEFINED) return;
      setAudioState(AudioState.PAUSED);
      audio?.pause();
   }, [audio, audioState]);

   return { audio, play, pause };
};

export default useAudio;
