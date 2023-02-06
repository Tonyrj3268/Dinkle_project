import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { employeesData } from "../data/dummy";
const FixDetail = (props) => {
  const [inputFixItemValue, setInputFixItemValue] = useState("");
  const [inputStatusValue, setInputStatusValue] = useState("");
  const [inputFixTimeValue, setInputFixTimeValue] = useState("");
  const [inputOtherValue, setInputOtherValue] = useState("");
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className=" w-full h-full flex flex-col gap-4 font-semibold items-center">
        <div className="mb-3 border-b-2 p-3 border-black">
          <p className="text-3xl font-extrabold tracking-tight text-slate-900">
            維修資訊
          </p>
        </div>
        <input
          placeholder={"起始時間:" + data.date1}
          className=" border-1 w-1/2 "
          disabled
        />
        <input
          placeholder={"維修原因:" + data.cause}
          className=" border-1 w-1/2 "
          disabled
        />
        <input
          disabled
          placeholder={"起始時間:" + data.date1}
          className=" border-1 w-1/2 "
        />
        <select
          value={inputStatusValue}
          onChange={(e) => {
            setInputStatusValue(e.target.value);
          }}
          className=" border-1 w-1/2 "
        >
          <option value="待維修">狀態：待維修</option>
          <option value="維修完成">狀態：維修完成</option>
          <option value="不維修">狀態：不採取維修</option>
        </select>
        <input
          placeholder={"示警次數:" + data.time2}
          className=" border-1 w-1/2 "
          disabled
        />
        <input
          placeholder={"規格示警:" + data.time1}
          className=" border-1 w-1/2 "
          disabled
        />
        <div className=" border-b-2 p-3 border-black">
          <p className="text-2xl font-extrabold tracking-tight text-slate-900">
            維修項目
          </p>
        </div>
        <select
          value={inputFixItemValue}
          onChange={(e) => {
            setInputFixItemValue(e.target.value);
          }}
          className=" border-1 w-1/2 "
          placeholder="回報維修項目"
        >
          <option value="回報維修項目">回報維修項目</option>
          <option value="待維修">狀態：待維修</option>
          <option value="維修完成">狀態：維修完成</option>
          <option value="不維修">狀態：不採取維修</option>
        </select>
        <select
          value={inputFixTimeValue}
          onChange={(e) => {
            setInputFixTimeValue(e.target.value);
          }}
          className=" border-1 w-1/2 "
          placeholder="預計維修時間"
        >
          <option value="預計維修時間">預計維修時間</option>
          <option value="待維修">狀態：待維修</option>
          <option value="維修完成">狀態：維修完成</option>
          <option value="不維修">狀態：不採取維修</option>
        </select>
        <textarea
          value={inputOtherValue}
          onChange={(e) => {
            setInputOtherValue(e.target.value);
          }}
          className=" border-1 w-1/2 h-32 "
          placeholder="備註"
        ></textarea>
        <div className="flex px-4 justify-center gap-4">
          <button className="px-6 py-2 bg-black hover:bg-green-400 text-white rounded-full">
            確定
          </button>

          <Link to="/fix">
            <button className="px-6 py-2 bg-black hover:bg-red-600 text-white rounded-full">
              返回
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FixDetail;
