"use client";
import { IAppointment } from "@/interface/appointment.interface";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import AppointmentEditDialog from "./AppointmentEditDialog";
import DeleteApppointmentDialog from "./DeleteApppointmentDialog";
interface IProps {
  appointment: IAppointment;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
}
const AppointmentActions: React.FC<IProps> = ({ appointment, setRefetch }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditDialogOpen(true)}
          className="group flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-dark"
        >
          <PencilIcon className="size-4" />
        </button>
        <button
          onClick={() => setIsDeleteDialogOpen(true)}
          className="group flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 text-red hover:bg-red/10"
        >
          <TrashIcon className="size-4 fill-red/30 text-red" />
        </button>
      </div>

      <DeleteApppointmentDialog
        onDelete={() => setRefetch((prev) => prev + 1)}
        appointment={appointment}
        isOpen={isDeleteDialogOpen}
        setIsopen={setIsDeleteDialogOpen}
      />
      <AppointmentEditDialog
        appointment={appointment}
        onSuccess={() => setRefetch((prev) => prev + 1)}
        isOpen={isEditDialogOpen}
        setIsopen={setIsEditDialogOpen}
      />
    </>
  );
};

export default AppointmentActions;
