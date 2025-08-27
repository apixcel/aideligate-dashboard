"use client";
import { IDoctor } from "@/interface/doctor";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import CreateProvider from "./CreateProvider";

interface IProps {
  provider: IDoctor;
  onSuccess?: () => void;
}
const EditProvderInfo: React.FC<IProps> = ({ provider, onSuccess }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsEditDialogOpen(true)}
        className="group flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-dark"
      >
        <PencilIcon className="size-4" />
      </button>

      <CreateProvider
        deafultValues={provider}
        renderTrigger={false}
        state={isEditDialogOpen}
        setState={setIsEditDialogOpen}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default EditProvderInfo;
