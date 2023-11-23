"use client";

import { BiUser } from "react-icons/bi";
import Box from "./Box";

import Library from "./Library";
import { Efecto } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";
import { useUser } from "@/hooks/useUser";
import img from "@/public/images/logo.png";
import Image from "next/image";

interface SidebarProps {
  children: React.ReactNode;
  songs: Efecto[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const player = usePlayer();
  const { subscription, user } = useUser();

  const nombreUser = user?.email?.split("@")[0];

  return (
    <div
      className={twMerge(
        `
    flex
    h-full
`,
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div
        className="
    hidden 
    md:flex
    flex-col
    gap-y-2
    bg-black
    h-full
    w-[300px]
    p-2
    "
      >
        <Box className=" h-62">
          <Image src={img} width={500} height={500} alt="" />
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>

        <Box className="h-44">
          <div className="flex items-center justify-center mt-5 mr-4">
            <BiUser className="" size={26} />
            <p className=" text--200 font-medium text-md ">{nombreUser}</p>
          </div>

          <div className=" px-6 ">
            {!subscription && (
              <div className="flex flex-col gap-y-4">
                <p>No active plan.</p>
              </div>
            )}
            {subscription && (
              <div className="flex flex-col gap-y-4">
                <p
                  className="text-teal-400
                text-center"
                >
                  {subscription?.prices?.products?.name}
                </p>
              </div>
            )}
          </div>
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
