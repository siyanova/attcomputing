import Image from "next/image";
import ImageEngeneer from "../../public/ImageEngeneer2.png";
import Message from "../../public/message.svg";
import EditBlack from "../../public/EditBlack.svg";
import DeleteBlack from "../../public/DeleteBlack.svg";
export const Engeneer = () => {
  return (
    <div className="p-[20px] h-full  bg-[#F5F6FA] w-[1330px] ">
      <div className="flex items-end ">
        <h1 className="text-[32px] text-[#013970] font-bold mt-[25px]">
          Инженеры
        </h1>
        <button className="border rounded-lg text-white text-[14px] ml-auto bg-[#4880FF] px-[30px] py-[10px]">
          Добавить инженера
        </button>
      </div>
      <div className="flex flex-wrap gap-[30px] justify-between">
        <div className=" bg-white pb-[20px]  mt-[29px] text-[16px] text-center border rounded-lg w-[360px]">
          <Image className="rounded-t-lg" src={ImageEngeneer} alt="Engeneer" />
          <div className="relative">
            <div className="flex flex-row absolute right-0 pr-3 gap-2 ">
              <button>
                <Image
                  src={EditBlack}
                  alt="Edit"
                  className="h-[20px] w-[20px]"
                />
              </button>
              <button>
                <Image
                  src={DeleteBlack}
                  alt="Delete"
                  className="h-[20px] w-[20px]"
                />
              </button>
            </div>
            <p className="font-bold mt-[16px]">Jason Price</p>
          </div>
          <p className="mt-[5px] text-[14px] opacity-60">
            kuhlman.jermey@yahoo.com
          </p>
          <div className="flex text-[14px] justify-center mt-[30px] flex-row">
            <Image src={Message} alt="message" />
            <p>Tg:</p>
            <p>jermey</p>
          </div>
        </div>
        <div className="bg-white pb-[20px]  mt-[29px] text-[16px] text-center border rounded-lg w-[360px]">
          <Image className="rounded-t-lg" src={ImageEngeneer} alt="Engeneer" />
          <p className="font-bold mt-[16px]">Jason Price</p>
          <p className="mt-[5px] text-[14px] opacity-60">
            kuhlman.jermey@yahoo.com
          </p>
          <div className="flex text-[14px] justify-center mt-[30px] flex-row">
            <Image src={Message} alt="message" />
            <p>Tg:</p>
            <p>jermey</p>
          </div>
        </div>
        <div className="bg-white pb-[20px]  mt-[29px] text-[16px] text-center border rounded-lg w-[360px]">
          <Image className="rounded-t-lg" src={ImageEngeneer} alt="Engeneer" />
          <p className="font-bold mt-[16px]">Jason Price</p>
          <p className="mt-[5px] text-[14px] opacity-60">
            kuhlman.jermey@yahoo.com
          </p>
          <div className="flex text-[14px] justify-center mt-[30px] flex-row">
            <Image src={Message} alt="message" />
            <p>Tg:</p>
            <p>jermey</p>
          </div>
        </div>
        <div className="bg-white pb-[20px]  mt-[29px] text-[16px] text-center border rounded-lg w-[360px]">
          <Image className="rounded-t-lg" src={ImageEngeneer} alt="Engeneer" />
          <p className="font-bold mt-[16px]">Jason Price</p>
          <p className="mt-[5px] text-[14px] opacity-60">
            kuhlman.jermey@yahoo.com
          </p>
          <div className="flex text-[14px] justify-center mt-[30px] flex-row">
            <Image src={Message} alt="message" />
            <p>Tg:</p>
            <p>jermey</p>
          </div>
        </div>
      </div>
    </div>
  );
};
