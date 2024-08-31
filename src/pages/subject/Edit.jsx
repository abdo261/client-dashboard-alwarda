
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FaSchool } from "react-icons/fa";

const Edit = ({ isOpen, onOpenChange, itemToEdit, SelectEditItem }) => {
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  const openChange = () => {
    if (isOpen) {
      SelectEditItem(null);
    }
    onOpenChange();
  };
  const teachers = [
    {key: "reda" , label : "reda"},
    {key: "ayoub" , label : "ayoub"},
    {key: "hassan" , label : "hassan"},
  ]
  const levels = [
    { key: "2bac", label: "2 bac" },
    { key: "1bac", label: "1 bac"},
    { key: "6 eme", label: "6 eme" },
    { key: "4 eme", label: "4 eme" },
  ];
  return (
    <Modal isOpen={isOpen} onOpenChange={openChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handelSubmit} className="dark:text-white">
            <ModalHeader className="flex flex-col gap-1">
              Modifié Le Matiére
            </ModalHeader>
            <ModalBody>
            <Input
              size="sm"
                autoFocus
                label="Nome"
                placeholder="Enter Le Nom De subject"
                variant="bordered"
              />
              <Input
              size="sm"
                label="Prix"
                placeholder="Enter Le Prix"
                variant="bordered"
              />
              <Select
                  size="sm"
                  label="Niveaux"
                  placeholder="Selectioné Le Niveau"
                  variant="bordered"
                >
                  {levels.map((level) => (
                    <SelectItem key={level.key}>{level.label}</SelectItem>
                  ))}
                </Select>
              <Select
                  size="sm"
                  label="Enseignantes"
                  placeholder="Selectioné Le Enseignante"
                  variant="bordered"
                >
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.key}>{teacher.label}</SelectItem>
                  ))}
                </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Ferme
              </Button>
              <Button color="success" type="submit">
              Modifier
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Edit;
