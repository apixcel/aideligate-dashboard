"use client";
import { IAppointment } from "@/interface/appointment.interface";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Archive, PencilIcon, Square, TrashIcon } from "lucide-react";
import { useState } from "react";
import DeleteApppointmentDialog from "./DeleteApppointmentDialog";
interface IProps {
  appointment: IAppointment;
}
const AppointmentActions: React.FC<IProps> = ({ appointment }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  return (
    <>
      <Menu>
        <MenuButton className="focus:outline-none">Options</MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 rounded-[8px] border-dark bg-darker p-1 text-sm/6 focus:outline-none"
        >
          <div className="px-[12px] py-[6px]">
            <p className="text-[16px] font-medium capitalize">{appointment?.patient_name}</p>
            <span className="text-[12px] text-light">
              {appointment?.doctor?.full_name} | {appointment?.service_type}
            </span>
          </div>
          <span className="my-1 flex h-[1px] w-full bg-white/10" />
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-dark">
              <PencilIcon className="size-4" />
              Edit
              <kbd className="ml-auto hidden font-sans text-xs text-white/50">⌘E</kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-dark">
              <Square className="size-4" />
              Duplicate
              <kbd className="ml-auto hidden font-sans text-xs text-white/50">⌘D</kbd>
            </button>
          </MenuItem>
          <span className="my-1 h-px bg-white/5" />
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-dark">
              <Archive className="size-4" />
              Archive
              <kbd className="ml-auto hidden font-sans text-xs text-white/50">⌘A</kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => setIsDeleteDialogOpen(true)}
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-red hover:bg-red/10"
            >
              <TrashIcon className="size-4 fill-red/30 text-red" />
              Delete
              <kbd className="ml-auto hidden font-sans text-xs text-white/50">⌘D</kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>

      <DeleteApppointmentDialog
        appointment={appointment}
        isOpen={isDeleteDialogOpen}
        setIsopen={setIsDeleteDialogOpen}
      />
    </>
  );
};

export default AppointmentActions;
