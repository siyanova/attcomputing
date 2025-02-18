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
  setEngineers: Dispatch<SetStateAction<Engineer[]>>;
  lastEngineer: Engineer;
};

type EngineerRequest = {
  name: string;
  email: string;
};

const PopUpUpdateEngineer = ({
  setPopUp,
  title,
  setEngineers,
  lastEngineer,
}: Props) => {
  const engineerDefault: EngineerRequest = {
    name: lastEngineer.Name,
    email: lastEngineer.Email,
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EngineerRequest>({
    resolver: zodResolver(engineerFromSchema),
    defaultValues: engineerDefault,
  });
  

  const handleUpdateEngineer = async (formData: EngineerRequest) => {
    const newEngineer: Engineer = {
      ID: lastEngineer.ID,
      Name: formData.name,
      Email: formData.email,
    };
    try {
      const response = await axios.put(
        `http://localhost:5050/updateEngineer`,
        newEngineer,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setEngineers((prevEngineers) =>
          prevEngineers.map((engineer) =>
            engineer.ID === newEngineer.ID ? newEngineer : engineer
          )
        );
        setPopUp(false);
      } else {
        throw new Error("Ошибка при обновление инженера");
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
        onSubmit={handleSubmit(handleUpdateEngineer)}
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
        <Button text="Обновить" />
      </form>
    </PopUpBg>
  );
};
export default PopUpUpdateEngineer;
