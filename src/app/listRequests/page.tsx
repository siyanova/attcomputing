import { Filter } from "@/components/Filter";
import { Header } from "@/components/Header";
import { TableAppl } from "@/components/TableAppl";
export default function listRequests () {
  return (
    <div className="flex w-full ">
      <Header />
      <div className="flex flex-col right-0 absolute ">
        <Filter  />
        <TableAppl />
      </div>
    </div>
  );
};
