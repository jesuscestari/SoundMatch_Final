"use client";

import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Modal";
import { Provider } from "@supabase/supabase-js";

const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  const supabaseClient = useSupabaseClient();

  const isMobile = window.innerWidth <= 768;
  const provide: Provider[] = isMobile ? [] : ["google"];

  //este useEffect es para que cuando se loguee se cierre el modal
  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="SoundMatch"
      description="Login to your account."
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={provide}
        magicLink={false}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#C2410C ",
              },
            },
          },
        }}
        theme="dark"
      />
    </Modal>
  );
};

export default AuthModal;
