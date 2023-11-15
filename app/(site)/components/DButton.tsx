"use client";

import { BsDownload } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";

interface DButtonProps {
  songId: string;
}

const DButton: React.FC<DButtonProps> = ({ songId }) => {
  const { supabaseClient } = useSessionContext();
  const subscribeModal = useSubscribeModal();
  const { subscription } = useUser();

  const getEfecto = async () => {
    const { data } = await supabaseClient
      .from("efectos")
      .select("efecto_path")
      .eq("id", songId)
      .single();
    console.log(data?.efecto_path);
    return data?.efecto_path;
  };

  const urlEfecto = getEfecto();

  const handleDesc = async () => {
    const { data: songData } = supabaseClient.storage
      .from("efectos")
      .getPublicUrl(await urlEfecto, {
        download: true,
      });
    return songData.publicUrl;
  };

  const Icon = BsDownload;

  const handleClickDescargar = async () => {
    if (!subscription) {
      return subscribeModal.onOpen();
    }
    const descargar = await handleDesc();
    window.location.assign(descargar);
    toast.success("Download done!");
  };

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleClickDescargar}
    >
      <Icon color={"white"} size={25} />
    </button>
  );
};

export default DButton;
