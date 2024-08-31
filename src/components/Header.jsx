import { Button } from "@nextui-org/react";

import { motion } from "framer-motion";
import { RiMenu3Line } from "react-icons/ri";

import ToggleThem from "./ToggleThem";

const Header = ({ toggleSideBare, open }) => {

  return (
    <header
      className={`fixed top-0 right-0  z-[1000] ${
        open ? "left-16" : "left-0"
      } duration-500 ease-in-out  h-16 bg-white  flex justify-between px-3 items-center dark:bg-[#242526] dark:text-white`}
    >
      <Button isIconOnly size="sm" variant="bordered" onClick={toggleSideBare}>
        <motion.span
          animate={{ rotate: open ? "0deg" : "180deg" }}
         
          className=" text-lg"
          transition={{ duration: 0.7 }}
        >
          <RiMenu3Line />
        </motion.span>
      </Button>
     <ToggleThem/>
    </header>
  );
};

export default Header;
