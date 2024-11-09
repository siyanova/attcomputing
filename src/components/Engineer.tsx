import Image from "next/image";
import ImageEngeneer from "../../public/ImageEngeneer2.png";
import Message from "../../public/message.svg";
import EditBlack from "../../public/EditBlack.svg";
import DeleteBlack from "../../public/DeleteBlack.svg";

const Engeneer = () => {
    return (
        <div className="bg-white pb-5 text-[16px] text-center items-center flex flex-col border rounded-lg">
            <Image
              className="rounded-t-lg"
              src={ImageEngeneer}
              alt="Engeneer"
            />
            <p className="font-bold mt-[16px]">Jason Price</p>
            <p className="mt-[5px] text-[14px] opacity-60">
              kuhlman.jermey@yahoo.com
            </p>
            <div className="flex text-[14px] justify-center mt-[30px] flex-row">
              <Image src={Message} alt="message" />
              <p>Tg:</p>
              <p>jermey</p>
            </div>
            <div className="flex gap-2 justify-between w-full px-5">
              <button>
                <Image
                  src={DeleteBlack}
                  alt="Delete"
                  className="h-[20px] w-[20px]"
                />
                          </button>
                          <button>
                <Image
                  src={EditBlack}
                  alt="Edit"
                  className="h-[20px] w-[20px]"
                />
              </button>
            </div>
          </div>
    )
}

export default Engeneer