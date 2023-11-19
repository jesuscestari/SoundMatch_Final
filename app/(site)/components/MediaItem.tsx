"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Efecto } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import { GoBookmarkFill } from "react-icons/go";

interface MediaItemProps {
  data: Efecto;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const player = usePlayer();
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    return player.setId(data.id);
  };

  return (
    <div
      onClick={handleClick}
      className="
      flex 
      items-center 
      gap-x-3 
      cursor-pointer 
      hover:bg-neutral-800/50 
      w-full 
      p-2 
      rounded-md
      "
    >
      <div
        className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
      >
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          alt="MediaItem"
          className="object-cover "
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.titulo}</p>
        <p className="text--400 text-sm truncate">By {data.autor}</p>
        <div className="pt-1  flex text--400 text-sm truncate">
          <GoBookmarkFill size={20} />
          <span className="pl-1">{data.puntos}</span>
        </div>
      </div>
    </div>
  );
};

export default MediaItem;
