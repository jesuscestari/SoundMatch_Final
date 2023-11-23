import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button
      className="
        transition 
        
        rounded-full 
        flex 
        items-center 
        justify-center 
        bg-orange-700/80
        p-3
      
        drop-shadow-md 
        translate
        translate-y-1/4
        group-hover:opacity-100 
        group-hover:translate-y-0
        hover:scale-110
        mb-4
      "
    >
      <FaPlay className="text-white" />
    </button>
  );
};

export default PlayButton;
