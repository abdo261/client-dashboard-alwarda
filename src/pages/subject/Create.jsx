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
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSubject } from "../../redux/api/subjectApi";
import { getLevels } from "../../redux/api/levelApi";
import { subjectActions } from "../../redux/slices/subjectSlice";
import { formatErrorField } from "../../utils/utils";

const Create = ({ isOpen, onOpenChange }) => {
  const dispatch = useDispatch();
  const { levels, loading: levelsLoading, error } = useSelector((state) => state.level);
  const { errorValidation, loading } = useSelector((state) => state.subject);

  const [formData, setFormData] = useState({
    name: "",
    pricePerMonth: "",
    levelId: "",
    school: "",
  });

  const getLevelsCallback = useCallback(() => {
    dispatch(getLevels());
  }, [dispatch]);

  useEffect(() => {
    getLevelsCallback();
  }, [getLevelsCallback]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createSubject({
        ...formData,
        pricePerMonth: Number(formData.pricePerMonth), // Convert to number
      }, () => {
        setFormData({ name: "", pricePerMonth: "", levelId: "", school: "" });
        onOpenChange(); // Close the modal on successful submit
      })
    );
  };
  

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", pricePerMonth: "", levelId: "", school: "" });
      dispatch(subjectActions.setErrorValidation(null));
    }
  }, [isOpen, dispatch]);

  const schools = [
    { key: "COLLEGE", label: "College" },
    { key: "LYCEE", label: "Lycee" },
    { key: "ECOLE_PRIMAIRE", label: "Ecole Primaire" },
  ];


console.log(formData)

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit} className="dark:text-white">
            <ModalHeader className="flex flex-col gap-1">
              Crée une Nouvelle Matiéres
            </ModalHeader>
            <ModalBody>
              <Input
                size="sm"
                autoFocus
                label="Nom"
                placeholder="Enter Le Nom De Matiére"
                variant="bordered"
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                value={formData.name}
                isInvalid={errorValidation && formatErrorField(errorValidation, "name")}
                errorMessage={
                  errorValidation &&
                  formatErrorField(errorValidation, "name") && (
                    <ol>
                      {formatErrorField(errorValidation, "name")?.map((e) => (
                        <li key={e}>-{e}</li>
                      ))}
                    </ol>
                  )
                }
              />
              <Input
              size="sm"
              label="Prix"
              placeholder="Enter Le Prix"
              variant="bordered"
              type="number"
              min="0"
              onChange={(e) => setFormData((prev) => ({ ...prev, pricePerMonth: e.target.value }))}
              value={formData.pricePerMonth}
              isInvalid={errorValidation && formatErrorField(errorValidation, "pricePerMonth")}
              errorMessage={
                errorValidation &&
                formatErrorField(errorValidation, "pricePerMonth") && (
                  <ol>
                    {formatErrorField(errorValidation, "pricePerMonth")?.map((e) => (
                      <li key={e}>-{e}</li>
                    ))}
                  </ol>
                )
              }
            />
              <Select
                size="sm"
                label="Niveaux"
                placeholder="Sélectionnez Le Niveau"
                variant="bordered"
                onChange={(e) => setFormData((prev) => ({ ...prev, levelId: e.target.value }))}
                value={formData.levelId}
              >
                {levels?.map((level) => (
                  <SelectItem key={level.id}>{level.name}</SelectItem>
                ))}
              </Select>
              <Select
                size="sm"
                label="Type d'École"
                placeholder="Sélectionnez Le Type d'École"
                variant="bordered"
                onChange={(e) => setFormData((prev) => ({ ...prev, school: e.target.value }))}
                value={formData.school}
              >
                {schools?.map((school) => (
                  <SelectItem key={school.key}>{school.label}</SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fermer
              </Button>
              <Button
                color="success"
                type="submit"
                isLoading={loading.loadingCreate}
              >
                Créer
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Create;
