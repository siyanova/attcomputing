import { Dispatch, SetStateAction } from "react";
import { PopUpBg } from "./PopUpBg";
import Image from "next/image";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { engineerFromSchema } from "./schemas/engineer";
import axios from "axios";

type Engineer = {
  ID: string;
  Name: string;
  Email: string;
};

type Props = {
  setPopUp: (value: SetStateAction<boolean>) => void;
  title: string;
  engineers: Engineer[];
  setEngineers: Dispatch<SetStateAction<Engineer[]>>;
};

type EngineerRequest = {
  name: string;
  email: string;
};

const PopUpAddEngineer = ({
  setPopUp,
  title,
  engineers,
  setEngineers,
}: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EngineerRequest>({
    resolver: zodResolver(engineerFromSchema),
  });

  const handleAddEngineer = async (formData: EngineerRequest) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/addEngineer`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const lastId = engineers.length > 0 ? Math.max(...engineers.map(e => parseInt(e.ID))) : 0;

        const newEngineer: Engineer = {
          ID: (lastId + 1).toString(),
          Name: formData.name,
          Email: formData.email,
        };
  
        setEngineers((engineer) => [...engineer, newEngineer]);
        setPopUp(false);
      } else {
        throw new Error("Ошибка при добавлении инженера");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <PopUpBg>
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
        onSubmit={handleSubmit(handleAddEngineer)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <p className="text-[18px]">Name :</p>
          <input
            {...register("name")}
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Ivan"
          />
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[18px]">Email :</p>
          <input
            {...register("email")}
            type="text"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="esteban_schiller@att.ru"
          />
          <p className="text-sm text-red-500">{errors.email?.message}</p>
        </div>
        <Button text="Добавить" />
      </form>
    </PopUpBg>
  );
};
export default PopUpAddEngineer;
