import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Efecto } from "@/types";

const useLoadSongUrl = (song: Efecto) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return "";
  }

  const { data: songData } = supabaseClient.storage
    .from("efectos")
    .getPublicUrl(song.efecto_path);

  return songData.publicUrl;
};

export default useLoadSongUrl;
