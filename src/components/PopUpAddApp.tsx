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

type StrokeTableRequest = {
  description: string;
  engineer: number;
  cabinet: string;
  status: string;
  teacher: string;
  startDate: string;
  endDate: string;
};

type Engineer = {
  ID: string;
  Name: string;
  Email: string;
};

type Props = {
  setPopUp: (value: SetStateAction<boolean>) => void;
  title: string;
  strokeTable: StrokeTable[];
  setStrokeTable: Dispatch<SetStateAction<StrokeTable[]>>;
  engineers: Engineer[];
};

const PopUpAddApp = ({
  setPopUp,
  title,
  strokeTable,
  setStrokeTable,
  engineers,
}: Props) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<StrokeTableRequest>({
    resolver: zodResolver(StrokeTableFromSchema),
  });

  const engineersSelect: Engineer[] = [
    { ID: "", Name: "Выберите инженера", Email: "" },
    ...engineers,
  ];

  const status = ["Не назначено", "Выполнено", "Отклонено", "В процессе"];

  const handleSetToday = () => {
    const today = new Date().toISOString().split("T")[0];
    setValue("startDate", today);
  };
  const handleSetTodayEndApp = () => {
    const today = new Date().toISOString().split("T")[0];
    setValue("endDate", today);
  };
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
          IDEngineer: {
            Valid: formData.engineer != 0 ? true : false,
            Int64: formData.engineer,
          },
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
        <div className="gap-10 grid grid-cols-2">
          <div className="flex flex-col gap-2 justify-end">
            <p className="text-[18px]">Название :</p>
            <input
              {...register("description")}
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Название задачи"
            />
            <p className="text-sm text-red-500">
              {errors.description?.message}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-end">
            <p className="text-[18px]">Инженер :</p>
            <select
              {...register("engineer")}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 bg-white h-[42px]"
            >
              {engineersSelect.map((item, index) => {
                return (
                  <option value={item.ID} key={index}>
                    {item.Name}
                  </option>
                );
              })}
            </select>
            <p className="text-sm text-red-500">{errors.engineer?.message}</p>
          </div>

          <div className="flex flex-col gap-2 justify-end">
            <p className="text-[18px]">Кабинет :</p>
            <input
              {...register("cabinet")}
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="3212"
            />
            <p className="text-sm text-red-500">{errors.cabinet?.message}</p>
          </div>
          <div className="flex flex-col gap-2 justify-end">
            <p className="text-[18px]">Статус :</p>
            <select
              {...register("status")}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 bg-white h-[42px]"
            >
              {status.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
            <p className="text-sm text-red-500">{errors.status?.message}</p>
          </div>

          <div className="flex flex-col gap-2 justify-end">
            <p className="text-[18px]">Преподаватель :</p>
            <input
              {...register("teacher")}
              type="text"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Крылов Д.Л."
            />
            <p className="text-sm text-red-500">{errors.teacher?.message}</p>
          </div>
          <div className="flex flex-col gap-2 justify-end">
            <p className="text-[18px]">Дата поступления заявки:</p>
            <div className="flex flex-col">
              <input
                {...register("startDate")}
                type="text"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="2024-12-30"
                onChange={(e) => {
                  e.target.value = formatDate(e.target.value);
                }}
              />
              <button
                className="w-fit px-2 py-1 ml-auto text-blue-500"
                onClick={handleSetToday}
              >
                сегодня
              </button>
            </div>
            <p className="text-sm text-red-500">{errors.startDate?.message}</p>
          </div>
          <div className="flex flex-col gap-2 justify-end">
            <p className="text-[18px]">Дата закрытия заявки: :</p>
            <div className="flex flex-col">
              <input
                {...register("endDate")}
                type="text"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="2024-12-30"
                onChange={(e) => {
                  e.target.value = formatDate(e.target.value);
                }}
              />
              <button
                className="w-fit px-2 py-1 ml-auto text-blue-500"
                onClick={handleSetTodayEndApp}
              >
                сегодня
              </button>
            </div>
            <p className="text-sm text-red-500">{errors.endDate?.message}</p>
          </div>
        </div>
        <Button text="Добавить" />
      </form>
    </PopUpBg>
  );
};
export default PopUpAddApp;

const formatDate = (value: string): string => {
  let cleaned = value.replace(/\D/g, "");

  if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

  let formatted = "";
  if (cleaned.length > 4) {
    formatted = cleaned.slice(0, 4) + "-";
    if (cleaned.length > 6) {
      formatted += cleaned.slice(4, 6) + "-" + cleaned.slice(6);
    } else {
      formatted += cleaned.slice(4);
    }
  } else {
    formatted = cleaned;
  }

  return formatted;
};
