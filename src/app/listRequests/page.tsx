import Bg from "@/components/BG";
import { Filter } from "@/components/Filter";
import { TableAppl } from "@/components/TableAppl";
export default function listRequests () {
  return (
    <Bg>
      <div className="flex flex-col w-full">
        <Filter  />
        <TableAppl />
      </div>
      </Bg>
  );
};
