"use client";
import Bg from "@/components/BG";
import { Filter } from "@/components/Filter";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import PathStart from "../../public/PathStart.svg";
import PathEnd from "../../public/PathEnd.svg";
import { StrokeTable } from "@/components/StrokeTable";


type TableAppl = {
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

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tableAppl, setTableAppl] = useState<TableAppl[]>([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5050/getApplications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        console.log("Данные", response.data), setTableAppl(response.data);
      })
      .catch((error) => {
        console.log("Ошибка выполнения запроса: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);

  return (
    <Bg>
      <div className="flex flex-col  w-full">
        <Filter />
      </div>
      <div className="text-[14px] h-screen w-full flex flex-col 2xl:items-center p-[20px] text-center">
        <table className="table-fixed bg-white border-collapse  rounded-lg">
          <thead className="font-bold bg-[#D5D5D5] bg-opacity-10">
            <tr>
              <th className="max-w-[80px] py-[15px] px-[15px]">ID</th>
              <th className="w-[130px] py-[15px] px-[100px]">НАИМЕНОВАНИЕ</th>
              <th className="w-[130px] py-[15px] px-[80px]">ИНЖЕНЕР</th>
              <th className="w-[130px] py-[15px] px-[80px]">КАБИНЕТ</th>
              <th className="w-[130px] py-[15px] px-[80px]">СТАТУС</th>
              <th className="py-[15px] px-[50px]"></th>
            </tr>
          </thead>
          {loading || !tableAppl ? (
            <></>
          ) : (
            tableAppl.map((items, index) => (
              <StrokeTable
                key={index}
                id={items.ID}
                name={items.Description}
                engeneer={items.IDEngineer}
                office={items.Cabinet}
                status={items.Status}
                teacher={items.NameTeacher}
                startDate={items.StartDate}
                endDate = {items.EndDate}
                tableAppl={tableAppl}
                setTableAppl={setTableAppl}
              />
            ))
          )}
        </table>
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
    </Bg>
  );
}
