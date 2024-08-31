import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { FaUserShield } from "react-icons/fa6";
import { PiStudent } from "react-icons/pi";
import { FiEye, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiSolidEdit, BiTrash } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { PiWarningCircleFill } from "react-icons/pi";
const subjects = [
  "fatim zahrae molay",
  "zzwcjxjbcjbxcjx",
  "bjxbjbrf rfibirf frf",
  "abdellah ait bachikh",
  "d",
  "f",
  "r",
];
const months = [
  { name: "Tous les mois", value: "" },
  { name: "Janvier", value: "January" },
  { name: "Février", value: "February" },
  { name: "Mars", value: "March" },
  { name: "Avril", value: "April" },
  { name: "Mai", value: "May" },
  { name: "Juin", value: "June" },
  { name: "Juillet", value: "July" },
  { name: "Août", value: "August" },
  { name: "Septembre", value: "September" },
  { name: "Octobre", value: "October" },
  { name: "Novembre", value: "November" },
  { name: "Décembre", value: "December" },
];
const monthsTable = [
  { name: "Septembre", value: "September" },
  { name: "Octobre", value: "October" },
  { name: "Novembre", value: "November" },
  { name: "Décembre", value: "December" },
  { name: "Janvier", value: "January" },
  { name: "Février", value: "February" },
  { name: "Mars", value: "March" },
  { name: "Avril", value: "April" },
  { name: "Mai", value: "May" },
  { name: "Juin", value: "June" },
];
const status = [
  { name: "Tous", value: "" }, // "All"
  { name: "Payé", value: "payed" }, // "Paid"
  { name: "Non payé", value: "unpaid" }, // "Unpaid"
  { name: "Partiellement payé", value: "partially_paid" }, // "Partially Paid"
];
const PrimarySchoolTab = () => {
  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const pages = useMemo(() => {
    const filteredsubjects = subjects.filter((c) =>
      c.toLowerCase().includes(searchItem.toLowerCase())
    );
    return Math.ceil(filteredsubjects.length / rowsPerPage);
  }, [searchItem]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const filteredsubjects = subjects.filter((c) =>
      c.toLowerCase().includes(searchItem.toLowerCase())
    );
    return filteredsubjects.slice(start, end);
  }, [page, searchItem]);

  return (
    <Card>
      <CardBody>
        <div className="flex justify-between gap-3 items-end bg-white   p-3 rounded-lg mt-4 dark:bg-[#43474b] dark:text-white">
          <form className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              isClearable
              placeholder="Rechercher par nom..."
              startContent={<FiSearch />}
              variant="faded"
              onChange={(e) => setSearchItem(e.target.value)}
              value={searchItem}
              onClear={() => setSearchItem("")}
              className="tracking-widest"
            />
            <Select placeholder="Sélectionnez un mois" variant="faded">
              {months.map((month, i) => (
                <SelectItem
                  key={month.value}
                  value={month.value}
                  endContent={i === 0 ? null : i}
                >
                  {month.name}
                </SelectItem>
              ))}
            </Select>
            <Select placeholder="Sélectionnez par statut" variant="faded">
              {status.map((month, i) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.name}
                </SelectItem>
              ))}
            </Select>
          </form>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 mt-4 shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)]">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:divide-gray-700 dark:bg-[#43474b] ">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="font-normal">
                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                    Nom
                  </th>

                  {monthsTable.map((m, i) => {
                    return (
                      <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                        {m.name}
                      </th>
                    );
                  })}

                  <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white ">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
                {items.map((c, i) => (
                  <tr
                    className="hover:bg-blue-200 dark:hover:bg-gray-900"
                    key={i}
                  >
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto ">
                      {c}
                    </td>
                    <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto ">
                      <Popover size="lg">
                        <PopoverTrigger>
                          <Chip
                            color="success"
                            variant="bordered"
                            size="sm"
                            className="cursor-pointer"
                          >
                            {" "}
                            Payé
                          </Chip>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2 ">
                            <Chip
                              color="success"
                              size="lg"
                              variant="faded"
                              startContent={<FaCheckCircle />}
                              endContent={<>200 DH</>}
                            >
                              <div className="text-small font-bold text-gray-950 dark:text-white">
                                primaire matiere
                              </div>
                            </Chip>
                          </div>
                        </PopoverContent>
                      </Popover>
                      {/* <Tooltip
                      
                        content={
                          <div className="px-1 py-2 ">
                            <Chip
                              color="success"
                              size="lg"
                              variant="faded"
                              startContent={<FaCheckCircle />}
                              endContent={<>200 DH</>}
                            >
                              <div className="text-small font-bold text-gray-950 dark:text-white">
                                primaire matiere
                              </div>
                            </Chip>
                          </div>
                        }
                        size="ld"
                      >
                        <Chip color="success" variant="bordered" size='sm' >
                          Payé
                        </Chip>
                      </Tooltip> */}
                    </td>
                    <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto ">
                      <Popover size="lg">
                        <PopoverTrigger>
                          <Chip color="warning" variant="bordered" size="sm"  className="cursor-pointer">
                            Partiellement payé
                          </Chip>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2 ">
                            <div className="px-1 py-2 space-y-2">
                              <Chip
                                color="warning"
                                size="lg"
                                variant="faded"
                                startContent={<PiWarningCircleFill />}
                                endContent={<>100 DH</>}
                                className="cursor-pointer"
                              >
                                <div className="text-small font-bold text-gray-950 dark:text-white">
                                  primaire matiere
                                </div>
                              </Chip>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Totale : </span>
                                  <span>200</span>
                                </div>
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Le Rest : </span>
                                  <span>100</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </td>
                    <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto ">
                      <Popover size="lg">
                        <PopoverTrigger>
                          <Chip color="danger" variant="bordered" size="sm" className="cursor-pointer">
                            Non payé
                          </Chip>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2 space-y-2">
                            <Chip
                              color="danger"
                              size="lg"
                              variant="faded"
                              startContent={<PiWarningCircleFill />}
                              endContent={<>0 DH</>}
                            >
                              <div className="text-small font-bold text-gray-950 dark:text-white">
                                primaire matiere
                              </div>
                            </Chip>
                            <div className="flex items-center justify-between">
                              <div className="flex flex-colitems-center">
                                <span className="font-bold">Totale : </span>
                                <span>200</span>
                              </div>
                              <div className="flex flex-colitems-center">
                                <span className="font-bold">Le Rest : </span>
                                <span>200</span>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </td>
                    <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto ">
                       <Popover size="lg">
                        <PopoverTrigger>
                          <Chip color="warning" variant="bordered" size="sm"  className="cursor-pointer">
                            Partiellement payé
                          </Chip>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2 ">
                            <div className="px-1 py-2 space-y-2">
                              <Chip
                                color="warning"
                                size="lg"
                                variant="faded"
                                startContent={<PiWarningCircleFill />}
                                endContent={<>100 DH</>}
                                className="cursor-pointer"
                              >
                                <div className="text-small font-bold text-gray-950 dark:text-white">
                                  primaire matiere
                                </div>
                              </Chip>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Totale : </span>
                                  <span>200</span>
                                </div>
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Le Rest : </span>
                                  <span>100</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </td>
                    <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto ">
                       <Popover size="lg">
                        <PopoverTrigger>
                          <Chip color="warning" variant="bordered" size="sm"  className="cursor-pointer">
                            Partiellement payé
                          </Chip>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2 ">
                            <div className="px-1 py-2 space-y-2">
                              <Chip
                                color="warning"
                                size="lg"
                                variant="faded"
                                startContent={<PiWarningCircleFill />}
                                endContent={<>100 DH</>}
                                className="cursor-pointer"
                              >
                                <div className="text-small font-bold text-gray-950 dark:text-white">
                                  primaire matiere
                                </div>
                              </Chip>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Totale : </span>
                                  <span>200</span>
                                </div>
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Le Rest : </span>
                                  <span>100</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </td>
                    <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto ">
                       <Popover size="lg">
                        <PopoverTrigger>
                          <Chip color="warning" variant="bordered" size="sm"  className="cursor-pointer">
                            Partiellement payé
                          </Chip>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2 ">
                            <div className="px-1 py-2 space-y-2">
                              <Chip
                                color="warning"
                                size="lg"
                                variant="faded"
                                startContent={<PiWarningCircleFill />}
                                endContent={<>100 DH</>}
                                className="cursor-pointer"
                              >
                                <div className="text-small font-bold text-gray-950 dark:text-white">
                                  primaire matiere
                                </div>
                              </Chip>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Totale : </span>
                                  <span>200</span>
                                </div>
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Le Rest : </span>
                                  <span>100</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </td>
                    <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto ">
                       <Popover size="lg">
                        <PopoverTrigger>
                          <Chip color="warning" variant="bordered" size="sm"  className="cursor-pointer">
                            Partiellement payé
                          </Chip>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2 ">
                            <div className="px-1 py-2 space-y-2">
                              <Chip
                                color="warning"
                                size="lg"
                                variant="faded"
                                startContent={<PiWarningCircleFill />}
                                endContent={<>100 DH</>}
                                className="cursor-pointer"
                              >
                                <div className="text-small font-bold text-gray-950 dark:text-white">
                                  primaire matiere
                                </div>
                              </Chip>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Totale : </span>
                                  <span>200</span>
                                </div>
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Le Rest : </span>
                                  <span>100</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </td>
                    <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto ">
                       <Popover size="lg">
                        <PopoverTrigger>
                          <Chip color="warning" variant="bordered" size="sm"  className="cursor-pointer">
                            Partiellement payé
                          </Chip>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2 ">
                            <div className="px-1 py-2 space-y-2">
                              <Chip
                                color="warning"
                                size="lg"
                                variant="faded"
                                startContent={<PiWarningCircleFill />}
                                endContent={<>100 DH</>}
                                className="cursor-pointer"
                              >
                                <div className="text-small font-bold text-gray-950 dark:text-white">
                                  primaire matiere
                                </div>
                              </Chip>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Totale : </span>
                                  <span>200</span>
                                </div>
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Le Rest : </span>
                                  <span>100</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </td>
                    <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto ">
                       <Popover size="lg">
                        <PopoverTrigger>
                          <Chip color="warning" variant="bordered" size="sm"  className="cursor-pointer">
                            Partiellement payé
                          </Chip>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2 ">
                            <div className="px-1 py-2 space-y-2">
                              <Chip
                                color="warning"
                                size="lg"
                                variant="faded"
                                startContent={<PiWarningCircleFill />}
                                endContent={<>100 DH</>}
                                className="cursor-pointer"
                              >
                                <div className="text-small font-bold text-gray-950 dark:text-white">
                                  primaire matiere
                                </div>
                              </Chip>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Totale : </span>
                                  <span>200</span>
                                </div>
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Le Rest : </span>
                                  <span>100</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </td>
                    <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto ">
                       <Popover size="lg">
                        <PopoverTrigger>
                          <Chip color="warning" variant="bordered" size="sm"  className="cursor-pointer">
                            Partiellement payé
                          </Chip>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2 ">
                            <div className="px-1 py-2 space-y-2">
                              <Chip
                                color="warning"
                                size="lg"
                                variant="faded"
                                startContent={<PiWarningCircleFill />}
                                endContent={<>100 DH</>}
                                className="cursor-pointer"
                              >
                                <div className="text-small font-bold text-gray-950 dark:text-white">
                                  primaire matiere
                                </div>
                              </Chip>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Totale : </span>
                                  <span>200</span>
                                </div>
                                <div className="flex flex-colitems-center">
                                  <span className="font-bold">Le Rest : </span>
                                  <span>100</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </td>

                    <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200">
                      <div className="flex justify-subject  items-subject gap-2">
                        <Button
                          size="sm"
                          isIconOnly
                          radius="md"
                          className="text-xl"
                          color="primary"
                          variant="ghost"
                          as={Link}
                          to={`/paiements/show/${i + 1}`}
                        >
                          <FiEye />
                        </Button>
                        <Button
                          size="sm"
                          isIconOnly
                          radius="md"
                          className="text-xl"
                          color="warning"
                          variant="ghost"
                          // onPress={() => SelectEditItem(i)}
                        >
                          <BiSolidEdit />
                        </Button>
                        <Button
                          size="sm"
                          isIconOnly
                          radius="md"
                          className="text-xl"
                          color="danger"
                          variant="ghost"
                          // onClick={() => setItemToDelete(i + 1)}
                        >
                          <BiTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="my-4  w-full flex justify-between">
          <Pagination
            showControls
            isCompact
            total={pages}
            page={page}
            onChange={(page) => setPage(page)}
            showShadow
          />
        </div>{" "}
      </CardBody>
    </Card>
  );
};

export default PrimarySchoolTab;
