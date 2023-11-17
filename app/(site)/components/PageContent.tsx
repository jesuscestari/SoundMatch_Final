"use client";

import { Efecto } from "@/types";
import SongItem from "./SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { BiUser } from "react-icons/bi";
import Box from "./Box";
import { useUser } from "@/hooks/useUser";

interface PageContentProps {
  efectos: Efecto[];
}

const PageContent: React.FC<PageContentProps> = ({ efectos }) => {
  const onPlay = useOnPlay(efectos);
  const { subscription, user } = useUser();

  if (efectos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-2">
        <p className="text-white text-lg font-semibold">No songs found</p>
        <p className="text--400 text-sm">Try searching for another song</p>
      </div>
    );
  }
  return (
    <>
      <div
        className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4
        "
      >
        {efectos.map((item) => (
          <SongItem
            key={item.id}
            onClick={(id: string) => onPlay(id)}
            data={item}
          />
        ))}
      </div>
    </>
  );
};

export default PageContent;
