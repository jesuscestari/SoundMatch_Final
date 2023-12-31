"use client";

import { BounceLoader } from "react-spinners";
import Box from "../(site)/components/Box";

const Loading = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      <BounceLoader color="#9F380E " size={40} />
    </Box>
  );
};

export default Loading;
