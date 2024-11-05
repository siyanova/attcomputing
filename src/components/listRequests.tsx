import { Filter } from "./Filter";
import { Header } from "./Header";
import { TableAppl } from "./TableAppl";
export const listRequests = () => {
  return (
    <div className="flex w-full ">
      <Header />
      <div className="flex flex-col w-full">
        <Filter />
        <TableAppl />
      </div>
    </div>
  );
};
