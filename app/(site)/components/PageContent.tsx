"use client";

import { Efecto } from "@/types";
import SongItem from "./SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import InfoButton from "./InfoButton";
import LikeButton from "./LikeButton";

interface PageContentProps {
  efectos: Efecto[];
}

const PageContent: React.FC<PageContentProps> = ({ efectos }) => {
  const onPlay = useOnPlay(efectos);

  if (efectos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-2">
        <p className="text-white text-lg font-semibold">No Effects found</p>
        <p className="text--400 text-sm">Try searching for another Effect</p>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col ">
        {efectos.map((song: any) => (
          <div key={song.id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1 pt-9">
              <SongItem onClick={(id: string) => onPlay(id)} data={song} />
            </div>
            <InfoButton songId={song.id} />
            <LikeButton songId={song.id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default PageContent;
