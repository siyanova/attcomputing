'use client'

import Bg from "@/components/BG";
import Button from "@/components/Button";
import Engeneer from "@/components/Engineer";
import { useEffect, useState } from "react";

type Engineer = {
    id: string
    name: string
    email: string
    telegramID: string
}

export default function EngeneersPage() {
    const [loading, setLoading] = useState(false);
    const [engineers, setEngineers] = useState<Engineer[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await fetch("http://localhost:5050/getEngineers", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message || "Ошибка авторизации");
            }
            
            const responseData: Engineer[] = await response.json();
            setEngineers(responseData);
      
      
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
      }, []);
      
  return (
    <Bg>
      <div className="p-[20px] h-full  bg-[#F5F6FA] w-[1330px] ">
        <div className="flex justify-between items-center">
          <h1 className="text-[32px] text-[#013970] font-bold">Инженеры</h1>
          <Button text="Добавить инженера" />
        </div>
              <div className="grid grid-cols-3 gap-[30px] justify-between mt-10">
                  {engineers.map((items, index) => <Engeneer key={index}/>)}
        </div>
      </div>
    </Bg>
  );
}
