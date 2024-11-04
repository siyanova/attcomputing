export const TableAppl = () => {
  return (
    <div className="text-[14px] bg-[#F5F6FA] p-[30px] text-center">
      <table className="table-auto bg-white border border-collapse  rounded-lg">
        <thead className="font-bold border-b bg-[#D5D5D5] bg-opacity-10">
          <th className="w-[80px] py-[15px] px-[15px]">ID</th>
          <th className="w-[100px] py-[15px] px-[80px]">НАИМЕНОВАНИЕ</th>
          <th className="w-[90px] py-[15px] px-[50px]">ПРЕПОДАВАТЕЛЬ</th>
          <th className="w-[90px] py-[15px] px-[50px]">ДАТА</th>
          <th className="w-[130px] py-[15px] px-[80px]">ИНЖЕНЕР</th>
          <th className="w-[130px] py-[15px] px-[50px]">СТАТУС</th>
        </thead>
        <tbody>
          <tr className="items-center border-b ">
            <td className=" py-[15px] px-[15px]">
              <div className="pl-[10px]">00001</div>
            </td>
            <td>
              <p className="p-4 max-w-[200px] mx-auto break-words">
                sdfgksdjfgjsУстановка
                кывплавзопзовашпоыватмотваыоомпаsadjfkjasldjflasjdс
              </p>
            </td>
            <td>
              <p className="p-4 max-w-[200px] mx-auto break-words">
                dfjgsl;dfgjsdifgjfgskdflgjdfПобединцев
              </p>
            </td>
            <td>
              <p className="p-4 max-w-[200px] mx-auto break-words">
                04 Сен 2024
              </p>
            </td>
            <td>
              <p className="p-4 max-w-[200px] mx-auto break-words">Голубов</p>
            </td>
            <td>
              <div className="text-[#00B69B] bg-[#00B69B] bg-opacity-20  text-[12px] rounded-md my-[24px] font-bold mx-[50px] px-4 py-2">
                Выполнено
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
