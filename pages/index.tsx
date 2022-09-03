import type { NextPage } from "next";
import Layout from "../components/Layout/Layout";
import Player from "../components/Player/Player";
import { songsdata } from "../components/audios";

import { useRef, useState, useEffect } from "react";
import Head from "next/head";

const App = () => {
  const [songs, setSongs] = useState(songsdata);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[0]);

  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      // @ts-ignore
      audioElem.current.play();
    } else {
      // @ts-ignore
      audioElem.current.pause();
    }
  }, [isplaying]);

  const onPlaying = () => {
    // @ts-ignore
    const duration = audioElem.current.duration;
    // @ts-ignore
    const ct = audioElem.current.currentTime;

    setCurrentSong({
      ...currentSong,
      // @ts-ignore
      progress: (ct / duration) * 100,
      length: duration,
    });
  };

  return (
    <div className="App">
      <Head>
        <title>Clean Music Player</title>
      </Head>
      <audio
        src={currentSong.url}
        // @ts-ignore

        ref={audioElem}
        // eslint-disable-next-line react/no-unknown-property
        // @ts-ignore
        onTimeUpdate={onPlaying}
      />
      <Player
        songs={songs}
        // @ts-ignore
        setSongs={setSongs}
        isplaying={isplaying}
        setisplaying={setisplaying}
        audioElem={audioElem}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
    </div>
  );
};

export default App;
