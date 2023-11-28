"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { postData } from "@/libs/helpers";
import Button from "@/app/(site)/components/Button";

import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import toast from "react-hot-toast";

export const revalidate = 0;

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();

  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });
      window.location.assign(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setLoading(false);
  };

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
    <>
      <div className="mb-4 px-6 text-center object-center pt-4">
        <div className="flex justify-center items-center ">
          <FaUserAlt className="mb-2" size={80} />
        </div>
        <div>
          <p>{user?.email}</p>
        </div>

        {!subscription && (
          <>
            <div className="">
              <p>No active plan.</p>
            </div>
            <div className="flex  text-center justify-center items-center">
              <Button
                onClick={subscribeModal.onOpen}
                className="w-[300px] bg-amber-700/30 mr-1 text-center text-white "
              >
                Subscribe
              </Button>
              <Button
                onClick={handleLogout}
                className="w-[300px] bg-white ml-1 text-center "
              >
                Logout
              </Button>
            </div>
          </>
        )}
        {subscription && (
          <div className=" flex flex-col text-center object-center items-center">
            <p className="pb-4 text-teal-400">
              <b> {subscription?.prices?.products?.name} </b>
              plan.
            </p>
            <div className="flex  text-center justify-center items-center">
              <Button
                disabled={loading || isLoading}
                onClick={redirectToCustomerPortal}
                className="w-[150px] md:w-[200px] bg-amber-700/30 mr-1 text-center text-white"
              >
                Manage Plan
              </Button>
              <Button
                onClick={handleLogout}
                className="w-[150px] md:w-[200px] bg-white ml-1 text-center"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>{" "}
    </>
  );
};

export default AccountContent;
