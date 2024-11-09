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
    <div className="flex w-full h-screen">
          <Header />
          {children}
    </div>
  );
};

export default Bg;
