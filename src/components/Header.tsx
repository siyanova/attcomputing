import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Header = () => {
  const router = useRouter();
  const checkTokenExpiration = () => {
    const tokenExpirationTime = localStorage.getItem("tokenExpirationTime");
    if (tokenExpirationTime && new Date() > new Date(tokenExpirationTime)) {
      localStorage.removeItem("jwtToken");
      router.push("/authorization");
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []); 
  const Exit = () => {
    localStorage.removeItem("jwtToken");
    router.push("/authorization");
  };
  return (
    <div className="flex h-screen bg-white min-w-[200px] flex-col  ">
      <Image
        className=" mt-[32px] w-[160px] h-[130px] mx-auto"
        src={logo}
        alt="logo"
      />
      <div className="mt-[57px] flex gap-[10px] flex-col">
        <Link
          href="/engeneer"
          className="flex flex-row items-center text-black hover:text-white hover:transition-colors duration-300 hover:bg-[#4880FF] hover:rounded-lg hover:p-[15px] hover:ml-6 hover:my-0 text-left my-[15px] ml-10"
        >
          <button className="flex flex-row items-center gap-[16px]">
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.91797 1.60547C4.86328 0.660156 5.99479 0.1875 7.3125 0.1875C8.63021 0.1875 9.76172 0.660156 10.707 1.60547C11.6523 2.55078 12.125 3.68229 12.125 5C12.125 5.80208 11.9245 6.5612 11.5234 7.27734C11.151 7.99349 10.6354 8.56641 9.97656 8.99609C11.237 9.54036 12.2539 10.3854 13.0273 11.5312C13.8008 12.6484 14.1875 13.9089 14.1875 15.3125H12.8125C12.8125 13.7943 12.2682 12.5052 11.1797 11.4453C10.1198 10.3568 8.83073 9.8125 7.3125 9.8125C5.79427 9.8125 4.49089 10.3568 3.40234 11.4453C2.34245 12.5052 1.8125 13.7943 1.8125 15.3125H0.4375C0.4375 13.9089 0.824219 12.6484 1.59766 11.5312C2.37109 10.3854 3.38802 9.54036 4.64844 8.99609C3.98958 8.56641 3.45964 7.99349 3.05859 7.27734C2.6862 6.5612 2.5 5.80208 2.5 5C2.5 3.68229 2.97266 2.55078 3.91797 1.60547ZM9.71875 2.59375C9.0599 1.90625 8.25781 1.5625 7.3125 1.5625C6.36719 1.5625 5.55078 1.90625 4.86328 2.59375C4.20443 3.2526 3.875 4.05469 3.875 5C3.875 5.94531 4.20443 6.76172 4.86328 7.44922C5.55078 8.10807 6.36719 8.4375 7.3125 8.4375C8.25781 8.4375 9.0599 8.10807 9.71875 7.44922C10.4062 6.76172 10.75 5.94531 10.75 5C10.75 4.05469 10.4062 3.2526 9.71875 2.59375Z" />
            </svg>
            <p className="text-[14px] text-left">Инженеры</p>
          </button>
        </Link>
        <Link
          href="/listRequests"
          className="flex flex-row items-center text-black hover:text-white hover:transition-colors duration-300 hover:bg-[#4880FF] hover:rounded-lg hover:p-[15px] hover:ml-6 hover:my-0 text-left my-[15px] ml-10  "
        >
          <button className="flex flex-row items-center gap-[16px]">
            <svg
              width="18"
              height="16"
              className="fill-current"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.04688 0.359375L6.07812 1.39062L3.32812 4.14062L2.8125 4.57031L2.29688 4.14062L0.921875 2.76562L1.95312 1.73438L2.8125 2.63672L5.04688 0.359375ZM8.3125 1.5625H17.25V2.9375H8.3125V1.5625ZM5.04688 5.85938L6.07812 6.89062L3.32812 9.64062L2.8125 10.0703L2.29688 9.64062L0.921875 8.26562L1.95312 7.23438L2.8125 8.13672L5.04688 5.85938ZM8.3125 7.0625H17.25V8.4375H8.3125V7.0625ZM5.04688 11.3594L6.07812 12.3906L3.32812 15.1406L2.8125 15.5703L2.29688 15.1406L0.921875 13.7656L1.95312 12.7344L2.8125 13.6367L5.04688 11.3594ZM8.3125 12.5625H17.25V13.9375H8.3125V12.5625Z" />
            </svg>
            <p className="text-[14px] text-left">
              Список <br></br>заявок
            </p>
          </button>
        </Link>
        <div className="h-full border border-gray-200"></div>
        <button
          className="flex flex-row items-center text-black hover:text-white hover:transition-colors duration-300 hover:bg-[#4880FF] hover:rounded-lg hover:p-[15px] hover:ml-6 hover:my-0 text-left my-[15px] ml-10 gap-[16px]"
          onClick={Exit}
        >
          <svg
            width="17"
            height="20"
            className="fill-current"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.64453 0.5H9.01953V8.75H7.64453V0.5ZM5.58203 0.972656V2.47656C4.35026 2.99219 3.34766 3.82292 2.57422 4.96875C1.82943 6.11458 1.45703 7.375 1.45703 8.75C1.45703 10.6406 2.13021 12.2591 3.47656 13.6055C4.82292 14.9518 6.44141 15.625 8.33203 15.625C10.2227 15.625 11.8411 14.9518 13.1875 13.6055C14.5339 12.2591 15.207 10.6406 15.207 8.75C15.207 7.375 14.8203 6.11458 14.0469 4.96875C13.3021 3.82292 12.3138 2.99219 11.082 2.47656V0.972656C12.7148 1.54557 14.0326 2.54818 15.0352 3.98047C16.0664 5.38411 16.582 6.97396 16.582 8.75C16.582 11.013 15.7656 12.9609 14.1328 14.5938C12.5286 16.1979 10.5951 17 8.33203 17C6.06901 17 4.12109 16.1979 2.48828 14.5938C0.884115 12.9609 0.0820312 11.013 0.0820312 8.75C0.0820312 6.97396 0.583333 5.38411 1.58594 3.98047C2.61719 2.54818 3.94922 1.54557 5.58203 0.972656Z" />
          </svg>
          <p className="text-[14px] text-left">Выйти</p>
        </button>
      </div>
    </div>
  );
};
