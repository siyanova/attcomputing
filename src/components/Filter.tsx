import Image from "next/image";
import filter from "../../public/filter.svg";
import path from "../../public/Path.svg";
import replay from "../../public/ic-replay-24px.svg";
export const Filter = () => {
  return (
    <div className="p-[20px] gap-24 items-end flex w-full bg-[#F5F6FA]">
      <div className="w-full">
        <h1 className="text-[32px] text-[#013970] font-bold mt-[25px]">
          Список Заявок
        </h1>
        <table className="mt-[32px] table-fixed text-[14px] bg-white border-collapse  rounded-lg">
          <tbody>
            <tr>
              <td className="rounded-full py-[10px] px-[23px]">
                <Image
                  src={filter}
                  alt="filter"
                  className="h-[19px] w-[19px] "
                />
              </td>
              <td>
                <p className="px-[23px] py-[10px]">Дата</p>
              </td>
              <td>
                <button className="flex px-[23px] py-[10px] items-center gap-[6px]">
                  <p>Преподаватель</p>
                  <Image src={path} alt="path" />
                </button>
              </td>
              <td>
                <button className="flex px-[23px] py-[10px] items-center gap-[6px]">
                  <p>Статус заявки</p>
                  <Image src={path} alt="path" />
                </button>
              </td>
              <td>
                <button className="flex px-[23px] py-[10px] items-center gap-[6px]">
                  <Image
                    src={replay}
                    alt="replay"
                    className="w-[18px] h-[18px]"
                  />
                  <p className="break-words max-w-[95px] text-[#EA0234]">
                    Сбросить фильтры
                  </p>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="border rounded-lg text-white text-[14px] ml-auto bg-[#4880FF] px-[30px] py-[10px]">
        Добавить заявку
      </button>
    </div>
  );
};
