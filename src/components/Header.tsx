import Image from "next/image";
import logo from "../../public/logo.png";
import engeneer from "../../public/engeneer.svg";
import list from "../../public/list.svg";
import swich from "../../public/switch.svg";
import Link from "next/link";
export const Header = () => {
  return (
    <div className="flex h-screen w-2/12 flex-col  ">
      <Image
        className=" mt-[32px] w-[160px] h-[130px] mx-auto"
        src={logo}
        alt="logo"
      />
      <div className="mt-[57px] flex gap-[20px] flex-col">
        <button className="flex flex-row items-center pl-[40px] gap-[16px] py-[15px] w-full">
          <Image src={engeneer} alt="eng" />
          <p className="text-[14px]">Инженеры</p>
        </button>
        <button className="flex flex-row items-center pl-[40px] gap-[16px] py-[15px] w-full">
          <Image src={list} alt="list" />
          <p className="text-[14px]">Список заявок</p>
        </button>
        <div className="h-full border border-gray-200"></div>
        <Link href="/authorization">
          <div  className="flex flex-row items-center  pl-[40px] gap-[16px] py-[15px] w-full">
            <Image src={swich} alt="of" />
            <p className="text-[14px]">Выйти</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
