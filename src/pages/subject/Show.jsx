import React from "react";
import { useParams } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import { MdPhoneInTalk } from "react-icons/md";
const Show = () => {
  const { id } = useParams();
  return (
    <div>
      <div className="flex flex-col justify-start  gap-5">
        
        <h1 className="md:text-2xl text-xl font-semibold">Les Eleves</h1>
      </div>
    </div>
  );
};

export default Show;
