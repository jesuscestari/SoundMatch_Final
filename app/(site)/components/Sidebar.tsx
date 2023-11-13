"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Efecto } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";
import { useUser } from "@/hooks/useUser";

interface SidebarProps {
  children: React.ReactNode;
  songs: Efecto[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname();
  const player = usePlayer();
  const { subscription, user } = useUser();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },

      {
        icon: AiFillHeart,
        label: "Liked ",
        active: pathname === "/liked",
        href: "/liked",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

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
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>

        <Box className="overflow-y-auto h-32 ">
          <div
            className="inline-flex
        items-center
        gap-x-2
        pt-2"
          >
            {" "}
            <div className="flex items-center justify-between px-5  pt-4">
              <BiUser className="text-neutral-400" size={26} />
              <p className="text-neutral-200 font-medium text-md pl-2">
                {user?.email}
              </p>
            </div>
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
