import {
  Button,
  Chip,
  Input,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { FaBook, FaPhoneVolume, FaPlus, FaSchool } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Create from "./Create";
import swal from "sweetalert";
import { FiEye } from "react-icons/fi";
import { BiSolidEdit, BiTrash } from "react-icons/bi";
import Edit from "./Edit";
import Show from "./Show";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../redux/api/studentApi";
import { formatTimestamp } from "../../utils/utils";
// import { getCentres } from "../../redux/api/centreApi";

const List = () => {
  // const { centres } = useSelector((state) => state.centre);
  const { students } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);
  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const pages = useMemo(() => {
    const filteredStudents = students?.filter((c) =>
      (c.firstName + " " + c.lastName)
        .toLowerCase()
        .includes(searchItem.toLowerCase())
    );
    return Math.ceil(filteredStudents?.length / rowsPerPage);
  }, [searchItem, students]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const filteredStudents = students?.filter((c) =>
      (c.firstName + " " + c.lastName)
        .toLowerCase()
        .includes(searchItem.toLowerCase())
    );
    return filteredStudents?.slice(start, end);
  }, [page, searchItem, students]);

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onOpenChange: onCreateChangeOpen,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditChangeOpen,
  } = useDisclosure();
  const {
    isOpen: isShowOpen,
    onOpen: onShowOpen,
    onOpenChange: onShowChangeOpen,
  } = useDisclosure();
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToShow, setItemToShow] = useState(null);

  const SelectEditItem = (id) => {
    setItemToEdit(id);
    onEditOpen();
  };
  const SelectShowItem = (id) => {
    setItemToShow(id);
    onShowOpen();
  };

  useEffect(() => {
    if (itemToDelete) {
      swal({
        title: "are you shure you want to delete this poste ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((isOk) => {
        if (isOk) {
          console.log("delete " + itemToDelete);
        }
        setItemToDelete(null);
      });
    }
  }, [itemToDelete]);

  console.log(students)

  return (
    <>
      <div className="flex justify-start ">
        <h1 className="text-3xl font-semibold underline">Eleves</h1>
      </div>
      <div className="flex justify-between gap-3 items-end bg-white  shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] p-3 rounded-lg mt-4 dark:bg-[#43474b] dark:text-white">
        <form className="w-full sm:max-w-[44%]">
          <Input
            fullWidth
            isClearable
            placeholder="Rechercher par nom..."
            startContent={<FiSearch />}
            variant="faded"
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
            onClear={() => setSearchItem("")}
            size="lg"
            className="tracking-widest"
          />
        </form>
        <Button
          endContent={<FaPlus />}
          color="primary"
          variant="flat"
          onPress={onCreateOpen}
        >
          Créer
        </Button>
      </div>
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 mt-4 shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)]">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white  dark:divide-gray-700 dark:bg-[#43474b] text-md">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="font-normal">
                <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                  Nom
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                  Prénom
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                  Niveau
                </th>
                <th className="whitespace-nowrap px-4 py-2  text-gray-900 dark:text-white">
                  Les mtiéres
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                  Télé
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                  Centre
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                  Inscrit Le
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white">
                  {students && (
                    <Chip variant="flat" color="success" size="lg">
                      Total {students.length}
                    </Chip>
                  )}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
              {students &&
                items?.map((s) => (
                  <tr
                    className="hover:bg-blue-200 dark:hover:bg-gray-900"
                    key={s.id}
                  >
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-center underline underline-offset-2">
                      {s.firstName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto tracking-widest">
                      {s.lastName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto tracking-widest">
                      {s.level?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white w-auto text-center">
                      <Popover showArrow offset={10}>
                        <PopoverTrigger>
                          <Button
                            radius="full"
                            variant="flat"
                            className="font-semibold text-medium"
                            color={
                              s.subjects.length > 0 ? "success" : "danger"
                            }
                            startContent={<FaBook />}
                            size="sm"
                          >
                            {s.subjects.length}
                          </Button>
                        </PopoverTrigger>
                        {s.subjects.length > 0 && (
                          <PopoverContent className="w-fit">
                            <div className="px-1 py-2 w-full">
                              <p className="text-small font-bold text-foreground">
                                les Matiéres
                              </p>
                              <div className="mt-2 flex flex-col gap-2 w-full">
                                {s.subjects.map((s) => (
                                  <Chip variant="dot">{s.name} </Chip>
                                ))}
                              </div>
                            </div>
                          </PopoverContent>
                        )}
                      </Popover>
                    </td>
                    <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                      <Chip
                        variant="bordered"
                        color="default"
                        startContent={<FaPhoneVolume />}
                        size="md"
                        radius="sm"
                        className=" "
                      >
                        {s.phone}
                      </Chip>
                    </td>

                    <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                      <Chip
                        variant="bordered"
                        color="default"
                        startContent={<FaSchool />}
                        size="md"
                        radius="sm"
                      >
                        {s.centre.name}
                      </Chip>
                    </td>
                    <td className="whitespace-nowrap tracking-wider px-4 py-2 text-gray-700 dark:text-gray-200 w-auto text-center">
                      {formatTimestamp(s.registrationDate)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200 w-full ">
                      <div className="flex justify-center w-full items-center gap-2">
                        <Button
                          size="sm"
                          isIconOnly
                          radius="md"
                          className="text-xl"
                          color="primary"
                          variant="ghost"
                          onClick={() => SelectShowItem(s.id)}
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
                          onPress={() => SelectEditItem(s.id)}
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
                          onClick={() => setItemToDelete(s.id)}
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
        {pages > 1 && (
          <Pagination
            showControls
            isCompact
            total={pages}
            page={page}
            onChange={(page) => setPage(page)}
            showShadow
          />
        )}
      </div>
      <Create onOpenChange={onCreateChangeOpen} isOpen={isCreateOpen} />
      <Edit
        onOpenChange={onEditChangeOpen}
        isOpen={isEditOpen}
        itemToEdit={itemToEdit}
        SelectEditItem={SelectEditItem}
      />
      <Show
        onOpenChange={onShowChangeOpen}
        isOpen={isShowOpen}
        itemToEdit={itemToShow}
        SelectEditItem={SelectShowItem}
      />
    </>
  );
};

export default List;
