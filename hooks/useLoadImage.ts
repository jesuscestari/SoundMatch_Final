import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Efecto } from "@/types";

const useLoadImage = (song: Efecto) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("imagenes")
    .getPublicUrl(song.imagen_path);

  return imageData.publicUrl;
};

export default useLoadImage;
