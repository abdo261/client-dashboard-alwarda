
import { parseDate } from "@internationalized/date";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { FaSchool } from "react-icons/fa";
import SelectMaterial from "../../components/SelectMaterial";

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
  const centres = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
  ];
  return (
    <Modal isOpen={isOpen} onOpenChange={openChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handelSubmit} className="dark:text-white">
            <ModalHeader className="flex flex-col gap-1">
              Modifié Le eleve
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-1 overflow-y-auto h-[500px]">
                <Input
                  size="sm"
                  autoFocus
                  label="Nom"
                  placeholder="Enter Le Nom D'eleve"
                  variant="bordered"
                />
                <Input
                  size="sm"
                  label="Prenom"
                  placeholder="Enter Le Prenom D'eleve"
                  variant="bordered"
                />

                <Select
                  size="sm"
                  label="Sex"
                  placeholder="Selectioné Le Sex"
                  variant="bordered"
                >
                  {['Home', "Femme"].map((sex) => (
                    <SelectItem key={sex}>{sex}</SelectItem>
                  ))}
                </Select>
                <Input
                  size="sm"
                  label="Télé Personnee"
                  placeholder="Enter Le Télé D'eleve"
                  variant="bordered"
                />
                <Input
                  size="sm"
                  label="Télé Parents"
                  placeholder="Enter Le Télé De Parents "
                  variant="bordered"
                />
                <Select
                  size="sm"
                  label="Centre"
                  placeholder="Selectioné Le Centre"
                  variant="bordered"
                >
                  {centres.map((centre) => (
                    <SelectItem key={centre.key}>{centre.label}</SelectItem>
                  ))}
                </Select>

                <Select
                  size="sm"
                  label="Niveau"
                  placeholder="Selectioné Le Niveau"
                  variant="bordered"
                >
                  {centres.map((Niveau) => (
                    <SelectItem key={Niveau.key}>{Niveau.label}</SelectItem>
                  ))}
                </Select>
                <SelectMaterial />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Ferme
              </Button>
              <Button color="success" type="submit">
              Edite
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Edit;
