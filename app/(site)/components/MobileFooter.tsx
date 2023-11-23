"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { MdOutlineBookmark } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

import toast from "react-hot-toast";

interface MobileFooterProps {
  children: React.ReactNode;
  className?: string;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
    }
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
        p-5
        `,
        className
      )}
    >
      <div className="w-full  flex items-center justify-between">
        <div className="hidden  gap-x-2 items-center"></div>

        <div className="flex-col gap-x-2 items-center ">
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
          {" "}
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

        <div className="flex-col items-center">
          <button
            onClick={() => router.push("/search")}
            className="
            rounded-full
            p-1
            bg-transparent
            
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

        <div className="flex justify-between items-center gap-x-2 ">
          {user ? (
            <div className="flex gap-x-2 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="
              bg-white
              px-6
              py-2
              "
                >
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default MobileFooter;
