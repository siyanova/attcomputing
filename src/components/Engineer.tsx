"use client";

import Image from "next/image";
import ImageEngeneer from "../../public/ImageEngeneer2.png";
import { Modal } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { PopUpBg } from "./PopUpBg";
import Button from "./Button";
import axios from "axios";
import PopUpUpdateEngineer from "./PopUpUpdateEngineer";

type Engineer = {
  ID: string;
  Name: string;
  Email: string;
  TelegramID: string;
};

type Props = {
  id: string;
  name: string;
  email: string;
  telegramId: string;
  engineers: Engineer[];
  setEngineers: Dispatch<SetStateAction<Engineer[]>>;
};

const Engeneer = ({ id, name, email, telegramId, setEngineers }: Props) => {
  const [openPopUpDelete, setOpenPopUpDelete] = useState(false);
  const [openPopUpUpdate, setOpenPopUpUpdape] = useState(false);

  const lastEngineer: Engineer = {
    ID: id,
    Name: name,
    Email: email,
    TelegramID: telegramId,
  };

  const handleDeleteEngineer = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/deleteEngineer?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setEngineers((prevEngineers) =>
          prevEngineers.filter((engineer) => engineer.ID !== id)
        );
        setOpenPopUpDelete(false);
      } else {
        throw new Error("Ошибка при удалении инженера");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  return (
    <div className="bg-white pb-5 text-[16px] gap-3 text-center items-center flex flex-col border rounded-lg">
      <Modal
        open={openPopUpDelete}
        onClose={() => setOpenPopUpDelete(false)}
        closeAfterTransition
        className="flex justify-center items-center"
      >
        <PopUpBg>
          <button
            className="absolute right-[20px] top-[20px]"
            onClick={() => setOpenPopUpDelete(false)}
            tabIndex={0}
          >
            <Image src={"/Close.svg"} alt="close" width={20} height={20} />
          </button>
          <h2 className="mb-4 lg:mb-8 mx-auto text-base lg:text-2xl lg:leading-[28px] font-semibold text-center">
            Вы уверены что хотите удалить инженера {name}?
          </h2>
          <Button text="Удалить" onClick={() => handleDeleteEngineer()} />
        </PopUpBg>
      </Modal>
      <Modal
        open={openPopUpUpdate}
        onClose={() => setOpenPopUpUpdape(false)}
        closeAfterTransition
        className="flex justify-center items-center"
      >
        <PopUpUpdateEngineer
          setPopUp={setOpenPopUpUpdape}
          title="Изменить инженера"
          setEngineers={setEngineers}
          lastEngineer={lastEngineer}
        />
      </Modal>
      <Image className="rounded-t-lg" src={ImageEngeneer} alt="Engeneer" />
      <div className="flex gap-2 justify-between w-full px-5">
        <button onClick={() => setOpenPopUpDelete(true)}>
        <Image src={"/Delet.svg"} alt="Delete" width={20} height={20} className="fill-black"/>
        </button>
        <button onClick={() => setOpenPopUpUpdape(true)}>
          <Image src={"/EditBlack.svg"} alt="Edit" width={20} height={20} />
        </button>
      </div>
      <p className="font-bold px-5">{name}</p>
      <div className="flex text-[14px] px-5 justify-center gap-2 flex-row text-[14px] opacity-60">
        <Image src={"/message.svg"} width={14} height={14} alt="message" />
        <p className="text-[14px] opacity-60">{email}</p>
      </div>
      <div className="flex text-[14px] justify-center gap-2 flex-row text-[14px] opacity-60">
        <p>Tg:</p>
        <p>{telegramId}</p>
      </div>
    </div>
  );
};

export default Engeneer;
