"use client";
import Image from "next/image";
import filter from "../../public/filter.svg";
import path from "../../public/Path.svg";
import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import Button from "@/components/Button";

type Engineer = {
  ID: string;
  Name: string;
  Email: string;
};

type Props = {
  setFilterTeacher: Dispatch<SetStateAction<string>>;
  setFilterEngineer: Dispatch<SetStateAction<string>>;
  setFilterDate: Dispatch<SetStateAction<string>>;
  setFilterStatus: Dispatch<SetStateAction<string>>;
  engineers: Engineer[];
};

export const Filter = ({
  setFilterTeacher,
  setFilterDate,
  setFilterEngineer,
  setFilterStatus,
  engineers,
}: Props) => {
  const [date, setDate] = useState("");

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDate(formatDate(newValue));
  };

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState("");
  const [activeFilterTeacher, setActiveFilterTeacher] = useState("");
  const [activeFilterEngineer, setActiveFilterEngineer] = useState("");

  const handleAddFiltration = () => {
    setFilterDate(date);
    setFilterTeacher(activeFilterTeacher);
    setFilterEngineer(activeFilterEngineer != "0" ? activeFilterEngineer : "");
    setFilterStatus(activeStatus);
    setPopupOpen(false)
  };

  const engineersSelect: Engineer[] = [
    { ID: "0", Name: "Выберите инженера", Email: "" },
    ...engineers,
  ];

  const handleDeleteFiltration = () => {
    setDate("");
    setActiveStatus("");
    setActiveFilterTeacher("");
    setActiveFilterEngineer("");
    //фильтрация
    setFilterDate("");
    setFilterTeacher("");
    setFilterEngineer("");
    setFilterStatus("");

    setPopupOpen(false)
  };

  return (
    <div className="p-[20px] 2xl:max-w-[1240px] 2xl:mx-auto flex-col items-start flex w-full">
      <h1 className="text-[32px] text-[#013970] font-bold mt-[25px]">
        Список Заявок
      </h1>
      <div className="mt-[20px] flex  items-center gap-5 w-full">
        <table className="table-fixed text-[14px] bg-white border-collapse  rounded-lg">
          <tbody>
            <tr>
              <td className="rounded-full py-[20px] px-[23px]">
                <Image
                  src={filter}
                  alt="filter"
                  className="h-[19px] w-[19px] "
                />
              </td>
              <td>
                <input
                  className="px-[23px] py-[10px] w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Дата старта"
                  value={date}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  placeholder="Преподаватель"
                  className="flex px-[23px] py-[10px] w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 items-center gap-[6px]"
                  onChange={(event) =>
                    setActiveFilterTeacher(event.target.value)
                  }
                ></input>
              </td>
              <td>
                <select
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 bg-white h-[42px]"
                  onChange={(e) => setActiveFilterEngineer(e.target.value)}
                >
                  {engineersSelect.map((item, index) => {
                    return (
                      <option value={item.ID} key={index}>
                        {item.Name}
                      </option>
                    );
                  })}
                </select>
              </td>
              <td>
                <div className="relative">
                  <button
                    onClick={() => {
                      setPopupOpen(!isPopupOpen);
                    }}
                    className=" flex px-[23px] py-[10px] items-center gap-[6px]"
                  >
                    <p>Статус заявки</p>
                    <Image
                      src={path}
                      alt="Path"
                      className={`transform transition-transform duration-300 ${
                        isPopupOpen ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </button>
                  <div
                    className={`absolute ${
                      isPopupOpen ? "flex" : "hidden"
                    }  mt-[15px]`}
                  >
                    <div className="bg-white w-[530px] flex flex-col gap-[30px] p-6 -translate-x-[50%]  border-[3px] border-[#568AFF] rounded-3xl">
                      <p className="text-[18px] font-bold">
                        Выберите статус заявки
                      </p>
                      <div className="flex flex-row flex-wrap font-bold gap-[15px] ">
                        <button
                          className={`p-3 border rounded-3xl w-[147px] text-left hover:text-[#00B69B] hover:bg-[#00B69B] hover:bg-opacity-20 ${
                            activeStatus === "Выполнено"
                              ? "bg-[#00B69B] text-white"
                              : ""
                          }`}
                          onClick={() =>
                            setActiveStatus(
                              activeStatus === "Выполнено" ? "" : "Выполнено"
                            )
                          }
                        >
                          Выполнено
                        </button>
                        <button
                          className={`p-3 border rounded-3xl w-[147px] text-left hover:text-[#EF3826] hover:bg-[#EF3826] hover:bg-opacity-20 ${
                            activeStatus === "Отклонено"
                              ? "bg-[#EF3826] text-white"
                              : ""
                          }`}
                          onClick={() =>
                            setActiveStatus(
                              activeStatus === "Отклонено" ? "" : "Отклонено"
                            )
                          }
                        >
                          Отклонено
                        </button>
                        <button
                          className={`p-3 border rounded-3xl w-[147px] text-left hover:text-[#6226EF] hover:bg-[#6226EF] hover:bg-opacity-20 ${
                            activeStatus === "В процессе"
                              ? "bg-[#6226EF] text-white"
                              : ""
                          }`}
                          onClick={() =>
                            setActiveStatus(
                              activeStatus === "В процессе" ? "" : "В процессе"
                            )
                          }
                        >
                          В процессе
                        </button>
                        <button
                          className={`p-3 border rounded-3xl w-[147px] text-left hover:text-[#FFA756] hover:bg-[#FFA756] hover:bg-opacity-20 ${
                            activeStatus === "Не назначено"
                              ? "bg-[#FFA756] text-white"
                              : ""
                          }`}
                          onClick={() =>
                            setActiveStatus(
                              activeStatus === "Не назначено"
                                ? ""
                                : "Не назначено"
                            )
                          }
                        >
                          Не назначено
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-row gap-5 ">
          <Button
            text="Применить"
            className=" px-[30px] text-[14px]"
            onClick={() => handleAddFiltration()}
          />
          <button
            className="flex  rounded-lg px-[23px] text-[14px] hover:bg-[#EA0234] text-[#EA0234] hover:transition-colors duration-300 hover:text-white py-[10px] items-center gap-[6px]"
            onClick={() => handleDeleteFiltration()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 18 18"
              className="fill-current"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 3.75V0.75L5.25 4.5L9 8.25V5.25C11.4825 5.25 13.5 7.2675 13.5 9.75C13.5 12.2325 11.4825 14.25 9 14.25C6.5175 14.25 4.5 12.2325 4.5 9.75H3C3 13.065 5.685 15.75 9 15.75C12.315 15.75 15 13.065 15 9.75C15 6.435 12.315 3.75 9 3.75Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
