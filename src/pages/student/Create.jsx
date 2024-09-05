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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCentres } from "../../redux/api/centreApi";
import {getLevels } from "../../redux/api/levelApi";


const Create = ({ isOpen, onOpenChange }) => {
  const dispatch = useDispatch()
  const {centres , loading : centresLoading ,error : centresError} = useSelector((state)=>state.centre)
  const {levels , loading : levelsLoading , error :levelsError} = useSelector((state)=>state.level)
  const { errorValidation, loading } = useSelector((state) => state.student);
  
  const [formData , setFormData] = useState({
    firstName : "",
    lastName : "",
    sex : "",
    phone : "",
    parentPhone : "",
    registrationDate : "",
    centreId : "",
    levelId : "",
  })

  useEffect(()=>{
    dispatch(getCentres())
    dispatch(getLevels())
  },[])

  console.log(centres)

  const [date, setDate] = useState(
   new Date()
  );
  console.log(formData)
  const today = parseDate(new Date().toISOString().split("T")[0]);

   const handelSubmit = (e) => {
    e.preventDefault();
     // Check if date is set and convert to ISO string
     const isoDate = (date instanceof Date && !isNaN(date.getTime())) 
     ? date.toISOString() 
     : today.toISOString(); // Default to today's date if no valid date is set
   
   console.log("Selected Date in ISO Format:", isoDate);
  };
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
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  value={formData.firstName}
                />
                <Input
                  size="sm"
                  autoFocus
                  label="Prenom"
                  placeholder="Enter Le Prenom D'eleve"
                  variant="bordered"
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  value={formData.lastName}
                />
                
                <Select
                  size="sm"
                  label="Sex"
                  placeholder="Selectioné Le Sex"
                  variant="bordered"
                  onChange={(e) => setFormData((prev) => ({...prev, sex: e.target.value }))}
                  value={formData.sex}
                >
                  {['Home',"Femme"].map((sex) => (
                    <SelectItem  className="dark:text-white" key={sex}>{sex}</SelectItem>
                  ))}
                </Select>
                <Input
                  size="sm"
                  autoFocus
                  label="Télé Personnee"
                  placeholder="Enter Le Télé D'eleve"
                  variant="bordered"
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  value={formData.phone}
                />
                <Input
                  size="sm"
                  autoFocus
                  label="Télé Parents"
                  placeholder="Enter Le Télé De Parents "
                  variant="bordered"
                  onChange={(e) => setFormData((prev) => ({ ...prev, parentPhone: e.target.value }))}
                  value={formData.parentPhone}
                />
                <DatePicker
                  defaultValue={today}
                  label="Inscri Le"
                  variant="bordered"
                  showMonthAndYearPickers
                  onChange={(newDate) => {
                   
                    setDate(new Date(newDate));
                  }}
                />
                <Select
                  size="sm"
                  label="Centre"
                  placeholder="Selectioné Le Centre "
                  variant="bordered"
                  onChange={(e) => setFormData((prev) => ({ ...prev, centreId: e.target.value }))}
                  value={formData.centreId}
                >
                  {centres.map((centre) => (
                    <SelectItem  className="dark:text-white" key={centre.id}>{centre.name}</SelectItem>
                  ))}
                </Select>

                <Select
                 className="dark:text-white"
                  size="sm"
                  label="Niveau"
                  placeholder="Selectioné Le Niveau"
                  variant="bordered"
                  onChange={(e) => setFormData((prev) => ({ ...prev, levelId: e.target.value }))}
                  value={formData.levelId}
                >
                  {levels.map((level) => (
                    <SelectItem  className="dark:text-white" key={level.id}>{level.name}</SelectItem>
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
