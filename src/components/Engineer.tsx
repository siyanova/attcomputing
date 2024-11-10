import Image from "next/image";
import ImageEngeneer from "../../public/ImageEngeneer2.png";
import Message from "../../public/message.svg";
import EditBlack from "../../public/EditBlack.svg";
import DeleteBlack from "../../public/DeleteBlack.svg";

type Props = {
  name: string;
  email: string;
  telegramId: string;
};

const Engeneer = ({ name, email, telegramId }: Props) => {
  return (
    <div className="bg-white pb-5 text-[16px] gap-3 text-center items-center flex flex-col border rounded-lg">
      <Image className="rounded-t-lg" src={ImageEngeneer} alt="Engeneer" />
      <p className="font-bold">{name}</p>
      <p className="text-[14px] opacity-60">{email}</p>
      <div className="flex text-[14px] justify-center gap-2 flex-row text-[14px] opacity-60">
        <Image src={Message} alt="message" />
        <p>Tg:</p>
        <p>{telegramId}</p>
      </div>
      <div className="flex gap-2 justify-between w-full px-5">
        <button>
          <Image src={DeleteBlack} alt="Delete" className="h-[20px] w-[20px]" />
        </button>
        <button>
          <Image src={EditBlack} alt="Edit" className="h-[20px] w-[20px]" />
        </button>
      </div>
    </div>
  );
};

export default Engeneer;
