import { deleteAppointmentAction } from "@/actions/appointment.action";
import { IAppointment } from "@/interface/appointment.interface";
import { Dialog, Transition } from "@headlessui/react";
import { format } from "date-fns";
import React, { Fragment } from "react";
import { toast } from "sonner";

interface IProps {
  appointment: IAppointment;
  isOpen: boolean;
  setIsopen: React.Dispatch<React.SetStateAction<boolean>>;
  /** Optional: hook your delete logic here */
  onDelete?: (appointment: IAppointment) => void;
}

const DeleteApppointmentDialog: React.FC<IProps> = ({
  appointment,
  isOpen,
  setIsopen,
  onDelete,
}) => {
  const close = () => setIsopen(false);

  const handleDelete = async () => {
    try {
      const res = await deleteAppointmentAction(appointment.id);
      if (res.error) {
        return toast.error(res.error);
      }

      toast.success("Appointment deleted successfully");
      onDelete?.(appointment);
    } finally {
      close();
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={close}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-[1px]" />
        </Transition.Child>

        {/* Panel wrapper (centering) */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center">
            {/* Panel */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-darker p-6 shadow-2xl ring-1 ring-white/10 transition-all">
                <Dialog.Title className="text-lg font-semibold text-white">
                  Delete appointment?
                </Dialog.Title>

                <Dialog.Description className="mt-2 text-sm text-white/70">
                  This action can’t be undone. You’re about to delete{" "}
                  <span className="font-medium text-white">
                    {appointment?.patient_name ?? "this appointment"}
                  </span>
                  {appointment?.date_time && (
                    <>
                      {" "}
                      scheduled on{" "}
                      <span className="font-medium text-white">
                        {format(new Date(appointment.date_time), "PPpp")}
                      </span>
                      .
                    </>
                  )}
                </Dialog.Description>

                {/* Extra context (optional) */}
                {appointment?.notes && (
                  <p className="mt-3 line-clamp-3 text-xs text-white/60">{appointment.notes}</p>
                )}

                {/* Actions */}
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={close}
                    className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/20 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex items-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DeleteApppointmentDialog;
