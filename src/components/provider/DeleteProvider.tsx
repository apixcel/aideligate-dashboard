import { deleteDoctorAction } from "@/actions/doctor.action";
import { IDoctor } from "@/interface/doctor";
import { Dialog, Transition } from "@headlessui/react";
import { LoaderCircle, TrashIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";

interface IProps {
  onSuccess?: () => void;
  doctor: IDoctor;
}
const DeleteProvider: React.FC<IProps> = ({ doctor, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteDoctorAction(doctor.id);
    setIsDeleting(false);
    if (res.error) {
      return toast.error(res.error);
    }
    toast.success("Provider deleted successfully");
    onSuccess?.();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 text-red hover:bg-red/10"
      >
        <TrashIcon className="size-4 fill-red/30 text-red" />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          {/* Background overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* Dialog content */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-lg bg-darker p-6 shadow-lg">
                <Dialog.Title className="text-lg font-medium text-white">
                  Delete Doctor
                </Dialog.Title>

                <div className="mt-4">
                  <p className="text-sm text-light">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">{doctor.full_name}</span>? This action cannot be
                    undone.
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isDeleting}
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-[5px] rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                  >
                    Delete {isDeleting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : ""}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteProvider;
