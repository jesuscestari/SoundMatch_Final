"use client";

import { FiUpload } from "react-icons/fi";
import useUploadModal from "@/hooks/useUploadModal";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";

const SubirContent = () => {
  const uploadModal = useUploadModal();
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const { user, subscription } = useUser();

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

  return (
    <div>
      <FiUpload
        size={110}
        onClick={onClick}
        className="text-neutral-400 cursor-pointer hover:text-white transition mt-11"
      />
      <p className="text-white text-2xl font-semibold text-center  mb-9">
        Upload
      </p>
    </div>
  );
};

export default SubirContent;
