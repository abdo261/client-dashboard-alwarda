import React, { useEffect } from "react";
import { Chip, chip, Select, SelectItem } from "@nextui-org/react";
import { RiCloseCircleLine } from "react-icons/ri";

export default function SelectMaterial() {
  const [values, setValues] = React.useState([]);
  const materials = [
    { key: "francais", label: "Francai" },
    { key: "Arabee", label: "Arabee" },
    { key: "math", label: "math" },
    { key: "PC", label: "PC" },
    { key: "SVT", label: "SVT" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
  ];
  const handleSelectionChange = (e) => {
    setValues(e.target.value.split(","));
    console.log(e.target.value.split(","));
  };
  const filterValues = (i) => {
    setValues((prev) => prev.filter((v, index) => index !== i));
  };
  useEffect(() => {
    setValues((prev) => prev.filter((v) => v !== ""));
  }, [values.length]);
  return (
    <div className="flex w-full   flex-col gap-2">
      <Select
      size="sm"
        label="Matiéres"
        selectionMode="multiple"
        placeholder="Selectioné Les Matiéres"
        selectedKeys={values}
        variant="bordered"
        className=""
        onChange={handleSelectionChange}
      >
        {materials.map((animal) => (
          <SelectItem key={animal.key}>{animal.label}</SelectItem>
        ))}
      </Select>
      <span className="flex items-center flex-wrap gap-1">
        Selected:{" "}
        {values.map((l, i) => (
          <Chip
            key={i}
            endContent={
              <RiCloseCircleLine
                onClick={() => filterValues(i)}
                className="cursor-pointer"
              />
            }
          >
            {l}
          </Chip>
        ))}{" "}
      </span>
    </div>
  );
}
