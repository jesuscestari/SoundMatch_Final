"use client";

import { Efecto } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";

import { RiSoundModuleFill } from "react-icons/ri";
import MediaItemSideBar from "./MediaItemSideBar";

interface LibraryProps {
  songs: Efecto[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div
          className="inline-flex
        items-center
        gap-x-2"
        >
          <RiSoundModuleFill className="text--400" size={26} />
          <p className="text--400 font-medium text-md">My Sound Effects</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3 ">
        {songs.map((item) => (
          <MediaItemSideBar
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
