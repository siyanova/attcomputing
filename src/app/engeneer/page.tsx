"use client";

import Bg from "@/components/BG";
import Button from "@/components/Button";
import Engeneer from "@/components/Engineer";
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
  }, []);
  console.log(loading);
  return (
    <Bg>
      <div className="p-[20px] h-full  bg-[#F5F6FA] w-[1330px] ">
        <div className="flex justify-between items-center">
          <h1 className="text-[32px] text-[#013970] font-bold">Инженеры</h1>
          <Button text="Добавить инженера" />
        </div>
        <div className="grid grid-cols-3 gap-[30px] justify-between mt-10">
          {engineers.map((items, index) => (
            <Engeneer
              key={index}
              name={items.Name}
              email={items.Email}
              telegramId={items.TelegramID}
            />
          ))}
        </div>
      </div>
    </Bg>
  );
}
