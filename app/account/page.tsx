import Box from "../(site)/components/Box";
import Header from "../(site)/components/Header";
import AccountContent from "./components/AccountContent";
import EffectsContent from "./components/EffectsContent";

import getSongsByUserId from "@/actions/getEfectosByUserId";

import SubirContent from "./components/SubirContent";

const Account = async () => {
  const userSongs = await getSongsByUserId();

  return (
    <div
      className="
        bg-neutral-900
        h-full 
        w-full 
       pl-7
        pr-7
    
    
        overflow-y-auto
      "
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold text-center">
            Account Settings
          </h1>
        </div>
      </Header>
      <div className="md:flex">
        <Box className="overflow-y-auto  h-full bg-neutral-100/10 flex flex-col gap-y-4   md:mr-2 rounded-md ">
          <AccountContent />
        </Box>
        <Box className="hidden md:flex h-30 bg-neutral-100/10  flex-col gap-y-4  md:ml-2 mt-3 md:mt-0 rounded-md  items-center">
          <SubirContent />
        </Box>
      </div>

      <Box className="overflow-y-auto  bg-neutral-100/10 mt-3 rounded-md">
        <EffectsContent songs={userSongs} />
      </Box>
    </div>
  );
};

export default Account;
