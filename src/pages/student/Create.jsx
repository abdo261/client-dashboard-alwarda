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
import SelectMaterial from "../../components/SelectMaterial";
import { parseDate } from "@internationalized/date";
import { useState } from "react";

const Create = ({ isOpen, onOpenChange }) => {
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  const [date, setDate] = useState(
    parseDate(new Date().toISOString().split("T")[0])
  );

  const today = parseDate(new Date().toISOString().split("T")[0]);
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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handelSubmit} className="dark:text-white font-bold">
            <ModalHeader className="flex flex-col gap-1">
              Crée une Nouvelle Centre
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
                  autoFocus
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
                  {['Home',"Femme"].map((sex) => (
                    <SelectItem key={sex}>{sex}</SelectItem>
                  ))}
                </Select>
                <Input
                  size="sm"
                  autoFocus
                  label="Télé Personnee"
                  placeholder="Enter Le Télé D'eleve"
                  variant="bordered"
                />
                <Input
                  size="sm"
                  autoFocus
                  label="Télé Parents"
                  placeholder="Enter Le Télé De Parents "
                  variant="bordered"
                />
                <DatePicker
                  defaultValue={today}
                  label="Inscri Le"
                  variant="bordered"
                  showMonthAndYearPickers
                  onChange={setDate}
                />
                <Select
                  size="sm"
                  label="Centre"
                  placeholder="Selectioné Le Centre "
                  variant="bordered"
                  className="dark:text-white"
                >
                  {centres.map((centre) => (
                    <SelectItem  className="dark:text-white" key={centre.key}>{centre.label}</SelectItem>
                  ))}
                </Select>

                <Select
                 className="dark:text-white"
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
                Crée
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Create;
