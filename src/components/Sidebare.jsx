import React from "react";
import { FaSchool } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { Tooltip } from "@nextui-org/react";
import { FaUserShield } from "react-icons/fa6";
import { TbSchool } from "react-icons/tb";
import { GiBookCover } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";

const AdminLinks = [
  { name: "Utilisateurs", href: "/utilisateurs", icon: <FaUserShield /> },
  { name: "Centres", href: "/centres", icon: <FaSchool /> },
];
const Links = [
  { name: "Eleves", href: "/eleves", icon: <PiStudent /> },
  { name: "Enseignants", href: "/enseignats", icon: <FaUserTie /> },
  { name: "Niveaux", href: "/niveaux", icon: <TbSchool /> },
  { name: "Matiéres", href: "/matiéres", icon: <GiBookCover /> },
  { name: "Abonnements", href: "/abonnements", icon: <TbReportMoney /> },
  { name: "Paiement", href: "/paiements", icon: <FaHandHoldingUsd /> },

];
const Sidebare = ({ open }) => {
  return (
    <aside
      className={`flex h-screen  ${
        open ? "w-16" : "w-0  "
      } overflow-hidden duration-500 ease-in-out  flex-col justify-between border-e dark:border-gray-800 dark:bg-[#242526] dark:text-white bg-white fixed top-0 left-0`}
    >
      <div>
        <div className="inline-flex size-16 items-center justify-center">
          <Link
            to="/"
            className="grid size-10 place-content-center rounded-lg bg-gray-200  text-gray-600 font-bold text-lg"
          >
            L
          </Link>
        </div>

        <div className="border-t border-gray-100">
          <div className="px-2">
            <div className="py-4">
              {AdminLinks.map((l, i) => (
                <Tooltip
                  content={l.name}
                  showArrow
                  placement="right"
                  size="lg"
                  color="foreground"
                  radius="sm"
                  delay={0}
                  closeDelay={0}
                  key={i}
                >
                  <NavLink
                    to={l.href}
                    className={` group relative flex justify-center rounded p-2  text-gray-500 hover:bg-gray-100 hover:text-gray-700 text-2xl `}
                  >
                    {l.icon}
                  </NavLink>
                </Tooltip>
              ))}
             
            </div>

            <ul className="space-y-1 border-t border-gray-100 pt-4">
              {Links.map((l,i) => (
                <Tooltip
                  content={l.name}
                  showArrow
                  placement="right"
                  size="lg"
                  color="foreground"
                  radius="sm"
                  delay={0}
                  closeDelay={0}
                  key={i}
                >
                  <li>
                    <NavLink
                      to={l.href}
                      className="group relative flex justify-center rounded p-2  text-gray-500 hover:bg-gray-100 hover:text-gray-700  text-2xl"
                    >
                      {l.icon}
                    </NavLink>{" "}
                  </li>
                </Tooltip>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 p-2">
        <form action="#">
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg p-2 text-gray-500  dark:text-gray-300 hover:bg-red-400  hover:text-white text-2xl"
          >
            <IoIosLogOut />

            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-red-400 px-2 py-1.5 text-lg  text-white group-hover:visible">
              Logout
            </span>
          </button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebare;
