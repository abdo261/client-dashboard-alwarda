import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getstudentById } from "../../redux/api/studentApi";
import { formatTimestamp } from "../../utils/utils";
import ErrorAlert from "../../components/ErrorAlert";

const Show = ({ isOpen, onOpenChange, itemToShow }) => {
  const dispatch = useDispatch();
  const { student, loading, error } = useSelector((state) => state.student);
  useEffect(() => {
    if (itemToShow) {
      dispatch(getstudentById(itemToShow));
    }
  }, [dispatch, itemToShow]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="lg"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 dark:text-white">
              Details d'eleve
            </ModalHeader>
            <ModalBody>
              {!error &&
                (!loading.loadingGetById ? (
                  <div className=" flex  flex-col items-start gap-1 dark:text-white">
                    <div className="flex  items-start gap-1">
                      <span className="font-semibold text-gray-400 flex-shrink-0">
                        Nom :
                      </span>
                      <span> {student?.firstName}</span>
                    </div>
                    <div className="flex  items-start gap-1">
                      <span className="font-semibold text-gray-400 flex-shrink-0">
                        Prenom :
                      </span>
                      <span> {student?.lastName}</span>
                    </div>
                    <div className="flex  items-start gap-1">
                      <span className="font-semibold text-gray-400 flex-shrink-0">
                        sex :
                      </span>
                      <span> {student?.sex}</span>
                    </div>

                    <div className="flex  items-start gap-1">
                      <span className="font-semibold text-gray-400 flex-shrink-0">
                        Télé :
                      </span>
                      <span className={student?.phone ? "" : "text-gray-500"}>
                        {student?.phone ? student?.phone : "Aucune Télé élève"}
                      </span>
                    </div>
                    <div className="flex  items-start gap-1">
                      <span className="font-semibold text-gray-400 flex-shrink-0">
                        Télé Parent:
                      </span>
                      <span
                        className={student?.phoneParent ? "" : "text-gray-500"}
                      >
                        {student?.phoneParent
                          ? student?.phoneParent
                          : "Aucune Télé Parent"}
                      </span>
                    </div>
                    <div className="flex  items-start gap-1">
                      <span className="font-semibold text-gray-400 flex-shrink-0">
                        Inscri Par:
                      </span>
                      <span>
                        {student?.user?.firstName} {student?.user?.lastName}
                      </span>
                    </div>
                    <div className="flex  items-start gap-1">
                      <span className="font-semibold text-gray-400 flex-shrink-0">
                        Inscri le :
                      </span>
                      <span> {formatTimestamp(student?.registrationDate)}</span>
                    </div>
                    <div className="flex  items-start gap-1">
                      <span className="font-semibold text-gray-400 flex-shrink-0 flex-shrink-0 ">
                        Centre :
                      </span>
                      <span
                        className={student?.centre?.name ? "" : "text-gray-500"}
                      >
                        {student?.centre?.name
                          ? student?.centre?.name
                          : "Aucune Centre"}
                      </span>
                    </div>
                    <div className="flex  items-start gap-1">
                      <span className="font-semibold text-gray-400 flex-shrink-0">
                        Niveau :
                      </span>
                      <span
                        className={student?.level?.name ? "" : "text-gray-500"}
                      >
                        {student?.level?.name
                          ? student?.level?.name
                          : "Aucune Niveau"}
                      </span>
                    </div>
                    <div className="flex items-start gap-1">
                      <span className="font-semibold text-gray-400 flex-shrink-0">
                        Matières :
                      </span>
                      <span className="flex flex-col">
                        {student?.subjects && student.subjects.length > 0 ? (
                          student.subjects.map((subject) => (
                            <span
                              className="font-semibold flex gap-1"
                              key={subject.id}
                            >
                              - {subject.name} :{" "}
                              <span className="underline">
                                {subject.pricePerMonth} DH
                              </span>
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500"> Aucune matière</span>
                        )}
                      </span>
                    </div>
                    {student?.subjects?.length > 0 && (
                      <div className="flex  items-start gap-1 mt-3">
                        <span className="font-semibold text-gray-400 flex-shrink-0">
                          Prix total à payer :
                        </span>
                        <span className="underline font-bold text-lg">
                          {" "}
                          450 DH{" "}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-6 flex w-full justify-center">
                    <Spinner size="lg" label="Chargement en cours..." />
                  </div>
                ))}
              {error && <ErrorAlert message={error} />}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Ferme
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Show;
