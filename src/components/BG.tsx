"use client";

import { PropsWithChildren, useEffect } from "react";
import { Header } from "./Header";
import { useRouter } from "next/navigation";

const Bg = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      router.push("/authorization");
    }
  }, [router]);
  return (
    <div className="flex w-full h-full">
      <Header />
      <div className="bg-[#F5F6FA] w-full">{children}</div>
    </div>
  );
};

export default Bg;
