"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Efecto } from "@/types";
import MediaItem from "../../(site)/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import BorrarButton from "@/app/(site)/components/BorrarButton";

import { MdDeleteOutline } from "react-icons/md";

interface EffectsContentProps {
  songs: Efecto[];
}

const EffectsContent: React.FC<EffectsContentProps> = ({ songs }) => {
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user, subscription } = useUser();

  const onPlay = useOnPlay(songs);

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
    <div className="flex flex-col gap-y-2 w-full p-6">
      <p className="text-white text-2xl font-semibold text-center pt-4 ">
        Uploaded Sound Effects
      </p>
      {songs.map((item) => (
        <div className="flex items-center gap-x-4 w-full">
          <MediaItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
          <BorrarButton songId={item.id} />
        </div>
      ))}
    </div>
  );
};

export default EffectsContent;
