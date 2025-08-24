"use client";
import { Dialog, DialogPanel } from "@headlessui/react";
import React from "react";
const CreateAppointment = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogPanel
          transition
          className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
        >
          fasdfasdf
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default CreateAppointment;
