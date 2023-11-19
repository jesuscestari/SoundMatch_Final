"use client";

import { MdOutlineInfo } from "react-icons/md";

import { useRouter } from "next/navigation";

interface InfoButtonProps {
  songId: string;
}

const InfoButton: React.FC<InfoButtonProps> = ({ songId }) => {
  const Icon = MdOutlineInfo;
  const router = useRouter();

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={() => router.push("/efecto/" + songId)}
    >
      <Icon color={"white"} size={25} />
    </button>
  );
};

export default InfoButton;
