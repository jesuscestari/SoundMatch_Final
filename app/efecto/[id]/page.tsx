import EfectoContent from "./components/EfectoContent";

interface pageProps {
  params: { id: string };
}

const Efecto: React.FC<pageProps> = ({ params }) => {
  const sfxId = params.id;

  return (
    <div
      className="
    bg-neutral-900
    h-full 
    w-full 
   pl-7
    pr-7
    overflow-hidden 
    overflow-y-auto
  "
    >
      <EfectoContent songId={sfxId} />
    </div>
  );
};

export default Efecto;
