import Image from "next/image";
import filter from "../../public/filter.svg";
import path from "../../public/Path.svg";
import replay from "../../public/ic-replay-24px.svg";
export const Filter = () => {
  return (
    <div className="p-[20px] pr-14 w-full bg-[#F5F6FA]">
      <h1 className="text-[32px] text-[#013970] font-bold mt-[25px]">
        Список Заявок
      </h1>
      <table className="mt-[32px] border border-collapse font-bold text-center gap-2 text-[14px] ">
        <td className="rounded-lg p-[23px]">
          <Image src={filter} alt="filter" className="my-auto" />
        </td>
        <td>
          <p className="p-[23px]">Фильтр по</p>
        </td>
        <td>
          <p className="p-[23px]">Дата</p>
        </td>
        <td>
          <button className="flex p-[23px] items-center gap-[6px]">
            <p>Преподаватель</p>
            <Image src={path} alt="path" />
          </button>
        </td>
        <td>
          <button className="flex p-[23px] items-center gap-[6px]">
            <p>Статус заявки</p>
            <Image src={path} alt="path" />
          </button>
        </td>
        <td>
          <button className="flex p-[23px] items-center gap-[6px]">
            <Image src={replay} alt="replay" className="w-[18px] h-[12px]" />
            <p className="break-words max-w-[95px]">Статус заявки</p>
          </button>
        </td>
      </table>
    </div>
  );
};
