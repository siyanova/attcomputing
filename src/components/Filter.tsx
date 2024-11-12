"use client";
import Image from "next/image";
import filter from "../../public/filter.svg";
import path from "../../public/Path.svg";
import React from "react";
import { useState } from "react";
import { PopUpBg } from "./PopUpBg";
export const Filter = () => {
  const [date, setDate] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    if (inputValue.length <= 10) {
      if (/^\d{2}$/.test(inputValue)) {
        e.target.value = inputValue + "/";
      } else if (/^\d{2}\/\d{2}$/.test(inputValue)) {
        e.target.value = inputValue + "/";
      }
      setDate(e.target.value);
    }
  };
  const [isPopupOpen, setPopupOpen] = useState(false);
  return (
    <div className="p-[20px] flex-col items-start flex w-full bg-[#F5F6FA]">
      <h1 className="text-[32px] text-[#013970] font-bold mt-[25px]">
        Список Заявок
      </h1>
      <div className="mt-[20px] flex items-center gap-5 w-full">
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
                  placeholder="Дата"
                  value={date}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input placeholder="Преподаватель" className="flex px-[23px] py-[10px] w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 items-center gap-[6px]">
                  
                </input>
              </td>
              <td>
                <div className="relative">
                  <button
                    onClick={() => setPopupOpen(!isPopupOpen)}
                    className=" flex px-[23px] py-[10px] items-center gap-[6px]"
                  >
                    <p>Статус заявки</p>
                    <Image src={path} alt="path" />
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
                        <button className="p-3 border rounded-3xl w-[147px] text-left hover:text-[#00B69B] hover:bg-[#00B69B] hover:bg-opacity-20">
                          Выполнено
                        </button>
                        <button className="p-3 border rounded-3xl w-[147px] text-left hover:text-[#EF3826] hover:bg-[#EF3826] hover:bg-opacity-20">
                          Отклонено
                        </button>
                        <button className="p-3 border rounded-3xl w-[147px] text-left hover:text-[#6226EF] hover:bg-[#6226EF] hover:bg-opacity-20">
                          В процессе
                        </button>
                        <button className="p-3 border rounded-3xl w-[147px] text-left hover:text-[#FFA756] hover:bg-[#FFA756] hover:bg-opacity-20">
                          Не назначено
                        </button>
                      </div>
                      <div className="border"></div>
                      <button className="border rounded-lg text-white mx-auto text-[14px] bg-[#4880FF] hover:bg-opacity-50 hover:text-black hover:transition-colors duration-300 px-[30px] py-[10px]">
                        Применить
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-row gap-5 ">
          <button className="border rounded-lg text-white text-[14px] ml-auto bg-[#4880FF] hover:bg-opacity-50 hover:text-black hover:transition-colors duration-300 px-[30px] py-[10px]">
            Применить
          </button>
          <button className="flex  rounded-lg px-[23px] text-[14px] hover:bg-[#EA0234] text-[#EA0234] hover:transition-colors duration-300 hover:text-white py-[10px] items-center gap-[6px]">
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
      <button className="border rounded-lg text-white text-[14px] mt-[20px] bg-[#4880FF] hover:bg-opacity-50 hover:text-black hover:transition-colors duration-300 px-[30px] py-[10px]">
        Добавить заявку
      </button>
    </div>
  );
};
