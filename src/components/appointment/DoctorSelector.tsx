import { getAllDoctors } from "@/actions/doctor.action";
import { IDoctor } from "@/interface/doctor";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  onChange: (value: string) => void;
  className?: string;
  onBlur?: () => void;
}
const DoctorSelector: React.FC<IProps> = ({ onChange, className, onBlur }) => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);

  useEffect(() => {
    const getDoctors = async () => {
      const data = await getAllDoctors();
      console.log(data.data);
      setDoctors(data.data || []);
    };
    getDoctors();
  }, []);
  return (
    <select
      onBlur={onBlur}
      className={twMerge("w-full h-fit", className)}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" hidden>
        Select a doctor
      </option>
      {doctors.map((d) => (
        <option key={d.id} value={d.id}>
          {d.full_name}
        </option>
      ))}
    </select>
  );
};

export default DoctorSelector;
