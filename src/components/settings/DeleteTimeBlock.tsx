import { deleteTimeBlock } from "@/actions/timeBlock.action";
import { ITimeBlock } from "@/interface/timeBlock.interface";
import { Dialog, Transition } from "@headlessui/react";
import { format } from "date-fns";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Fragment, useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// simple formatter for "HH:mm[:ss][±HH(:mm)]"
const formatTimeLabel = (input: string) => {
  try {
    const iso = `1970-01-01T${input.replace(/([+-]\d{2})$/, "$1:00")}`;
    const d = new Date(iso);
    return isNaN(d.getTime()) ? input : format(d, "h:mm a");
  } catch {
    return input;
  }
};

export default function DeleteTimeBlock({
  onSuccess,
  block,
}: {
  onSuccess: (block: ITimeBlock) => void;
  block: ITimeBlock;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const hanldeDelete = async () => {
    setLoading(true);
    await deleteTimeBlock(block.id);
    setLoading(false);
    setOpen(false);
    onSuccess(block);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded px-2.5 py-2 text-red hover:bg-brand-blue-btn hover:text-white-secondary"
      >
        <Trash2 className="h-4.5 w-4.5" />
      </button>{" "}
      <Transition show={open} as={Fragment}>
        <Dialog open={open} onClose={setOpen} className="relative z-50">
          {/* overlay */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="transition-all ease-out duration-200"
                enterFrom="opacity-0 translate-y-2 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="transition-all ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-2 sm:scale-95"
              >
                <Dialog.Panel className="w-full max-w-md rounded-xl bg-darker p-5">
                  {/* header */}
                  <div className="flex items-start justify-between">
                    <Dialog.Title className="text-lg font-semibold">Delete time block</Dialog.Title>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* content */}
                  <div className="mt-4 flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-red-50 p-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <Dialog.Description className="text-sm">
                        This action can’t be undone. Are you sure you want to delete this time
                        block?
                      </Dialog.Description>
                      {block && (
                        <div className="mt-2 rounded-md border border-darker bg-dark px-3 py-2 text-sm">
                          <div className="font-medium">{days[block.day_of_week - 1]}</div>
                          <div className="text-light">
                            {formatTimeLabel(block.start_time)} — {formatTimeLabel(block.end_time)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* actions */}
                  <div className="mt-6 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={hanldeDelete}
                      disabled={loading || !block}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
