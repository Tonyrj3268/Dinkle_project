import React, { useState, useEffect } from "react";
import { Header } from "../components";

const Cause = () => {
  const [inputFixTimeValue, setInputFixTimeValue] = useState("預測成本統計");
  var data = [
    {
      date1: "7/21 下午1:33",
      time1: "規格示警:7",
      cause: "原因：預測規格異常",
      time2: "累積次數:8",
      date2: "7/24 下午1:33",
      result: "回報維修中",
    },
    {
      date1: "7/21 下午1:33",
      time1: "規格示警:3,11",
      cause: "原因：預測規格異常",
      time2: "累積次數:2",
      date2: "7/24 下午1:33",
      result: "不採取維修",
    },
    {
      date1: "7/21 下午1:33",
      time1: "規格示警:6",
      cause: "原因：預測規格異常",
      time2: "累積次數:7",
      date2: "7/24 下午1:33",
      result: "停機維修完成",
    },
  ];
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl space-y-5">
      <div className="">
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          不良品原因分析
        </p>
      </div>
      <select
        value={inputFixTimeValue}
        onChange={(e) => {
          setInputFixTimeValue(e.target.value);
        }}
        className=" border-1 w-full text-center h-10 rounded-full bg-white font-semibold p-2"
        placeholder="不良品比數1"
      >
        <option value="不良品比數1">不良品比數1</option>
        <option value="不良品比數2">不良品比數2</option>
        <option value="不良品比數3">不良品比數3</option>
      </select>
      <div className=" w-full h-full flex flex-col gap-4 font-semibold text-white">
        {data.map((d, i) => (
          <div className=" flex flex-row space-x-5 text-white p-2 border-1 bg-white rounded-2xl ">
            <div className="flex flex-col p-4 w-1/3 rounded-2xl border-1  gap-4 bg-red-600">
              <p>重點Detail</p>
              <p>合格範圍:6.15~7.15</p>
              <p>預測範圍:6.22~7.35</p>
            </div>
            <div className="flex flex-col p-4 w-2/3 rounded-2xl border-1  gap-4 bg-red-600">
              <p className="text-2xl font-bold text-center items-center">
                SHAP分析結果
              </p>
              <div className="flex flex-col">
                <div className=" flex items-center justify-center gap-2">
                  <p className="text-base font-bold  ">重點期數 </p>
                  <p className="text-base font-bold ">轉速</p>
                  <p className="text-base font-bold ">沖壓次數 </p>
                  <p className="text-base font-bold ">狀態</p>
                </div>
                <div className=" flex items-center justify-center gap-8">
                  <p className="text-base font-bold  ">0 </p>
                  <p className="text-base font-bold ">281</p>
                  <p className="text-base font-bold ">6.2 </p>
                  <p className="text-base font-bold ">2</p>
                </div>
                <div className=" flex items-center justify-center gap-8">
                  <p className="text-base font-bold  ">22 </p>
                  <p className="text-base font-bold ">297</p>
                  <p className="text-base font-bold ">3.3 </p>
                  <p className="text-base font-bold ">2</p>
                </div>
                <div className=" flex items-center justify-center gap-8">
                  <p className="text-base font-bold  ">99 </p>
                  <p className="text-base font-bold ">332</p>
                  <p className="text-base font-bold ">4.5 </p>
                  <p className="text-base font-bold ">2</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cause;
