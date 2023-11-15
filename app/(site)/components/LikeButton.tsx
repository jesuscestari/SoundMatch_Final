"use client";

import { useEffect, useState } from "react";

import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";

import useAuthModal from "@/hooks/useAuthModal";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user, subscription } = useUser();
  const subscribeModal = useSubscribeModal();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("efectos_likeados")
        .select("*")
        .eq("user_id", user.id)
        .eq("efectos_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? GoBookmarkFill : GoBookmark;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }
    if (!subscription) {
      return subscribeModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("efectos_likeados")
        .delete()
        .eq("user_id", user.id)
        .eq("efectos_id", songId);
      //funcion "decremento" EN SUPABASE
      await supabaseClient.rpc("decremento", { row_id: songId });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("efectos_likeados").insert({
        efectos_id: songId,
        user_id: user.id,
      });
      //SUMAR LIKE llamando a la funcion o stored "incremento" EN SUPABASE
      await supabaseClient.rpc("incremento", { row_id: songId });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Success");
      }
    }

    router.refresh();
  };

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleLike}
    >
      <Icon color={isLiked ? "#4c1d95 " : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
