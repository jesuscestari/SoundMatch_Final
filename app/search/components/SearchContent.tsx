"use client";

import { Efecto } from "@/types";

import MediaItem from "@/app/(site)/components/MediaItem";
import LikeButton from "@/app/(site)/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import InfoButton from "@/app/(site)/components/InfoButton";

interface SearchContentProps {
  efects: Efecto[];
}

const SearchContent: React.FC<SearchContentProps> = ({ efects }) => {
  const onPlay = useOnPlay(efects);

  if (efects.length === 0) {
    return (
      <div
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full 
          px-6 
          text--400
        "
      >
        No SFX found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {efects.map((song: Efecto) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>

          <InfoButton songId={song.id} />
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
