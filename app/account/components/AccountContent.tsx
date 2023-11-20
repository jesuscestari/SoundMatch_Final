"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { postData } from "@/libs/helpers";
import Button from "@/app/(site)/components/Button";
import { BsStripe } from "react-icons/bs";

export const revalidate = 0;

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();

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

  return (
    <div className="mb-4 px-6 text-center object-center pt-4">
      <div className="flex justify-center items-center ">
        <FaUserAlt className="mb-2" size={80} />
      </div>
      <div>
        <p>{user?.email}</p>
      </div>

      {!subscription && (
        <div className="flex flex-col  text-center object-center items-center">
          <p>No active plan.</p>
          <Button
            onClick={subscribeModal.onOpen}
            className="w-[300px] bg-orange-500 text-center object-center items-center"
          >
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className=" flex flex-col text-center object-center items-center">
          <p className="pb-4">
            <b> {subscription?.prices?.products?.name} </b>
            plan.
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-[300px] bg-amber-700/30  text-center object-center text-slate-50 "
          >
            Manage Subscription
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
