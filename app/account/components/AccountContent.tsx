"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
// import { useSessionContext } from "@supabase/auth-helpers-react";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { postData } from "@/libs/helpers";
import Button from "@/app/(site)/components/Button";

export const revalidate = 0;

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();
  // const { supabaseClient } = useSessionContext();

  const [loading, setLoading] = useState(false);

  /* const showBuckets = async () => {
    try {
      const { data, error } = await supabaseClient.storage.getBucket("efectos");
      if (error) throw new Error("no se encontro buckets");
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showBuckets().then((response) => console.log(response));
  });*/

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
    <div className="mb-7 px-6 ">
      <div>
        <img
          src={"https://cdn-icons-png.flaticon.com/512/6681/6681204.png"}
          alt=""
          width={100}
          className=" rounded-full"
        />
        {user?.email}
      </div>

      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No active plan.</p>
          <Button
            onClick={subscribeModal.onOpen}
            className="w-[300px] bg-violet-500"
          >
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the
            <b> {subscription?.prices?.products?.name} </b>
            plan.
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-[300px] bg-violet-500"
          >
            Manage Subscription
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
