import "./globals.css";
import { Roboto } from "next/font/google";
import Sidebar from "./(site)/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";

import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getEfectosByUserId";
import Player from "./(site)/components/Player";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";

import MobileFooter from "./(site)/components/MobileFooter";

const font = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "SoundMatch - Repositorio SFX",
  description: "Repositorio de SFX",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
            <MobileFooter />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
