import "./globals.css";
import { Figtree, Roboto } from "next/font/google";
import Sidebar from "./(site)/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";

import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getEfectosByUserId";
import Player from "./(site)/components/Player";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import getSongs from "@/actions/getEfectos";
import MobileFooter from "./(site)/components/MobileFooter";

const font = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "SoundMatch",
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
  const data = await getSongs();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
            <MobileFooter>
              <></>
            </MobileFooter>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
