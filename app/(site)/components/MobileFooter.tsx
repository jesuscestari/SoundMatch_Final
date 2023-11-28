"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

import { MdOutlineBookmark } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

import { BsFillPlusCircleFill } from "react-icons/bs";
import useUploadModal from "@/hooks/useUploadModal";

interface MobileFooterProps {
  className?: string;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ className }) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const subscribeModal = useSubscribeModal();

  const { user, subscription } = useUser();
  const uploadModal = useUploadModal();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    //checkeo si tiene susbcripcion activa, si no abre el modal de suscripcion
    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  const clickLogueado = () => {
    if (!user) {
      return authModal.onOpen();
    }
    router.push("/account");
  };

  return (
    <div
      className={twMerge(
        `
      block
      md:hidden
      fixed
      bottom-0
  
      w-full
      bg-orange-900/50
      pl-4
      pr-4
      pt-2
      pb-4
      `,
        className
      )}
    >
      <div className="w-full flex items-center justify-between ">
        <div className="flex-col items-center">
          <button
            onClick={() => router.push("/")}
            className="
            rounded-full
            p-1
            bg-transparent
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
          "
          >
            <HiHome className="text-white" size={35} />
          </button>
          <p className="">Home</p>{" "}
        </div>

        <div className="flex-col items-center">
          <button
            onClick={() => router.push("/liked")}
            className="
            rounded-full
            p-1
            bg-transparent
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
          "
          >
            <MdOutlineBookmark className="text-white" size={35} />
          </button>
          <p className="">Saved</p>
        </div>

        <div className="flex-col pl-4    items-center">
          <button
            onClick={() => router.push("/search")}
            className="
            rounded-full
            p-1
            bg-transparent
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
          "
          >
            <BsFillPlusCircleFill onClick={onClick} color="#AD390B" size={35} />
          </button>
          <p className="">Upload</p>
        </div>

        <div className="flex-col  items-center">
          <button
            onClick={() => router.push("/search")}
            className="
            rounded-full
            p-1
            bg-transparent
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
          "
          >
            <BiSearch className="text-white" size={35} />
          </button>
          <p className="">Search</p>
        </div>

        <div className="flex-col items-center">
          <Button
            onClick={clickLogueado}
            className="
            rounded-full
            p-1
            bg-transparent
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
          "
          >
            <FaUserAlt className="text-white" size={35} />
          </Button>
          <p className="">Account</p>
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
