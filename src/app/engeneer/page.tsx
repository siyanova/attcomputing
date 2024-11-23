"use client";

import Bg from "@/components/BG";
import Button from "@/components/Button";
import Engineer from "@/components/Engineer";
import PopUpAddEngineer from "@/components/PopUpAddEngineer";
import { Modal } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

type Engineer = {
  ID: string;
  Name: string;
  Email: string;
  TelegramID: string;
};

export default function EngeneersPage() {
  const [loading, setLoading] = useState(false);
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [popUpAddEngineer, setPopUpAddEngineer] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5050/getEngineers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        console.log("Данные:", response.data);
        setEngineers(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при выполнении запроса:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);

  return (
    <Bg>
      <div className="p-[20px] h-full 2xl:mx-auto bg-[#F5F6FA] w-[1330px] ">
        <Modal
          open={popUpAddEngineer}
          onClose={() => setPopUpAddEngineer(false)}
          closeAfterTransition
          disableEnforceFocus
          className="flex justify-center items-center"
        >
          <PopUpAddEngineer
            setPopUp={setPopUpAddEngineer}
            title="Добавить инженера"
            engineers={engineers}
            setEngineers={setEngineers}
          />
        </Modal>
        <div className="flex justify-between items-center">
          <h1 className="text-[32px] text-[#013970] font-bold">Инженеры</h1>
          <Button
            text="Добавить инженера"
            onClick={() => setPopUpAddEngineer(true)}
          />
        </div>
        <div className="grid grid-cols-3 gap-[30px]  mt-10">
          {loading || !engineers ? (
            <>
              <div className="bg-white w-full h-[131px] border rounded-lg "></div>
              <div className="bg-white w-full h-[131px] border rounded-lg"></div>
              <div className="bg-white w-full h-[131px] border rounded-lg "></div>
            </>
          ) : (
            engineers.map((items, index) => (
              <Engineer
                key={index}
                id={items.ID}
                name={items.Name}
                email={items.Email}
                telegramId={items.TelegramID}
                engineers={engineers}
                setEngineers={setEngineers}
              />
            ))
          )}
        </div>
      </div>
    </Bg>
  );
}
