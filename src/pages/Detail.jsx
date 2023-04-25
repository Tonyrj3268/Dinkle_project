import React, { useEffect } from "react";
import axios from "axios";
import { LineChart } from "../components";
import { useStateContext } from ".././contexts/ContextProvider";
import Tr from "../components/Tr";
const Detail = () => {
  const { activeMenu, lineData, setLineData, setTest,test } = useStateContext();
  const MINUTE_MS = 3000;
  var data=[]

  useEffect(() => {
    const interval = setInterval(() => {
      setTest((prev) => prev + 1);
      // console.log("Logs every minute");
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [test]);

  return (
    <div>
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl ">
        <div className=" mb-10">
          <div>
            <p className="text-3xl font-extrabold tracking-tight dark:text-gray-200 text-slate-900">
              {test}
            </p>
          </div>
        </div>

        <div className=" flex px-10 items-center gap-5 w-full">
          {lineData.length < 6 ? (
            <div>
              {activeMenu ? (
                <div className=" w-[350px] h-[350px] p-4 bg-red-600 rounded-2xl text-white">
                  <div className="flex flex-col gap-4">
                    <p className=" text-2xl mt-2 font-extrabold tracking-tight">
                      選擇需要查看的Detail
                    </p>
                    <p className=" text-normal mt-2 font-extrabold tracking-tight">
                      點擊右側選單即可查看即時Detail狀況
                    </p>
                  </div>
                </div>
              ) : (
                <div className=" w-[580px] h-[350px] p-4  bg-red-600 rounded-2xl text-white">
                  <div className="flex flex-col gap-4">
                    <p className=" text-2xl mt-2 font-extrabold tracking-tight">
                      選擇需要查看的Detail
                    </p>
                    <p className=" text-normal mt-2 font-extrabold tracking-tight">
                      點擊即可查看即時Detail狀況
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-[70%]">
              {activeMenu ? (
                <LineChart
                  height={"350px"}
                  width={"100%"}
                  bg={"#33373E"}
                  type={"Detail"}
                />
              ) : (
                <LineChart
                  height={"350px"}
                  width={"100%"}
                  bg={"#33373E"}
                  type={"Detail"}
                />
              )}
            </div>
          )}

          <div className=" dark:text-gray-200 bg-white h-[352px]  lg:w-[30%] p-5   bg-center overflow-y-auto">
            <div className=" flex py-4 items-center justify-center gap-2 text-sm bg-black  p-3">
              <p className=" font-bold  ">名稱 </p>
              <p className=" font-bold ">合格範圍</p>
              <p className="font-bold ">預測範圍 </p>
              <p className="font-bold ">目前狀態</p>
            </div>
            {data.map((d, id) => (
              <Tr key={id} props={d}></Tr>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
