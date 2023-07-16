"use client";

import { useEffect, useState } from "react";

import { ProductWithPrice } from "@/types";
import AuthModal from "@/app/(site)/components/AuthModal";
import SubscribeModal from "@/app/(site)/components/SubscribeModal";
import UploadModal from "@/app/(site)/components/UploadModal";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <SubscribeModal products={products} />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
