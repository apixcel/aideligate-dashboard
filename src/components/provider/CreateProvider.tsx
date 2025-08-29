// components/providers/CreateProvider.tsx
"use client";

import { createDoctorAction, updateDoctorAction } from "@/actions/doctor.action";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useFormik } from "formik";
import { LoaderCircle } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as Yup from "yup";

const initalValues = { full_name: "" };

interface IProps {
  // keep your original prop name
  deafultValues?: typeof initalValues & { id: string };
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
  state?: boolean;
  onSuccess?: () => void;
  title?: string; // optional dialog title
  submitLabel?: string; // optional button label
  renderTrigger?: boolean;
}

const schema = Yup.object({
  full_name: Yup.string()
    .trim()
    .min(2, "provider.validation.full_name_min")
    .max(100, "provider.validation.full_name_max")
    .required("provider.validation.full_name_required"),
});

const CreateProvider: React.FC<IProps> = ({
  setState,
  state,
  deafultValues,
  onSuccess,
  renderTrigger = true,
}) => {
  // allow controlled or fallback to internal state (even though props mark them as required)
  const [internalOpen, setInternalOpen] = useState(false);

  const open = state ?? internalOpen;
  const setOpen = setState ?? setInternalOpen;

  const isUpdateMode = Boolean(deafultValues?.id);
  const initial = useMemo(
    () => ({ full_name: deafultValues?.full_name ?? "" }),
    [deafultValues?.full_name]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initial,
    validationSchema: schema,
    onSubmit: async (values, helpers) => {
      try {
        helpers.setSubmitting(true);
        const mutation = isUpdateMode ? updateDoctorAction : createDoctorAction;

        const res = await mutation({ ...values, id: deafultValues?.id });
        if (res.error) {
          toast.error(res.error);
          return;
        }

        onSuccess?.();
        toast.success(isUpdateMode ? "Provider updated" : "Provider created");
        setOpen(false);
        helpers.resetForm();
      } catch (e) {
        console.error(e);
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const { t } = useTranslation();

  return (
    <>
      {/* Trigger */}
      {renderTrigger ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded border border-dark px-3 py-2 text-sm font-medium hover:bg-white/5"
        >
          {isUpdateMode ? t("provider.edit_provider") : t("provider.create_provider")}
        </button>
      ) : (
        ""
      )}

      {/* Dialog */}
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-150"
                enterFrom="opacity-0 translate-y-1 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-1 sm:scale-95"
              >
                <Dialog.Panel className="w-full max-w-md rounded-2xl bg-darker p-5 shadow-xl ring-1 ring-black/5">
                  <Dialog.Title className="text-base font-semibold">
                    {isUpdateMode ? t("provider.edit_provider") : t("provider.create_provider")}
                  </Dialog.Title>

                  <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="full_name" className="mb-1 block text-sm font-medium">
                        {t("provider.full_name")}
                      </label>
                      <input
                        id="full_name"
                        name="full_name"
                        type="text"
                        value={formik.values.full_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={clsx(
                          "w-full rounded-md border px-3 py-2 text-sm outline-none",
                          formik.touched.full_name && formik.errors.full_name
                            ? "border-red-500"
                            : "border-gray-300 focus:border-gray-400"
                        )}
                        placeholder="e.g. Dr. Jane Doe"
                        autoFocus
                      />
                      {formik.touched.full_name && formik.errors.full_name && (
                        <p className="mt-1 text-xs text-red-600">{t(formik.errors.full_name)}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        disabled={formik.isSubmitting}
                      >
                        {t("provider.cancel")}
                      </button>
                      <button
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid}
                        className="flex items-center gap-1 rounded-md bg-brand-blue-2 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                      >
                        {t("provider.save_changes")}{" "}
                        {formik.isSubmitting ? (
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : (
                          ""
                        )}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateProvider;
