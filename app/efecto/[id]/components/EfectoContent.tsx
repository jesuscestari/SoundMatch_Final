"use client";

import * as React from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import Header from "@/app/(site)/components/Header";
import Image from "next/image";
import { MdDateRange, MdEmail } from "react-icons/md";
import DButton from "@/app/(site)/components/DButton";
import { useUser } from "@/hooks/useUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { FaUserAstronaut } from "react-icons/fa";

interface EfectoContentProps {
  songId: string;
}

const EfectoContent: React.FC<EfectoContentProps> = async ({ songId }) => {
  const { supabaseClient } = useSessionContext();
  const { subscription } = useUser();
  const subscribeModal = useSubscribeModal();

  const getTitulo = async () => {
    const { data } = await supabaseClient
      .from("efectos")
      .select("titulo")
      .eq("id", songId)
      .single();

    return data?.titulo;
  };

  const titulo = getTitulo();

  const getAut = async () => {
    const { data } = await supabaseClient
      .from("efectos")
      .select("autor")
      .eq("id", songId)
      .single();

    return data?.autor;
  };

  const autor = await getAut();

  const getImagenPath = async () => {
    const { data } = await supabaseClient
      .from("efectos")
      .select("imagen_path")
      .eq("id", songId)
      .single();

    return data?.imagen_path;
  };

  const urll = await getImagenPath();

  const getImageUrl = async () => {
    const { data } = supabaseClient.storage
      .from("imagenes")
      .getPublicUrl(await urll);

    return data.publicUrl;
  };

  const imageUrl = await getImageUrl();

  function mandarMail() {
    if (!subscription) {
      return subscribeModal.onOpen();
    }
    window.location.href = `mailto:${autor}`;
  }

  const autorNombre = autor?.split("@")[0];

  const getFecha = async () => {
    const { data } = await supabaseClient
      .from("efectos")
      .select("created_at")
      .eq("id", songId)
      .single();

    const rawDate = data?.created_at;

    if (rawDate) {
      const dateObject = new Date(rawDate);

      const formattedDate = dateObject.toLocaleDateString();

      return formattedDate;
    } else {
      return "Date not available";
    }
  };

  return (
    <>
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold text-center mt-5 mb-10">
            Sound Effect Details
          </h1>
        </div>
      </Header>

      <div className="w-full grid place-items-center  ">
        <div className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
          <Image
            className="rounded-t-lg"
            src={imageUrl}
            alt="Image"
            width={500}
            height={10}
          />

          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {titulo}
            </h5>

            <p className="mt-2 font-normal text-gray-500 dark:text-gray-400 flex">
              <FaUserAstronaut size={18} color="#9F380E" className="mr-1" />{" "}
              Author: {autorNombre}
            </p>

            <p className="mb-3 mt-2 font-normal text-gray-500 dark:text-gray-400 flex">
              <MdDateRange size={18} color="#9F380E" className="mr-1" />{" "}
              Uploaded: {getFecha()}
            </p>
            <a
              onClick={mandarMail}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center hover:cursor-pointer text-white bg-orange-900/90 rounded-lg hover:bg-orange-900/20 focus:ring-4 focus:outline-none focus:ring-blue-300  "
            >
              Contact Author&nbsp;
              <MdEmail />
            </a>
            <div className="inline-flex pl-32 md:pl-40 ">
              <DButton songId={songId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EfectoContent;
