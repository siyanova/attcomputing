"use client";
import Image from "next/image";
import PathStart from "../../public/PathStart.svg";
import PathEnd from "../../public/PathEnd.svg";
import Delete from "../../public/Delete.svg";
import Edit from "../../public/Edit.svg";
import Path from "../../public/Path.svg";
import React, { useState } from "react";

export const TableAppl = () => {
  const [showNestedTable, setShowNestedTable] = useState(false);

  const toggleNestedTable = () => {
    setShowNestedTable(!showNestedTable);
  };
  return (
    <div className="text-[14px] h-screen w-full bg-[#F5F6FA] p-[20px] text-center">
      <table className="table-fixed bg-white border-collapse   rounded-lg">
        <thead className="font-bold border-b bg-[#D5D5D5] bg-opacity-10">
          <tr>
            <th className="max-w-[80px] py-[15px] px-[15px]">ID</th>
            <th className="w-[130px] py-[15px] px-[100px]">НАИМЕНОВАНИЕ</th>
            <th className="w-[130px] py-[15px] px-[80px]">ИНЖЕНЕР</th>
            <th className="w-[130px] py-[15px] px-[80px]">КАБИНЕТ</th>
            <th className="w-[130px] py-[15px] px-[80px]">СТАТУС</th>
            <th className="py-[15px] px-[50px]"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="items-center border-b rounded-full border-collapse">
            <td className="wrap py-[15px] px-[15px] items-center flex">
              <button onClick={toggleNestedTable} className="">
                {showNestedTable ? (
                  <Image
                    src={Path}
                    alt="Path"
                    className="transform rotate-180 transition-transform duration-500"
                  />
                ) : (
                  <Image src={Path} alt="Path" className=" transition-transform duration-500 "/>
                )}
              </button>
              <div className="pl-[10px]">00001</div>
            </td>
            <td>
              <p className="p-4 max-w-[200px] mx-auto break-words">
                sdfgksdjfgjsУстановка
                кывплавзопзовашпоыватмотваыоомпаsadjfkjasldjflasjdс
              </p>
            </td>
            <td>
              <p className="p-4 max-w-[200px] mx-auto break-words">Голубов</p>
            </td>
            <td>
              <p className="p-4 max-w-[200px] mx-auto break-words">3245</p>
            </td>
            <td>
              <div className="text-[#00B69B] bg-[#00B69B] bg-opacity-20  text-[12px] rounded-md my-[24px] font-bold mx-[50px] px-4 py-2">
                Выполнено
              </div>
            </td>
            <td>
              <div className="flex justify-left my-auto gap-3">
                <button>
                  <Image src={Edit} alt="Edit" className="w-[20px] h-[20px]" />
                </button>
                <button>
                  <Image
                    src={Delete}
                    alt="Delete"
                    className="w-[20px] h-[20px]"
                  />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {showNestedTable && (
        <table className="ml-[100px] table-fixed bg-white border-collapse  rounded-lg">
          <thead className="font-bold border-b bg-[#D5D5D5] bg-opacity-10">
            <tr>
              <th className="w-[130px] py-[15px] px-[80px]">ПРЕПОДАВАТЕЛЬ</th>
              <th className="w-[130px] py-[15px] px-[80px]">ДАТА</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p className="p-4 max-w-[200px] mx-auto break-words">
                  dfjgsl;dfgjsdifgjfgskdflgjdfПобединцев
                </p>
              </td>
              <td>
                <p className="p-4 max-w-[200px] mx-auto break-words">
                  04 Сен 2024
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <div className="flex bg-white fixed bottom-0 right-0 justify-center m-5 p-2  gap-2 w-[60px]  border rounded-lg">
        <button>
          <Image src={PathStart} alt="path" />
        </button>
        <div className="border"></div>
        <button>
          <Image src={PathEnd} alt="path" />
        </button>
      </div>
    </div>
  );
};
