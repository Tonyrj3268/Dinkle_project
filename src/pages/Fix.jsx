import React from "react";

import { employeesData } from "../data/dummy";
import { Header } from "../components";
import FixData from "../components/FixData";
import { useStateContext } from "../contexts/ContextProvider";
const Fix = () => {
  const { repairData, setRepairData } = useStateContext();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="維修項目" />
      <div className=" w-full h-full flex flex-col gap-4 font-semibold text-white">
        {repairData.map((d, i) => (
          <FixData props={d} key={i}></FixData>
        ))}
        <div className="p-4 flex justify-center gap-4 ">
          <button className="flex justify-center items-center w-8 h-8  ">
            <img
              src="https://cdn4.iconfinder.com/data/icons/geomicons/32/672373-chevron-left-512.png"
              className="w-6 h-6 to-gray-800 stroke-current hover:text-indigo-600"
            />
          </button>
          <button className="flex justify-center items-center w-8 h-8">
            <img
              src="https://cdn4.iconfinder.com/data/icons/geomicons/32/672374-chevron-right-512.png"
              className="w-6 h-6 to-gray-800 stroke-current hover:text-indigo-600"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Fix;
