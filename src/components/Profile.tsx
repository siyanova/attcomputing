import profile from "../../public/profile.svg";
import Image from "next/image";
export const Profile = () => {
  return (
    <div className="p-[20px] bg-[#F5F6FA] pr-14 w-full">
      <div className="flex flex-row items-start  justify-end gap-[20px]">
        <Image src={profile} alt="profile" />
        <div className="flex flex-col">
          <p className="text-[14px]">Краснова И. А.</p>
          <p className="text-[14px] text-[#565656]">Админ</p>
        </div>
      </div>
    </div>
  );
};
