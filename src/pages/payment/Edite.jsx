import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getpaymentById, updateCustempayment,  } from "../../redux/api/paymentApi";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Spinner,
  Tab,
  Tabs,
  Tooltip,
} from "@nextui-org/react";
import ErrorAlert from "../../components/ErrorAlert";
import { FaCheckCircle } from "react-icons/fa";
import { formatDateToDDMMYY } from "../../utils/utils";
import { PiHandCoinsBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

const Edite = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { payment, loading, error } = useSelector((state) => state.payment);

  const [formData, setFormData] = useState(null);
  useEffect(() => {
    dispatch(getpaymentById(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (payment) {
      setFormData(payment);
    }
  }, [payment, id]);

  const handelPaySubject = (id, value = true, price) => {
    setFormData((prev) => {
      const subjects = JSON.parse(prev.subjects);
      const discountPerSubject = subjects.length > 1 ? 50 : 0;
      const updatedSubjects = subjects.map((s) =>
        s.id === id
          ? {
              ...s,
              isPayed: value,
              amountPayed: value
                ? parseInt(s.pricePerMonth) - discountPerSubject
                : 0,
            }
          : s
      );

      const updatedAmountPaid = updatedSubjects
        .filter((s) => s.isPayed)
        .reduce(
          (total, s) =>
            total + (parseInt(s.pricePerMonth, 10) - discountPerSubject),
          0
        );
      return {
        ...prev,
        amountPaid: updatedAmountPaid,
        subjects: JSON.stringify(updatedSubjects),
      };
    });
  };

  const handelPay50 = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      have50: value,
    }));
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    const { amountPaid, subjects, have50, ...res } = formData;
    dispatch(updateCustempayment(id,{ amountPaid, subjects, have50 },()=>navigate(-1)));
  };
  return (
    <div className="w-full p-5 bg-white dark:bg-[#43474b] rounded-lg ">
      {loading.loadingGetById ? (
        <div className="flex w-full justify-center py-11">
          <Spinner
            size="lg"
            className="m-auto"
            label="Chargement en cours..."
          />
        </div>
      ) : error ? (
        <ErrorAlert message={error} />
      ) : (
        payment && (
          <div className="w-full  grid grid-cols-1  md:grid-cols-[1fr_auto] gap-3">
            <div className="w-full">
              <form
                className="flex flex-col w-full gap-3  h-full"
                onSubmit={handelSubmit}
              >
                <Tabs aria-label="Options" fullWidth>
                  <Tab key="simple" title="Simple">
                    <Card>
                      <CardBody className="flex flex-col w-full gap-3  h-full">
                        {formData?.subjects &&
                          JSON.parse(formData?.subjects)?.map((s) => (
                            <div
                              className="flex gap-2 items-center "
                              key={s.id}
                            >
                              <Chip
                                key={s.id}
                                color={s.isPayed ? "success" : "danger"}
                                size="lg"
                                variant="faded"
                                startContent={
                                  s.isPayed ? (
                                    <FaCheckCircle />
                                  ) : (
                                    <IoIosCloseCircle />
                                  )
                                }
                                endContent={
                                  <>{s.pricePerMonth - s.discount} DH</>
                                }
                              >
                                <div className="text-small text-gray-950 dark:text-white">
                                  {s.name}
                                </div>
                              </Chip>
                              <div>
                                <Tooltip
                                  content={
                                    s.isPayed
                                      ? "Annuler cette matière"
                                      : "Payé cette matière"
                                  }
                                  color={s.isPayed ? "danger" : "success"}
                                  showArrow
                                  delay={0}
                                  size="sm"
                                  closeDelay={0}
                                >
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    radius="md"
                                    variant="ghost"
                                    color={s.isPayed ? "danger" : "success"}
                                    onClick={() =>
                                      handelPaySubject(
                                        s.id,
                                        s.isPayed ? false : true,
                                        s.pricePerMonth
                                      )
                                    }
                                  >
                                    {s.isPayed ? (
                                      <IoClose className="text-lg" />
                                    ) : (
                                      <FaCheckCircle className="text-lg" />
                                    )}
                                  </Button>
                                </Tooltip>
                              </div>
                            </div>
                          ))}
                        <div>
                          <Chip
                            key={"50DH"}
                            color={
                              formData?.have50 === 0 ? "success" : "danger"
                            }
                            size="lg"
                            variant="faded"
                            startContent={
                              formData?.have50 === 0 ? (
                                <FaCheckCircle />
                              ) : (
                                <IoIosCloseCircle />
                              )
                            }
                          >
                            <div className="text-small text-gray-950 dark:text-white">
                              50 DH
                            </div>
                          </Chip>
                          <Tooltip
                            content={
                              formData?.have50 === 0
                                ? "Annuler cette matière"
                                : "Payé cette matière"
                            }
                            color={
                              formData?.have50 === 0 ? "success" : "danger"
                            }
                            showArrow
                            delay={0}
                            size="sm"
                            closeDelay={0}
                          >
                            <Button
                              isIconOnly
                              size="sm"
                              radius="md"
                              variant="ghost"
                              color={
                                formData?.have50 === 0 ? "danger" : "success"
                              }
                              onClick={() =>
                                handelPay50(id, formData?.have50 === 0 ? 50 : 0)
                              }
                            >
                              {formData?.have50 === 0 ? (
                                <IoClose className="text-lg" />
                              ) : (
                                <FaCheckCircle className="text-lg" />
                              )}
                            </Button>
                          </Tooltip>
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="custem" title="Personalisé">
                    <Card>
                      <CardBody className="flex flex-col w-full gap-3  h-full"></CardBody>
                    </Card>
                  </Tab>
                </Tabs>{" "}
                <Button
                  fullWidth
                  className="mt-auto"
                  type="submit"
                  color="primary"
                  isLoading={loading.loadingCreate}
                >
                  Payé
                </Button>
              </form>
            </div>
            <div className="p-4 space-y-3 dark:text-white dark:bg-[#18191A] rounded-md bg-gray-100  dark:shadow-gray-200  shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] ">
              <div className="flex flex-col gap-2 w-full items-start">
                {formData?.subjects &&
                  JSON.parse(formData?.subjects)?.map((s) => (
                    <Chip
                      key={s.id}
                      color={s.isPayed ? "success" : "danger"}
                      size="lg"
                      variant="faded"
                      startContent={
                        s.isPayed ? <FaCheckCircle /> : <IoIosCloseCircle />
                      }
                      endContent={<>{s.pricePerMonth} DH</>}
                    >
                      <div className="text-small text-gray-950 dark:text-white">
                        {s.name}
                      </div>
                    </Chip>
                  ))}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Devoir de 50 DH:
                  </span>
                  <span
                    className={
                      formData?.have50 === 0 ? "text-success" : "text-danger"
                    }
                  >
                    {formData?.have50 === 0 ? "Payé" : "Non payé"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-1">
                    <span className=" text-gray-600 dark:text-gray-400">
                      Demare Le :
                    </span>
                    <span>{formatDateToDDMMYY(payment?.startAt)}</span>
                  </div>
                  <div className="flex gap-1">
                    <span className=" text-gray-600 dark:text-gray-400">
                      Jusqua :
                    </span>
                    <span>{formatDateToDDMMYY(payment?.dueDate)}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Total ({JSON.parse(payment?.subjects)?.length}) matiére :
                  </span>
                  <span className="tracking-widest">
                    {payment?.discount + payment?.totalAmount} DH
                  </span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Rabais:
                  </span>
                  <span>-{payment?.discount} DH</span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <PiHandCoinsBold size="25" /> :
                  </span>
                  <span className="tracking-widest">
                    {formData?.amountPaid} DH
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between  gap-4">
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Devoir:
                  </span>
                  <span className="tracking-widest">
                    {payment?.totalAmount} DH
                  </span>
                </div>
                <div className="flex gap-1">
                  <span className=" text-gray-600 dark:text-gray-400">
                    Le Rest:
                  </span>
                  <span className="tracking-widest">
                    {payment?.totalAmount - formData?.amountPaid} DH
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Edite;
