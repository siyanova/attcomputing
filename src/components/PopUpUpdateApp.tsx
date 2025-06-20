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
  id: string;
  description: {
    String: string;
    Valid: boolean;
  };
  engineer: {
    String: number;
    Valid: boolean;
  };
  cabinet: {
    String: string;
    Valid: boolean;
  };
  status: {
    String: string;
    Valid: boolean;
  };
  teacher: {
    String: string;
    Valid: boolean;
  };
  startDate: string;
  endDate: string;
};

type Props = {
  setPopUp: (value: SetStateAction<boolean>) => void;
  title: string;
  setStrokeTable: Dispatch<SetStateAction<StrokeTable[]>>;
  lastStrokeTable: StrokeTable;
  engineers: Engineer[];
};
type StrokeTableDefault = {
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

const PopUpUpdateApp = ({
  setPopUp,
  title,
  setStrokeTable,
  lastStrokeTable,
  engineers,
}: Props) => {
  const appDefault: StrokeTableDefault = {
    description: lastStrokeTable.Description.String,
    engineer: lastStrokeTable.IDEngineer.Int64,
    cabinet: lastStrokeTable.Cabinet.String,
    status: lastStrokeTable.Status.String,
    teacher: lastStrokeTable.NameTeacher.String,
    startDate: lastStrokeTable.StartDate.split("T")[0],
    endDate:
      lastStrokeTable.EndDate.Time === "0001-01-01T00:00:00Z"
        ? ""
        : lastStrokeTable.EndDate.Time.split("T")[0],
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<StrokeTableDefault>({
    resolver: zodResolver(StrokeTableFromSchema),
    defaultValues: appDefault,
  });

  const engineersSelect: Engineer[] = [
    { ID: "0", Name: "Выберите инженера", Email: "" },
    ...engineers,
  ];

  const handleSetToday = () => {
    const today = new Date().toISOString().split("T")[0];
    setValue("startDate", today);
  };
  const handleSetTodayEndApp = () => {
    const today = new Date().toISOString().split("T")[0];
    setValue("endDate", today);
  };

  const status = ["Не назначено", "Выполнено", "Отклонено", "В процессе"];

  const handleUpdateTable = async (formData: StrokeTableDefault) => {
    const newFormData: StrokeTableRequest = {
      id: lastStrokeTable.ID.toString(),
      description: { String: formData.description, Valid: true },
      engineer: {
        String: formData.engineer,
        Valid: formData.engineer != 0 ? true : false,
      },
      cabinet: { String: formData.cabinet, Valid: true },
      status: { String: formData.status, Valid: true },
      teacher: { String: formData.teacher, Valid: true },
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    try {
      console.log("lastStrokeTable.ID перед отправкой:", newFormData.id);
      const response = await axios.put(
        `http://localhost:5050/updateApplication`,
        newFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const newStroke: StrokeTable = {
          ID: lastStrokeTable.ID,
          Description: { Valid: true, String: formData.description },
          IDEngineer: { Valid: true, Int64: formData.engineer },
          Cabinet: { Valid: true, String: formData.cabinet },
          Status: { Valid: true, String: formData.status },
          NameTeacher: { Valid: true, String: formData.teacher },
          StartDate: formData.startDate,
          EndDate: { Valid: true, Time: formData.endDate },
        };
        setStrokeTable((strokeTable) =>
          strokeTable.map((app) => (app.ID === newStroke.ID ? newStroke : app))
        );
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
        onSubmit={handleSubmit(handleUpdateTable)}
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
          <div className="flex flex-col gap-2">
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
        <Button text="Обновить" />
      </form>
    </PopUpBg>
  );
};
export default PopUpUpdateApp;

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
