"use client";
import { createAppointmentAction, updateAppointmentAction } from "@/actions/appointment.action";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import DoctorSelector from "./DoctorSelector";
const initialValues = {
  patient_name: "",
  doctor_id: "",
  service_type: "",
  date: "",
  time: "",
  notes: "",
};

const AppointmentSchema = Yup.object({
  patient_name: Yup.string().trim().required("Patient name is required"),
  doctor_id: Yup.string().required("Select a provider"),
  service_type: Yup.string().required("Select a service"),
  date: Yup.string().required("Choose a date"),
  time: Yup.string().required("Choose a time"),
  notes: Yup.string().max(500, "Notes must be at most 500 characters"),
});

interface IProps {
  defaultValues?: typeof initialValues & { id: string };
  isOpen?: boolean;
  setIsopen?: React.Dispatch<React.SetStateAction<boolean>>;
  renderTrigger?: boolean;
  onSuccess?: () => void;
}
const CreateAppointment: React.FC<IProps> = ({
  defaultValues,
  isOpen,
  setIsopen,
  renderTrigger = true,
  onSuccess,
}) => {
  const [open, setOpen] = useState(false);

  // In a real app, replace with an API call
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: { setSubmitting: (b: boolean) => void; resetForm: () => void }
  ) => {
    try {
      const dateTime = new Date(`${values.date}T${values.time}`);

      if (isNaN(dateTime.getTime())) {
        toast.error("Invalid date or time");
        setSubmitting(false);
        return;
      }

      // Check if datetime is in the future
      const now = new Date();
      if (dateTime <= now) {
        toast.error("Appointment must be scheduled in the future");
        setSubmitting(false);
        return;
      }

      const payload = {
        patient_name: values.patient_name,
        doctor_id: values.doctor_id,
        service_type: values.service_type,
        notes: values.notes,
        date_time: dateTime.toISOString(), // timestamptz
        id: defaultValues?.id,
      };

      // Simulate network call

      const mutation = defaultValues ? updateAppointmentAction : createAppointmentAction;

      const res = await mutation(payload);

      if (res?.error) {
        toast.error(res.error);
        setSubmitting(false);
        return;
      }

      resetForm();
      setOpen(false);
      setIsopen?.(false);
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  };

  const setState = setIsopen ?? setOpen;
  const stateValue = isOpen ?? open;

  return (
    <>
      {renderTrigger ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-[10px] rounded-[8px] bg-brand-blue-2 px-[15px] py-[8px] text-white"
        >
          New Appointment <Plus />
        </button>
      ) : (
        ""
      )}

      <Dialog open={stateValue} onClose={setState} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-xl rounded-xl bg-darker p-6 shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-lg font-semibold">
                    {defaultValues ? "Update Appointment" : "Create New Appointment"}
                  </DialogTitle>
                  <p className="mt-1 text-sm">Fill in the appointment details below</p>
                </div>
                <button
                  onClick={() => setState(false)}
                  aria-label="Close"
                  className="-m-2 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 8.586 3.293 1.879A1 1 0 1 0 1.879 3.293L8.586 10l-6.707 6.707a1 1 0 1 0 1.414 1.414L10 11.414l6.707 6.707a1 1 0 0 0 1.414-1.414L11.414 10l6.707-6.707A1 1 0 0 0 16.707 1.88L10 8.586Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <Formik
                initialValues={defaultValues || initialValues}
                validationSchema={AppointmentSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, setFieldValue, setFieldTouched }) => (
                  <Form className="mt-6 space-y-4">
                    {/* Patient Name */}
                    <div>
                      <label htmlFor="patient_name" className="block text-sm font-medium">
                        Patient Name
                      </label>
                      <Field
                        id="patient_name"
                        name="patient_name"
                        placeholder="Enter patient name"
                        className="mt-1 w-full"
                      />
                      <ErrorMessage
                        name="patient_name"
                        component="p"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>

                    {/* Provider */}
                    <div>
                      <label htmlFor="provider" className="block text-sm font-medium">
                        Provider
                      </label>
                      <DoctorSelector
                        defaultValue={defaultValues?.doctor_id}
                        onBlur={() => setFieldTouched("doctor_id", true)}
                        onChange={(e) => setFieldValue("doctor_id", e)}
                      />
                      <ErrorMessage
                        name="doctor_id"
                        component="p"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>

                    {/* Service Type */}
                    <div>
                      <label htmlFor="service_type" className="block text-sm font-medium">
                        Service Type
                      </label>
                      <Field
                        as="select"
                        id="service_type"
                        name="service_type"
                        className="mt-1 w-full"
                      >
                        <option value="" hidden>
                          Select service
                        </option>
                        <option value="Consultation">Consultation</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Physical Exam">Physical Exam</option>
                      </Field>
                      <ErrorMessage
                        name="service_type"
                        component="p"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium">
                          Date
                        </label>
                        <Field id="date" name="date" type="date" className="mt-1 w-full" />
                        <ErrorMessage
                          name="date"
                          component="p"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium">
                          Time
                        </label>
                        <Field id="time" name="time" type="time" className="mt-1 w-full" />
                        <ErrorMessage
                          name="time"
                          component="p"
                          className="mt-1 text-sm text-red-600"
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium">
                        Notes
                      </label>
                      <Field
                        as="textarea"
                        id="notes"
                        name="notes"
                        rows={4}
                        placeholder="Add any notes about this appointment"
                        className="mt-1 w-full resize-y"
                      />
                      <ErrorMessage
                        name="notes"
                        component="p"
                        className="mt-1 text-sm text-red-600"
                      />
                    </div>

                    {/* Actions */}
                    <div className="mt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setState(false)}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg bg-brand-blue-2 px-4 py-2 font-medium text-white shadow hover:to-brand-blue-1 disabled:opacity-60"
                      >
                        {isSubmitting ? "Saving..." : "Save Appointment"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateAppointment;
