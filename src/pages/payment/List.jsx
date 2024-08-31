import React from "react";
import { Card, CardBody, Chip, Tab, Tabs } from "@nextui-org/react";
import { FaChild } from "react-icons/fa6";
import MiddleSchoolTab from "./list/MiddleSchoolTab";
import PrimarySchoolTab from "./list/PrimarySchoolTab";
import HightSchoolTab from "./list/HightSchoolTab";

const List = () => {
    
  return (
    <div className="flex w-full flex-col items-stretch ">
      <Tabs
      selectedKey="college"
        aria-label="Options"
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12 mx-auto",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]",
        }}
      >
        <Tab
          key="primaire"
          title={
            <div className="flex items-center space-x-2">
              <FaChild />
              <span>Primaire</span>
              <Chip size="sm" variant="faded">
                9
              </Chip>
            </div>
          }
        >
          <PrimarySchoolTab />
        </Tab>
        <Tab
          key="college"
          title={
            <div className="flex items-center space-x-2">
              <FaChild />
              <span>College</span>
              <Chip size="sm" variant="faded">
                9
              </Chip>
            </div>
          }
        >
          <MiddleSchoolTab />
        </Tab>

        <Tab
          key="lycee"
          title={
            <div className="flex items-center space-x-2">
              <FaChild />
              <span>Lycee</span>
              <Chip size="sm" variant="faded">
                9
              </Chip>
            </div>
          }
        >
          <HightSchoolTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default List;
