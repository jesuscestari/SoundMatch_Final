import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Efecto } from "@/types";

const getEfectoMayor = async (): Promise<Efecto[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("efectos")
    .select("*")
    .order("puntos", { ascending: false })
    .limit(4);

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getEfectoMayor;
