import React from "react";
import { MdPhoneInTalk } from "react-icons/md";
import { MdOutlineAlternateEmail } from "react-icons/md";
import PieChart from "../../components/PieChart";

const Home = () => {
  return (
    <div className="grid grid-cols-[auto] md:grid-cols-[auto,1fr]  gap-2 w-full">
      <div className=" bg-white rounded-lg flex flex-col gap-3 justify-center  p-3 dark:bg-[#242526] dark:text-white">
        <div className="flex items-center gap-2">
          <div className="size-24 rounded-full bg-gray-200 dark:text-[#242526] flex justify-center items-center  text-4xl flex-shrink-0">
            A
          </div>
          <div className="h-full flex-1 flex flex-col items-start gap-2 text-medium">
            <span className="flex gap-2 items-center">
              <span className="font-semibold">Nome:</span>{" "}
              <span>Ait Bachikh</span>
            </span>
            <span className="flex gap-2 items-center">
              <span className="font-semibold">Prenom:</span>{" "}
              <span>Abdellah</span>
            </span>
            <span className="flex gap-2 items-center">
              <span className="font-semibold">Role:</span>
              <span>Admin</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full ">
        <span className="flex gap-2 items-center">
            <MdPhoneInTalk />
            +212628958346
          </span>

          <span className="flex gap-2 items-center">
            <MdOutlineAlternateEmail />
            <span>abdellah@gmail.com</span>
          </span>
        </div>
      </div>
      <div className=" bg-white rounded-lg flex flex-col items-center p-3 dark:bg-[#242526] dark:text-white">
        <h1 className="font-bold lg:text-3xl text-xl">Centre Dshayra 1</h1>
        <PieChart/>
      </div>
    
    </div>
  );
};

export default Home;
