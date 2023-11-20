"use client";

import { FiUpload } from "react-icons/fi";
import useUploadModal from "@/hooks/useUploadModal";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { GoBookmark } from "react-icons/go";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

const SubirContent = () => {
  const uploadModal = useUploadModal();
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const { user, subscription } = useUser();
  const supabaseClient = useSupabaseClient();

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
  const userEmail = user?.email;

  const fetchData = async () => {
    const { data } = await supabaseClient.rpc("sumPuntos", {
      author: userEmail,
    });
    return data;
  };

  const puntosTotales = fetchData();

  return (
    <>
      <div className="pt-14 flex flex-row ">
        <div className="px-10">
          <GoBookmark
            size={90}
            className="text--400  hover:text-white transition "
          />
          <p className="text-white text-2xl font-semibold  text-center  mb-9">
            {puntosTotales}
          </p>
        </div>
        <div className="px-10">
          <FiUpload
            size={90}
            onClick={onClick}
            className="text--400 cursor-pointer hover:text-white transition "
          />
          <p className="text-white text-2xl font-semibold text-center   mb-9">
            Upload
          </p>
        </div>
      </div>
    </>
  );
};

export default SubirContent;
