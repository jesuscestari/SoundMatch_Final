"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useLoadImage from "@/hooks/useLoadImage";
import { Efecto } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import PlayButton from "./PlayButton";

import { GoBookmarkFill } from "react-icons/go";

interface EfectoItemProps {
  data: Efecto;
  onClick: (id: string) => void;
}

const EfectoItem: React.FC<EfectoItemProps> = ({ data, onClick }) => {
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
      gap-x-4
      cursor-pointer 
      hover:bg-neutral-800/50 
      w-full 
      md:p-2 
      rounded-md
      "
      >
        <PlayButton />

        <div
          className="
        relative 
        rounded-md 
        min-h-[58px] 
        min-w-[58px] 
       
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
        </div>
      </div>
    </>
  );
};

export default EfectoItem;
