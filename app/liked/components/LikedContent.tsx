"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Efecto } from "@/types";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/app/(site)/components/MediaItem";
import LikeButton from "@/app/(site)/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import DButton from "@/app/(site)/components/DButton";
import InfoButton from "@/app/(site)/components/InfoButton";

interface LikedContentProps {
  songs: Efecto[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full px-6 
          text--400
        "
      >
        No liked effects.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song: any) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <InfoButton songId={song.id} />
          <LikeButton songId={song.id} />
          <DButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
