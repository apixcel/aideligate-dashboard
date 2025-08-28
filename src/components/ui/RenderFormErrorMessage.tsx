"use client";
import { ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";

interface IProps {
  name: string;
}
const RenderFormErrorMessage: React.FC<IProps> = ({ name }) => {
  const { t } = useTranslation();
  return (
    <ErrorMessage
      name={name}
      component="span"
      render={(message) => <span className="mt-1 text-sm text-red-600">{t(message)}</span>}
    />
  );
};

export default RenderFormErrorMessage;
