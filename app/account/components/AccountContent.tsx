"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";

import useSubscribeModal from "@/hooks/useSubscribeModal";
import { postData } from "@/libs/helpers";
import Button from "@/app/(site)/components/Button";

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
    <div className="mb-7 px-6 text-center object-center mt-4">
      <div className="flex justify-center items-center">
        <img
          src={"https://cdn-icons-png.flaticon.com/512/6681/6681204.png"}
          alt=""
          width={100}
          className=" rounded-full  "
        />
      </div>
      <div>
        <p className="">{user?.email}</p>
      </div>

      {!subscription && (
        <div className="flex flex-col gap-y-4 text-center object-center items-center">
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
        <div className=" gap-y-4 flex flex-col text-center object-center items-center">
          <p className="pb-4">
            <b> {subscription?.prices?.products?.name} </b>
            plan.
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-[300px] bg-orange-500  text-center object-center"
          >
            Manage Subscription
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
