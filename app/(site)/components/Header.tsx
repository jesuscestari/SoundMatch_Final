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

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
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
        
        w-full
        bg-gradient-to-b
        from-orange-900/90
        md:p-6
        p-2
 
  `,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden  gap-x-2 items-center"></div>

        <div className="flex   gap-x-2 items-center ">
          <button
            onClick={() => router.push("/")}
            className="
            hidden
        md:block
          rounded-full
          p-2
          bg-white
        
          items-center
          justify-center
          hover:opacity-75
          transition
          "
          >
            <HiHome className="text-black" size={25} />
          </button>
          <button
            onClick={() => router.push("/liked")}
            className="
          rounded-full
          p-2
          bg-white
          hidden
        md:block
          items-center
          justify-center
          hover:opacity-75
          transition
          "
          >
            <MdOutlineBookmark className="text-black" size={25} />
          </button>

          <button
            className="
          rounded-full
          p-2
          bg-white
          hidden
        md:block
          items-center
          justify-center
          hover:opacity-75
          transition
          "
          >
            <BiSearch
              onClick={() => router.push("/search")}
              className="text-black"
              size={25}
            />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex  gap-x-4 items-center">
              <Button
                onClick={handleLogout}
                className="bg-white   hidden
        md:block  px-6 py-2"
              >
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white   hidden
                md:block"
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
              hidden
        md:block
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

export default Header;
