import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import SwiperCardsMaterial from "../../components/SwiperCardsMaterial";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getstudentById } from "../../redux/api/studentApi";
import { formatTimestamp } from "../../utils/utils";

const Show = ({ isOpen, onOpenChange ,itemToShow}) => {
  const dispatch = useDispatch();
  const { student, loading, error } = useSelector(
    (state) => state.student
  );
  useEffect(() => {
    if (itemToShow) {
      dispatch(getstudentById(itemToShow));
    }
  }, [dispatch, itemToShow]);
  
  console.log(student)

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
            <ModalHeader className="flex flex-col gap-1">
              Details d'eleve
            </ModalHeader>
            <ModalBody>
              <div className=" flex  flex-col items-start gap-1 dark:text-white">
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">Nom :</span>
                  <span> {student?.firstName}</span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">Prenom :</span>
                  <span> {student?.lastName}</span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">sex :</span>
                  <span> {student?.sex}</span>
                </div>
  
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">Télé :</span>
                  <span> {student?.phone}</span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">
                    Télé Parent:
                  </span>
                  <span> {student?.phoneParent}</span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">
                    Inscri Par:
                  </span>
                  <span>{student?.user?.firstName}  {student?.user?.lastName}</span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">
                    Inscri le :
                  </span>
                  <span> {formatTimestamp(student?.registrationDate)}</span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0 flex-shrink-0 ">Centre :</span>
                  <span> {student?.centre?.name}  </span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">Niveau :</span>
                  <span> {student?.level?.name} </span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">
                    Matiéres :
                  </span>
                  <span className="flex flex-col ">
                  {student?.subjects.map((subject)=>(
                    <span className="font-semibold flex gap-1" key={subject.id}>- {subject.name} :<span className="underline">{subject.pricePerMonth} DH</span></span>
                  ))}
                  </span>
                </div>
                <div className="flex  items-start gap-1 mt-3">
                  <span className="font-semibold text-gray-400 flex-shrink-0">Prix total à payer :</span>
                  <span className="underline font-bold text-lg"> 450 DH </span>
                </div>
              </div>
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
