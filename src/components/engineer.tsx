import profile from "../../public/profile.svg";
import Image from "next/image";
import filter from "../../public/filter.svg";
import path from "../../public/Path.svg";
import replay from "../../public/ic-replay-24px.svg";
export const Engineer = () => {
  return (
    <div className="p-[20px] bg-[#F5F6FA] pr-14 w-full">
      <div className="flex flex-row items-start  justify-end gap-[20px]">
        <Image src={profile} alt="profile" />
        <div className="flex flex-col">
          <p className="text-[14px]">Краснова И. А.</p>
          <p className="text-[14px] text-[#565656]">Админ</p>
        </div>
      </div>
      <h1 className="text-[32px] text-[#013970] font-bold mt-[25px]">
        Список Заявок
      </h1>
      <table className=" border border-collapse border-slate-500 items-center gap-2 text-[14px] auto-cols-max">
        <td className="border border-slate-600 p-[20px]">
          <Image src={filter} alt="filter" className="items-center w-[20px] h-[23px]"/>
        </td>
        <td className="border border-slate-600 p-[20px]">Фильтр по</td>
        <td className="border border-slate-600 p-[20px]">
          <p>Дата</p>
        </td>
        <td className="border border-slate-600 p-[20px]">
          <button className="flex items-center">
            <p>Преподаватель</p>
            <Image src={path} alt="path" />
          </button>
        </td>
        <td className="border border-slate-600 p-[20px]">
          <button className="flex items-center">
            <p>Статус заявки</p>
            <Image src={path} alt="path" />
          </button>
        </td>
        <td className="border border-slate-600 p-[20px]">
          <button className="flex items-center">
            <Image src={replay} alt="replay" />
            <p className="text-[#EA0234]">Сбросить фильтры</p>
          </button>
        </td>
      </table>
    </div>
  );
};
