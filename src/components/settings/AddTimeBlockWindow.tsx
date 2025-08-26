"use client";
import { createTimeBlocks } from "@/actions/timeBlock.action";
import { Dialog, Transition } from "@headlessui/react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Clock, X } from "lucide-react";
import { Fragment, useState } from "react";
import * as Yup from "yup";
import DropDownSelector from "../shared/DropDownSelector";
const days = [
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
  { label: "Sunday", value: 7 },
];
const initialValues = {
  day_of_week: 1,
  start_time: "",
  end_time: "",
};
// helper to compare "HH:MM"
const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const schema = Yup.object({
  day_of_week: Yup.number().typeError("Select a day").required("Select a day"),
  start_time: Yup.string().required("Start time is required"),
  end_time: Yup.string()
    .required("End time is required")
    .test("is-after", "End time must be after start time", function (value) {
      const { start_time } = this.parent as typeof initialValues;
      if (!start_time || !value) return true; // other rules handle required
      return toMinutes(value) > toMinutes(start_time);
    }),
});
function toTimetzLiteral(hhmm: string, at: Date = new Date()) {
  // getTimezoneOffset = minutes to add to *local* to get UTC (Dhaka => -360)
  const tzOffsetMin = at.getTimezoneOffset();
  const sign = tzOffsetMin <= 0 ? "+" : "-";
  const abs = Math.abs(tzOffsetMin);
  const hh = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm = String(abs % 60).padStart(2, "0");
  const offset = `${sign}${hh}:${mm}`;

  const [h, m = "00"] = hhmm.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}:00${offset}`;
}
const AddTimeBlockWindow = ({
  onAdd,
  label,
}: {
  onAdd?: (block: { day_of_week: number; start_time: string; end_time: string }) => void;
  label?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const handleSubmit = async (
    payload: typeof initialValues,
    helper: FormikHelpers<typeof initialValues>
  ) => {
    const start_timetz = toTimetzLiteral(payload.start_time); // e.g. "13:00:00+06:00"
    const end_timetz = toTimetzLiteral(payload.end_time); // e.g. "14:00:00+06:00"

    helper.setSubmitting(true);
    console.log({ ...payload, start_time: start_timetz, end_time: end_timetz }); // {day_of_week: 1, start_time: '13:00', end_time: '14:00'}

    await createTimeBlocks([{ ...payload, start_time: start_timetz, end_time: end_timetz }]); //
    helper.setSubmitting(false);
    onAdd?.(payload);
    close();
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex items-center justify-center gap-2 rounded-[8px] border border-darker bg-white-secondary px-[14px] py-[6px] font-[500] text-black-secondary hover:bg-white-secondary/90"
      >
        <Clock className="h-4 w-4" />
        {label || "Add Window"}
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={close} className="relative z-50">
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
                <Dialog.Panel className="w-full max-w-md rounded-xl bg-darker p-5 shadow-xl ring-1 ring-black/10">
                  <div className="flex items-start justify-between">
                    <Dialog.Title className="text-lg font-semibold">Add Time Window</Dialog.Title>
                    <button
                      type="button"
                      onClick={close}
                      className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                  >
                    {({ setFieldValue, isSubmitting, isValid, dirty }) => (
                      <Form className="mt-4 space-y-4">
                        {/* Day */}
                        <div>
                          <label className="mb-1 block text-sm font-medium">Day of Week</label>
                          <DropDownSelector
                            data={days}
                            onChange={(opt) =>
                              setFieldValue("day_of_week", opt?.value ?? null, true)
                            }
                          />
                          <ErrorMessage
                            name="day_of_week"
                            component="p"
                            className="mt-1 text-xs text-red-600"
                          />
                        </div>

                        {/* Times */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-sm font-medium">Start Time</label>
                            <Field
                              type="time"
                              name="start_time"
                              className="w-full rounded-md border border-dark px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
                            />
                            <ErrorMessage
                              name="start_time"
                              component="p"
                              className="mt-1 text-xs text-red-600"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium">End Time</label>
                            <Field
                              type="time"
                              name="end_time"
                              className="w-full rounded-md border border-dark px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
                            />
                            <ErrorMessage
                              name="end_time"
                              component="p"
                              className="mt-1 text-xs text-red-600"
                            />
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={close}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting || !dirty || !isValid}
                            className="rounded-lg bg-brand-blue-2 px-4 py-2 text-sm font-medium text-white hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isSubmitting ? "Adding..." : "Add"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddTimeBlockWindow;
