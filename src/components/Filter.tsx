import Image from "next/image";
import filter from "../../public/filter.svg";
import path from "../../public/Path.svg";
import replay from "../../public/ic-replay-24px.svg";
export const Filter = () => {
  return (
    <div className="static p-[20px] gap-24 top-0 right-0 items-end flex w-full bg-[#F5F6FA]">
      <div>
        <h1 className="text-[32px] text-[#013970] font-bold mt-[25px]">
          Список Заявок
        </h1>
        <table className="mt-[32px] table-auto bg-white border-collapse  rounded-lg">
          <td className="rounded-full p-[23px]">
            <Image
              src={filter}
              alt="filter"
              className="h-[22px] w-[19px] my-auto"
            />
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
              <Image src={replay} alt="replay" className="w-[18px] h-[18px]" />
              <p className="break-words max-w-[95px] text-[#EA0234]">
                Сбросить фильтры
              </p>
            </button>
          </td>
        </table>
      </div>
      <div className="border rounded-lg text-white text-[12px] ml-auto bg-[#4880FF] px-[30px] py-[10px]">
        <button>Добавить заявку</button>
      </div>
    </div>
  );
};
