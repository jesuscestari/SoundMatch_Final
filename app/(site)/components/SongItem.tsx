"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useLoadImage from "@/hooks/useLoadImage";
import { Efecto } from "@/types";

import PlayButton from "./PlayButton";

import { GoBookmarkFill } from "react-icons/go";

interface SongItemProps {
  data: Efecto;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);
  const router = useRouter();

  return (
    <div
      className="
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-400/10
        cursor-pointer 
        hover:bg-400/10 
        transition 
        p-3
      "
    >
      <div
        className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
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
      <div
        onClick={() => router.push("/efecto/" + data.id)}
        className="flex flex-col items-start w-full pt-4 gap-y-1"
      >
        <p className="font-semibold truncate w-full">{data.titulo}</p>
        <p
          className="
            text--400 
            text-sm 
            pb-4 
            w-full 
            truncate
          "
        >
          By {data.autor}
        </p>
        <p className="flex">
          <GoBookmarkFill size={20} />
          <span className="pl-1">{data.puntos}</span>
        </p>
      </div>
      <div
        onClick={() => onClick(data.id)}
        className="
          absolute 
          bottom-24 
          right-5
        "
      >
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
