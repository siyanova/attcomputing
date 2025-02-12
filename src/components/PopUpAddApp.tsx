import { Dispatch, SetStateAction } from "react";
import { PopUpBg } from "./PopUpBg";
import Image from "next/image";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StrokeTableFromSchema } from "./schemas/strokeTable";
import axios from "axios";

type StrokeTable = {
  ID: string;
  Description: {
    String: string;
    Valid: boolean;
  };
  IDEngineer: {
    Int64: number;
    Valid: boolean;
  };
  Cabinet: {
    String: string;
    Valid: boolean;
  };
  Status: {
    String: string;
    Valid: boolean;
  };
  NameTeacher: {
    String: string;
    Valid: boolean;
  };
  StartDate: string;
  EndDate: {
    Time: string;
    Valid: boolean;
  };
};

type Props = {
  setPopUp: (value: SetStateAction<boolean>) => void;
  title: string;
  strokeTable: StrokeTable[];
  setStrokeTable: Dispatch<SetStateAction<StrokeTable[]>>;
};
type StrokeTableRequest = {
  description: string;
  engineer: number;
  cabinet: string;
  status: string;
  teacher: string;
  startDate: string;
  endDate: string;
};
const PopUpAddApp = ({
  setPopUp,
  title,
  strokeTable,
  setStrokeTable,
}: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StrokeTableRequest>({
    resolver: zodResolver(StrokeTableFromSchema),
  });

  const handleAddTable = async (formData: StrokeTableRequest) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/addApplication`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const lastId =
          strokeTable.length > 0
            ? Math.max(...strokeTable.map((e) => parseInt(e.ID)))
            : 0;

        const newStroke: StrokeTable = {
          ID: (lastId + 1).toString(),
          Description: { Valid: true, String: formData.description },
          IDEngineer: { Valid: true, Int64: formData.engineer },
          Cabinet: { Valid: true, String: formData.cabinet },
          Status: { Valid: true, String: formData.status },
          NameTeacher: { Valid: true, String: formData.teacher },
          StartDate: formData.startDate,
          EndDate: { Valid: true, Time: formData.endDate },
        };

        setStrokeTable((strokeTable) => [...strokeTable, newStroke]);
        setPopUp(false);
      } else {
        throw new Error("Ошибка при добавлении инженера");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  return (
    <PopUpBg className="max-w-[1000px]">
      <button
        className="absolute right-[20px] top-[20px]"
        onClick={() => setPopUp(false)}
        tabIndex={0}
      >
        <Image src={"/Close.svg"} alt="close" width={20} height={20} />
      </button>
      <h2 className="mb-4 lg:mb-8 mx-auto text-base lg:text-2xl lg:leading-[28px] font-semibold text-center">
        {title}
      </h2>
      <form
        onSubmit={handleSubmit(handleAddTable)}
        className="flex flex-col gap-4"
      >
        <div className="flex gap-10 flex-wrap">
          <div className="flex flex-col gap-2">
            <p className="text-[18px]">Название :</p>
            <input
              {...register("description")}
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Название задачи"
            />
            <p className="text-sm text-red-500">{errors.description?.message}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[18px]">Инженер :</p>
            <input
              {...register("engineer")}
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Иванов В.В"
            />
            <p className="text-sm text-red-500">{errors.engineer?.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[18px]">Кабинет :</p>
            <input
              {...register("cabinet")}
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="3212"
            />
            <p className="text-sm text-red-500">{errors.cabinet?.message}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[18px]">Статус :</p>
            <input
              {...register("status")}
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Выполнено"
            />
            <p className="text-sm text-red-500">{errors.status?.message}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[18px]">Преподаватель :</p>
            <input
              {...register("teacher")}
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Крылов Д.Л."
            />
            <p className="text-sm text-red-500">{errors.teacher?.message}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[18px]">Дата поступления заявки:</p>
            <input
              {...register("startDate")}
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="2024-12-30"
            />
            <p className="text-sm text-red-500">{errors.startDate?.message}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[18px]">Дата закрытия заявки: :</p>
            <input
              {...register("endDate")}
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="2024-12-30"
            />
            <p className="text-sm text-red-500">{errors.endDate?.message}</p>
          </div>
        </div>
        <Button text="Добавить" />
      </form>
    </PopUpBg>
  );
};
export default PopUpAddApp;
