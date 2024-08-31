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

const Show = ({ isOpen, onOpenChange }) => {
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
                  <span> Ait bachikh</span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">Prenom :</span>
                  <span> Abdellah</span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">sex :</span>
                  <span> Home</span>
                </div>
  
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">Télé :</span>
                  <span> +212654879658</span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">
                    Télé Parent:
                  </span>
                  <span> +212654879658</span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">
                    Inscri Par:
                  </span>
                  <span> Mohamed Alami </span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">
                    Inscri le :
                  </span>
                  <span> 12/06/2024</span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0 flex-shrink-0 ">Centre :</span>
                  <span> centre dchayra 1  </span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">Niveau :</span>
                  <span> 1 ere anne bac </span>
                </div>
                <div className="flex  items-start gap-1">
                  <span className="font-semibold text-gray-400 flex-shrink-0">
                    Matiéres :
                  </span>
                  <span className="flex flex-col ">
                   
                    <span className="font-semibold flex gap-1">francais : <span className="underline">200dh</span></span>
                    <span className="font-semibold flex gap-1">arab : <span className="underline">200dh</span></span>
                    <span className="font-semibold flex gap-1">englais : <span className="underline">200dh</span></span>
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
