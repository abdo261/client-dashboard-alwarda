import  { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { FiEye, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiSolidEdit, BiTrash } from "react-icons/bi";
import PaymentStatus from "../../../components/PaymentStatus";
import { useDispatch, useSelector } from "react-redux";
import { getstudentsByPaymentsSchool } from "../../../redux/api/studentApi";

const monthsTable = [
  { name: "Tous les mois", value: "" },
  { name: "Septembre", value: "September", id: 9 },
  { name: "Octobre", value: "October", id: 10 },
  { name: "Novembre", value: "November", id: 11 },
  { name: "Décembre", value: "December", id: 12 },
  { name: "Janvier", value: "January", id: 1 },
  { name: "Février", value: "February", id: 2 },
  { name: "Mars", value: "March", id: 3 },
  { name: "Avril", value: "April", id: 4 },
  { name: "Mai", value: "May", id: 5 },
  { name: "Juin", value: "June", id: 6 },
];
const levels = [
  { name: "Aucun", value: "" },
  { name: "1AP", value: 1 },
  { name: "2AP", value: 2 },
  { name: "3AP", value: 3 },
  { name: "4AP", value: 4 },
  { name: "5AP", value: 5 },
  { name: "6AP", value: 6 },
];
const HightSchoolTab = () => {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState("");
  useEffect(() => {
    dispatch(getstudentsByPaymentsSchool("LYCEE"));
  }, [dispatch]);
  const {  students } = useSelector((state) => state.student);
  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = useMemo(() => {
    // Filter students based on search input
    const filteredstudents = students?.filter((c) =>
      (c.firstName + " " + c.lastName)
        .toLowerCase()
        .includes(searchItem.toLowerCase())
    );

    // Further filter by selected month if applicable
    const filteredstudentsByMonth =
      selectedMonth === ""
        ? filteredstudents
        : filteredstudents?.filter((s) =>
            s.payments.some((p) => p.month === selectedMonth)
          );

    return Math.ceil(filteredstudentsByMonth?.length / rowsPerPage);
  }, [searchItem, selectedMonth, students]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const filteredstudents = students?.filter((c) =>
      (c.firstName + " " + c.lastName)
        .toLowerCase()
        .includes(searchItem.toLowerCase())
    );

    const filteredstudentsByMonth =
      selectedMonth === ""
        ? filteredstudents
        : filteredstudents?.map((s) => ({
            ...s,
            payments: s.payments.filter((p) => p.month === selectedMonth),
          }));

    return filteredstudentsByMonth?.slice(start, end);
  }, [page, searchItem, selectedMonth, students]);

  const mouthItems = useMemo(() => {
    return selectedMonth === ""
      ? monthsTable
      : monthsTable.filter((m) => m.value === selectedMonth);
  }, [selectedMonth]);
  console.log(mouthItems);
  const handelSelectMonthChnage = (e) => {
    setSelectedMonth(e.target.value);
    items.filter((s) => s.payments.find((p) => p.month === searchItem));
  };
  return (
    <Card>
      {students ? (
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
              <Select
                aria-label="mounth"
                placeholder="Sélectionnez un mois"
                variant="faded"
                selectedKeys={[`${selectedMonth}`]}
                onChange={handelSelectMonthChnage}
              >
                {monthsTable.map((month, i) => (
                  <SelectItem
                    key={month.value}
                    value={month.value}
                    endContent={month.id}
                  >
                    {month.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                placeholder="Sélectionnez par statut"
                variant="faded"
                aria-label="status"
              >
                {levels.map((level, i) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.name}
                  </SelectItem>
                ))}
              </Select>
            </form>
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 mt-4 shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)]">
            <div className="overflow-x-auto rounded-t-lg">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:divide-gray-700 dark:bg-[#43474b] ">
                <thead className="ltr:text-left rtl:text-right">
                  <tr className="font-normal text-sm">
                    <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                      Nom
                    </th>

                    {mouthItems.map((m, i) => {
                      if (m.value === "") return null;
                      return (
                        <th
                          className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white text-center"
                          key={i}
                        >
                          {m.name}
                        </th>
                      );
                    })}

                    <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white ">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide text-sm">
                  {items.map((c, i) => (
                    <tr
                      className="hover:bg-blue-200 dark:hover:bg-gray-900"
                      key={i}
                    >
                      <td className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white w-auto  font-semibold capitalize">
                        {c.firstName + " " + c.lastName}
                      </td>
                      {c.payments.find((p) => p.month === "September") && (
                        <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                          <PaymentStatus
                            payment={c.payments.find(
                              (p) => p.month === "September"
                            )}
                          />
                        </td>
                      )}
                      {c.payments.find((p) => p.month === "October") && (
                        <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                          <PaymentStatus
                            payment={c.payments.find(
                              (p) => p.month === "October"
                            )}
                          />
                        </td>
                      )}
                      {c.payments.find((p) => p.month === "November") && (
                        <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                          <PaymentStatus
                            payment={c.payments.find(
                              (p) => p.month === "November"
                            )}
                          />
                        </td>
                      )}
                      {c.payments.find((p) => p.month === "December") && (
                        <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                          <PaymentStatus
                            payment={c.payments.find(
                              (p) => p.month === "December"
                            )}
                          />
                        </td>
                      )}
                      {c.payments.find((p) => p.month === "January") && (
                        <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                          <PaymentStatus
                            payment={c.payments.find(
                              (p) => p.month === "January"
                            )}
                          />
                        </td>
                      )}
                      {c.payments.find((p) => p.month === "February") && (
                        <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                          <PaymentStatus
                            payment={c.payments.find(
                              (p) => p.month === "February"
                            )}
                          />
                        </td>
                      )}
                      {c.payments.find((p) => p.month === "March") && (
                        <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                          <PaymentStatus
                            payment={c.payments.find(
                              (p) => p.month === "March"
                            )}
                          />
                        </td>
                      )}
                      {c.payments.find((p) => p.month === "April") && (
                        <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                          <PaymentStatus
                            payment={c.payments.find(
                              (p) => p.month === "April"
                            )}
                          />
                        </td>
                      )}
                      {c.payments.find((p) => p.month === "May") && (
                        <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                          <PaymentStatus
                            payment={c.payments.find((p) => p.month === "May")}
                          />
                        </td>
                      )}
                      {c.payments.find((p) => p.month === "June") && (
                        <td className="whitespace-nowrap px-1 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                          <PaymentStatus
                            payment={c.payments.find((p) => p.month === "June")}
                          />
                        </td>
                      )}

                      <td className="whitespace-nowrap  py-2 text-gray-700 dark:text-gray-200">
                        <div className="flex justify-subject  items-subject gap-1">
                          <Button
                            size="sm"
                            isIconOnly
                            radius="md"
                            className="text-xl"
                            color="primary"
                            variant="ghost"
                            as={Link}
                            to={`/paiements/primaire/show/${i + 1}`}
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
      ) : (
        <CardBody>no data</CardBody>
      )}
    </Card>
  );
};

export default HightSchoolTab;
