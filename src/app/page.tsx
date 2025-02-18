"use client";
import Bg from "@/components/BG";
import { Filter } from "@/components/Filter";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import PathStart from "../../public/PathStart.svg";
import PathEnd from "../../public/PathEnd.svg";
import { StrokeTable } from "@/components/StrokeTable";
import { Modal } from "@mui/material";
import PopUpAddApp from "@/components/PopUpAddApp";
import Button from "@/components/Button";

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

type Engineer = {
  ID: string;
  Name: string;
  Email: string;
  TelegramID: string;
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tableAppl, setTableAppl] = useState<TableAppl[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationPage, setPaginationPage] = useState(1);
  const [filterTeacher, setFilterTeacher] = useState("");
  const [filterEngineer, setFilterEngineer] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [popUpAddApp, setPopUpAddApp] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5050/getApplications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        params: {
          page: paginationPage,
          pageSize: 6,
          nameTeacher: filterTeacher,
          engineerID: filterEngineer,
          orderDate: filterDate,
          status: filterStatus,
        },
      })
      .then((response) => {
        setTableAppl(response.data.applications);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.log("Ошибка выполнения запроса: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filterTeacher, filterDate, filterEngineer, filterStatus, paginationPage]);

  const [engineers, setEngineers] = useState<Engineer[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5050/getEngineers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        setEngineers(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Bg>
      <Modal
        open={popUpAddApp}
        onClose={() => setPopUpAddApp(false)}
        closeAfterTransition
        disableEnforceFocus
        className="flex justify-center items-center"
      >
        <PopUpAddApp
          setPopUp={setPopUpAddApp}
          title="Добавить заявку"
          strokeTable={tableAppl}
          setStrokeTable={setTableAppl}
          engineers={engineers}
        />
      </Modal>
      <div className="flex flex-col  w-full">
        <Filter
          setFilterDate={setFilterDate}
          setFilterEngineer={setFilterEngineer}
          setFilterStatus={setFilterStatus}
          setFilterTeacher={setFilterTeacher}
          engineers={engineers}
        />
      </div>

      <div className="text-[14px] h-screen w-full flex flex-col 2xl:items-center p-[20px] text-center">
        <div>
          <Button
            text="Добавить заявку"
            className=" px-[30px] mb-[20px] flex text-[14px]"
            onClick={() => setPopUpAddApp(true)}
          />
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
                  endDate={items.EndDate}
                  tableAppl={tableAppl}
                  setTableAppl={setTableAppl}
                  engineers={engineers}
                />
              ))
            )}
          </table>
        </div>

        {/* 🔹 Блок пагинации */}
        <div className="flex bg-white fixed bottom-0 right-0 justify-center m-5 p-2 gap-2 w-auto border rounded-lg">
          <button
            onClick={() => setPaginationPage((prev) => Math.max(prev - 1, 1))}
            disabled={paginationPage === 1}
            className={`p-2 ${paginationPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Image src={PathStart} alt="Назад" />
          </button>
          <span className="py-2 px-4">Страница {paginationPage} из {totalPages}</span>
          <button
            onClick={() => setPaginationPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={paginationPage === totalPages}
            className={`p-2 ${paginationPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Image src={PathEnd} alt="Вперед" />
          </button>
        </div>
      </div>
    </Bg>
  );
}
