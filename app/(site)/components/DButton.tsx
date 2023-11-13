"use client";

import { useEffect } from "react";
import { BsDownload } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

interface DButtonProps {
  songId: string;
}

const DButton: React.FC<DButtonProps> = ({ songId }) => {
  const { supabaseClient } = useSessionContext();

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

  const handleClick = async () => {
    const descargar = await handleDesc();
    window.location.assign(descargar);
  };

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleClick}
    >
      <Icon color={"white"} size={25} />
    </button>
  );
};

export default DButton;
