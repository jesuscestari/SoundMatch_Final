import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Efecto } from "@/types";

const getEfectos = async (): Promise<Efecto[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("efectos")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getEfectos;
