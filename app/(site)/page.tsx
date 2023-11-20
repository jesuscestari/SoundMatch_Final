import getSongs from "@/actions/getEfectos";
import Header from "./components/Header";
import { AiOutlineStock } from "react-icons/ai";
import PageContent from "./components/PageContent";

export const revalidate = 0; // Revalida la pagina para que no guarde cache y siempre se muestre los efectos actualizados

export default async function Home() {
  const songs = await getSongs();

  return (
    <div
      className=" bg-neutral-900 
    rounded-lg 
    h-full 
    w-full 
    overflow-hidden 
    overflow-y-auto"
    >
      <Header>
        <div className="mb-2">
          <h1
            className="
          text-white
          text-3xl
          font-semibold
          text-center
          "
          >
            SoundMatch
          </h1>
          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-3
            mt-4
          "
          ></div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white flex text-2xl font-semibold ">
            {" "}
            <AiOutlineStock size={30} />
            <span className="pl-2"> Recent SFX</span>
          </h1>
        </div>
        <div>
          <div>
            <PageContent efectos={songs} />
          </div>
        </div>
      </div>
    </div>
  );
}
