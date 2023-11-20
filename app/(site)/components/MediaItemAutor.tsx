"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Efecto } from "@/types";
import usePlayer from "@/hooks/usePlayer";

interface MediaItemProps {
  data: Efecto;
  onClick?: (id: string) => void;
}

const MediaItemAutor: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const player = usePlayer();
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    return player.setId(data.id);
  };

  const autor = data.autor.split("@")[0];

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
      md:p-4
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
        <p className="text-neutral-400 truncate">By {autor}</p>
      </div>
    </div>
  );
};

export default MediaItemAutor;
