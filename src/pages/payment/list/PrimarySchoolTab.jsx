import  { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";

import { FiEye, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiSolidEdit, BiTrash } from "react-icons/bi";
import PaymentStatus from "../../../components/PaymentStatus";
import { useDispatch, useSelector } from "react-redux";
import { getstudentsByPaymentsSchool } from "../../../redux/api/studentApi";
import ErrorAlert from "../../../components/ErrorAlert";
import { getLevelsBySchool } from "../../../redux/api/levelApi";

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
const status = [
  { id: 2, name: "touts", value: "" },
  { id: 2, name: "Payé", value: "Payé" },
  { id: 3, name: "Non payé", value: "Non payé" },
  { id: 4, name: "Partiellement payé", value: "Partiellement payé" },
];
const PrimarySchoolTab = () => {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    dispatch(getstudentsByPaymentsSchool("ECOLE_PRIMAIRE"));
    dispatch(getLevelsBySchool("ECOLE_PRIMAIRE"));
  }, [dispatch]);

  const { error, loading, students } = useSelector((state) => state.student);
  const { levels } = useSelector((state) => state.level);
  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const { totalFilteredStudents, pages } = useMemo(() => {
    const filteredstudents = students?.filter((c) =>
      (c.firstName + " " + c.lastName)
        .toLowerCase()
        .includes(searchItem.toLowerCase())
    );

    // Ensure correct filtering by levelId
    const filteredstudentsByLevel =
      selectedLevel === ""
        ? filteredstudents
        : filteredstudents?.filter(
            (s) => s.levelId === parseInt(selectedLevel)
          );

    // Proceed with month and status filtering after level filtering
    const filteredstudentsByMonth =
      selectedMonth === ""
        ? filteredstudentsByLevel
        : filteredstudentsByLevel?.filter((s) =>
            s.payments.some((p) => p.month === selectedMonth)
          );

    const filteredStudentsByStatus = selectedStatus
      ? filteredstudentsByMonth?.filter((s) => {
          const payment = s.payments?.find((p) => p.month === selectedMonth);
          if (!payment) return false;

          if (selectedStatus === "Payé") {
            return payment.amountDue === 0;
          } else if (selectedStatus === "Non payé") {
            return payment.amountDue === payment.totalAmount;
          } else if (selectedStatus === "Partiellement payé") {
            return (
              payment.amountDue > 0 && payment.totalAmount > payment.amountDue
            );
          }
          return false;
        })
      : filteredstudentsByMonth;

    const totalFilteredStudents = filteredStudentsByStatus?.length;
    const pages = Math.ceil(totalFilteredStudents / rowsPerPage);

    return { totalFilteredStudents, pages };
  }, [searchItem, selectedMonth, selectedStatus, selectedLevel, students]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const filteredstudents = students?.filter((c) =>
      (c.firstName + " " + c.lastName)
        .toLowerCase()
        .includes(searchItem.toLowerCase())
    );

    const filteredstudentsByLevel =
      selectedLevel === ""
        ? filteredstudents
        : filteredstudents?.filter(
            (s) => s.levelId === parseInt(selectedLevel)
          );

    const filteredstudentsByMonth =
      selectedMonth === ""
        ? filteredstudentsByLevel
        : filteredstudentsByLevel?.map((s) => ({
            ...s,
            payments: s.payments?.filter((p) => p.month === selectedMonth),
          }));

    let filteredStudentsByStatus = filteredstudentsByMonth;

    if (selectedStatus) {
      filteredStudentsByStatus = filteredstudentsByMonth?.filter((s) => {
        if (selectedStatus === "") return true;
        const payment = s.payments.find((p) => p.month === selectedMonth);
        if (!payment) return false;

        if (selectedStatus === "Payé") {
          return payment.amountDue === 0;
        } else if (selectedStatus === "Non payé") {
          return payment.amountDue === payment.totalAmount;
        } else if (selectedStatus === "Partiellement payé") {
          return (
            payment.amountDue > 0 && payment.totalAmount > payment.amountDue
          );
        }
        return filteredStudentsByStatus?.slice(start, end);
      });
    }

    return filteredStudentsByStatus?.slice(start, end);
  }, [
    page,
    searchItem,
    selectedMonth,
    selectedStatus,
    selectedLevel,
    students,
  ]);

  const mouthItems = useMemo(() => {
    return selectedMonth === ""
      ? monthsTable
      : monthsTable.filter((m) => m.value === selectedMonth);
  }, [selectedMonth]);

  const handelSelectMonthChnage = (e) => {
    setSelectedMonth(e.target.value);
    items.filter((s) => s.payments.find((p) => p.month === searchItem));
    if (selectedMonth === "") {
      setSelectedStatus("");
    }
  };
  const handelSelectStatusChnage = (e) => {
    const statusValue = e.target.value;
    setSelectedStatus(statusValue);
    if (statusValue === "") {
      setPage(1);
    }
  };
  const handelSelectLavelChnage = (e) => {
    const levelValue = e.target.value;
    setSelectedLevel(levelValue);

    setPage(1);
  };
  useEffect(() => {
    if (!selectedMonth) {
      setSelectedStatus("");
    } else {
      if (selectedStatus) {
        setSelectedStatus((prevStatus) => {
          return prevStatus ? prevStatus : "";
        });
      }
    }
  }, [selectedMonth, selectedStatus]);
  console.log(selectedLevel);
  return (
    <Card>
      {students && (
        <CardBody>
          <div className="flex justify-between gap-3 items-end bg-white   p-3 rounded-lg mt-4 dark:bg-[#43474b] dark:text-white">
            <form className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    className="dark:text-gray-200"
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
                selectedKeys={[`${selectedStatus}`]}
                onChange={handelSelectStatusChnage}
                value={selectedStatus}
                isDisabled={selectedMonth === "" ? true : false}
              >
                {status.map(
                  (s) =>
                    s.value !== "" && (
                      <SelectItem
                        className="dark:text-gray-200"
                        key={s.name}
                        value={s.name}
                      >
                        {s.name}
                      </SelectItem>
                    )
                )}
              </Select>
              {levels ? (
                <Select
                  placeholder="Sélectionnez par niveau"
                  variant="faded"
                  aria-label="level"
                  onChange={handelSelectLavelChnage}
                  selectedKeys={[`${selectedLevel}`]}
                  value={selectedLevel}
                >
                  {levels.map((level, i) => (
                    <SelectItem
                      className="dark:text-gray-200"
                      key={level.id}
                      value={level.id}
                    >
                      {level.name}
                    </SelectItem>
                  ))}
                </Select>
              ) : (
                <div className="flex justify-center">
                  <Spinner size="sm" />
                </div>
              )}
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
                      <div className="w-full flex justify-end">
                        {students && (
                          <Chip variant="flat" color="success" size="lg">
                            Total {totalFilteredStudents}
                          </Chip>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide text-sm">
                  {items?.map((c, i) => (
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
      )}
      {loading.loadingGet && (
        <CardBody>
          <div className="w-full flex justify-center py-9">
            <Spinner size="lg" label="Chargement en cours..." />
          </div>
        </CardBody>
      )}
      {error && (
        <CardBody>
          <ErrorAlert message={error} />
        </CardBody>
      )}
    </Card>
  );
};

export default PrimarySchoolTab;
