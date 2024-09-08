import { MdPhoneInTalk } from "react-icons/md";
import { MdOutlineAlternateEmail } from "react-icons/md";
import PieChart from "../../components/PieChart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/api/userApi";
import { Chip, Spinner } from "@nextui-org/react";
const Home = () => {
  const { user: loginUser } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    document.title = "Alwarda | Accueil";
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loginUser) {
      dispatch(getUserById(loginUser.id));
    }
  }, [dispatch, loginUser]);

  return (
    <>
      {loginUser &&
        user ?
        (!user?.isOwner ? (
          <div className="grid grid-cols-[auto] md:grid-cols-[auto,1fr]  gap-2 w-full">
            <div className=" bg-white rounded-lg flex flex-col gap-3 justify-center  p-3 dark:bg-[#242526] dark:text-white">
              <div className="flex items-center gap-2">
                <div className="size-24 rounded-full bg-gray-200 dark:text-[#242526] flex justify-center items-center  text-4xl flex-shrink-0 capitalize">
                  {user && user?.firstName.slice(0, 1)}
                </div>
                <div className="h-full flex-1 flex flex-col items-start gap-2 text-medium">
                  <span className="flex gap-2 items-center">
                    <span className="font-semibold">Nome:</span>{" "}
                    <span>{user?.lastName}</span>
                  </span>
                  <span className="flex gap-2 items-center">
                    <span className="font-semibold">Prenom:</span>
                    <span>{user?.firstName}</span>
                  </span>
                  <span className="flex gap-2 items-center">
                    <span className="font-semibold">Role:</span>
                    <span>@Responsable</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full ">
                <span className="flex gap-2 items-center">
                  <MdPhoneInTalk />
                  {user?.phone}
                </span>

                <span className="flex gap-2 items-center">
                  <MdOutlineAlternateEmail />
                  <span>{user?.email}</span>
                </span>
              </div>
            </div>

            <div className=" bg-white rounded-lg flex flex-col items-center p-3 dark:bg-[#242526] dark:text-white">
              <h1 className="font-bold lg:text-3xl text-xl">
                {user?.centre?.name}
                <Chip>{user?.countSex.HOMME + user?.countSex.FEMME}</Chip>
              </h1>
              <PieChart
                boysCount={user?.countSex.HOMME}
                girlsCount={user?.countSex.FEMME}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[auto] md:grid-cols-[auto,1fr]  gap-2 w-full">
            <div className=" bg-white rounded-lg flex flex-col gap-3 justify-center  p-3 dark:bg-[#242526] dark:text-white">
              <div className="flex items-center gap-2">
                <div className="size-24 rounded-full bg-gray-200 dark:text-[#242526] flex justify-center items-center  text-4xl flex-shrink-0 capitalize">
                  {user && user?.firstName.slice(0, 1)}
                </div>
                <div className="h-full flex-1 flex flex-col items-start gap-2 text-medium">
                  <span className="flex gap-2 items-center">
                    <span className="font-semibold">Nome:</span>{" "}
                    <span>{user?.lastName}</span>
                  </span>
                  <span className="flex gap-2 items-center">
                    <span className="font-semibold">Prenom:</span>
                    <span>{user?.firstName}</span>
                  </span>
                  <span className="flex gap-2 items-center">
                    <span className="font-semibold">Role:</span>
                    <span>@Admin</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full ">
                <span className="flex gap-2 items-center">
                  <MdPhoneInTalk />
                  {user?.phone}
                </span>

                <span className="flex gap-2 items-center">
                  <MdOutlineAlternateEmail />
                  <span>{user?.email}</span>
                </span>
              </div>
            </div>

            <div className=" bg-white rounded-lg flex flex-col items-center p-3 dark:bg-[#242526] dark:text-white">
              <h1 className="font-bold lg:text-3xl text-xl">
                Totale D'élèves{" "}
                <Chip>{user?.countSex.HOMME + user?.countSex.FEMME}</Chip>
              </h1>
              <PieChart
                boysCount={user?.countSex.HOMME}
                girlsCount={user?.countSex.FEMME}
              />
            </div>
          </div>
        )) : (<div className="w-full py-10 flex justify-center"><Spinner label="Chargement ..." size="lg"/></div>)}
    </>
  );
};

export default Home;
