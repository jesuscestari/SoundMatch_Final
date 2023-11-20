"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useLoadImage from "@/hooks/useLoadImage";
import { Efecto } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import PlayButton from "./PlayButton";

import { GoBookmarkFill } from "react-icons/go";

interface SongItemProps {
  data: Efecto;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);
  const player = usePlayer();
  const router = useRouter();

  const autor = data.autor.split("@")[0];

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    return player.setId(data.id);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="
        relative 
        transition
        group
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
            onClick={() => router.push("/efecto/" + data.id)}
            className="object-cover"
            src={imagePath || "/images/liked.png"}
            fill
            alt="Image"
          />
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className="text-white truncate">{data.titulo}</p>
          <p className="text--400 text-sm truncate">By {autor}</p>
          <div className="pt-1  flex text--400 text-sm truncate">
            <GoBookmarkFill size={20} />
            <span className="pl-1">{data.puntos}</span>
          </div>
          <div
            onClick={handleClick}
            className="
          absolute 
        top-5
          right-5
        "
          >
            <PlayButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default SongItem;
