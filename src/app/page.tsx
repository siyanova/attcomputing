import { Header } from "@/components/Header";
import { Filter } from "@/components/Filter";
import { Profile } from "@/components/profile";
import { TableAppl } from "@/components/TableAppl";
export default function Home() {
  return (
    <div className="flex w-full ">
      <Header />
      <div className="flex flex-col w-full">
        <Profile />
        <Filter />
        <TableAppl/>
      </div>
    </div>
  );
}
