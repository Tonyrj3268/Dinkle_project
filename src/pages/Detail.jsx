import React, { useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";

import { ChartsHeader, LineChart } from "../components";
import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";
import { useStateContext } from ".././contexts/ContextProvider";
import Tr from "../components/Tr";
const Detail = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };
  const { activeMenu, lineData } = useStateContext();
  var data = [
    {
      Detail: "Detail1",
      CorrectRange: "3.1~3.75",
      RealRange: "2.2~3.3",
      Status: "不合格",
      lineChartData: [
        { x: new Date(2023, 0, 1, 0, 0, 0), y: 12 },
        { x: new Date(2023, 0, 1, 0, 0, 10), y: 25 },
        { x: new Date(2023, 0, 1, 0, 0, 20), y: 3 },
        { x: new Date(2023, 0, 1, 0, 0, 30), y: 5 },
        { x: new Date(2023, 0, 1, 0, 0, 40), y: 45 },
        { x: new Date(2023, 0, 1, 0, 0, 50), y: 98 },
        { x: new Date(2023, 0, 1, 0, 0, 60), y: 9 },
      ],
      BestRate: "315",
      BestStatus: "3",
      BestTimes: "5.5",
      Shap: {
        name: "22",
        rate: "342",
        times: "3.2",
        status: 2,
      },
    },
    {
      Detail: "Detail2",
      CorrectRange: "2.1~4.75",
      RealRange: "3.0~3.3",
      Status: "合格",
      lineChartData: [
        { x: new Date(2023, 0, 1, 0, 0, 0), y: 22 },
        { x: new Date(2023, 0, 1, 0, 0, 10), y: 25 },
        { x: new Date(2023, 0, 1, 0, 0, 20), y: 65 },
        { x: new Date(2023, 0, 1, 0, 0, 30), y: 30 },
        { x: new Date(2023, 0, 1, 0, 0, 40), y: 45 },
        { x: new Date(2023, 0, 1, 0, 0, 50), y: 58 },
        { x: new Date(2023, 0, 1, 0, 0, 60), y: 20 },
      ],
      BestRate: "不需調整",
      BestStatus: "不需調整",
      BestTimes: "不需調整",
      Shap: {
        name: "343",
        rate: "281",
        times: "6.1",
        status: 2,
      },
    },
    {
      Detail: "Detail3",
      CorrectRange: "2.1~4.75",
      RealRange: "3.0~3.3",
      Status: "合格",
      lineChartData: [
        { x: new Date(2023, 0, 1, 0, 0, 0), y: 22 },
        { x: new Date(2023, 0, 1, 0, 0, 10), y: 25 },
        { x: new Date(2023, 0, 1, 0, 0, 20), y: 65 },
        { x: new Date(2023, 0, 1, 0, 0, 30), y: 30 },
        { x: new Date(2023, 0, 1, 0, 0, 40), y: 45 },
        { x: new Date(2023, 0, 1, 0, 0, 50), y: 58 },
        { x: new Date(2023, 0, 1, 0, 0, 60), y: 20 },
      ],
      BestRate: "不需調整",
      BestStatus: "不需調整",
      BestTimes: "不需調整",
      Shap: {
        name: "99",
        rate: "381",
        times: "5.2",
        status: 2,
      },
    },
    {
      Detail: "Detail4",
      CorrectRange: "2.1~4.75",
      RealRange: "3.0~3.3",
      Status: "合格",
      lineChartData: [
        { x: new Date(2023, 0, 1, 0, 0, 0), y: 32 },
        { x: new Date(2023, 0, 1, 0, 0, 10), y: 25 },
        { x: new Date(2023, 0, 1, 0, 0, 20), y: 55 },
        { x: new Date(2023, 0, 1, 0, 0, 30), y: 30 },
        { x: new Date(2023, 0, 1, 0, 0, 40), y: 45 },
        { x: new Date(2023, 0, 1, 0, 0, 50), y: 48 },
        { x: new Date(2023, 0, 1, 0, 0, 60), y: 20 },
      ],
      BestRate: "不需調整",
      BestStatus: "不需調整",
      BestTimes: "不需調整",
      Shap: {
        name: "99",
        rate: "381",
        times: "5.2",
        status: 2,
      },
    },
    {
      Detail: "Detail5",
      CorrectRange: "2.1~4.75",
      RealRange: "3.0~3.3",
      Status: "合格",
      lineChartData: [
        { x: new Date(2023, 0, 1, 0, 0, 0), y: 42 },
        { x: new Date(2023, 0, 1, 0, 0, 10), y: 25 },
        { x: new Date(2023, 0, 1, 0, 0, 20), y: 35 },
        { x: new Date(2023, 0, 1, 0, 0, 30), y: 30 },
        { x: new Date(2023, 0, 1, 0, 0, 40), y: 45 },
        { x: new Date(2023, 0, 1, 0, 0, 50), y: 48 },
        { x: new Date(2023, 0, 1, 0, 0, 60), y: 20 },
      ],
      BestRate: "不需調整",
      BestStatus: "不需調整",
      BestTimes: "不需調整",
      Shap: {
        name: "0",
        rate: "281",
        times: "6.2",
        status: 2,
      },
    },
  ];

  return (
    <div>
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl ">
        <ChartsHeader category="Detail預測" />
        <div className=" flex px-10 items-center gap-3">
          {activeMenu ? (
            <LineChart
              height={"350px"}
              width={"350px"}
              lineChartData={lineData.lineChartData}
            />
          ) : (
            <LineChart
              height={"350px"}
              width={"600px"}
              lineChartData={lineData.lineChartData}
            />
          )}

          <div className="">
            <div className=" dark:text-gray-200 bg-red-600 h-44 rounded-xl lg:w-64 p-5 pt-9 m-3  bg-center">
              <div className="-mt-2 items-center">
                <p className="text-2xl font-bold text-center">SHAP分析結果</p>
              </div>
              <div className=" flex py-1 items-center justify-center gap-2">
                <p className="text-base font-bold  ">重點期數 </p>
                <p className="text-base font-bold ">轉速</p>
                <p className="text-base font-bold ">沖壓次數 </p>
                <p className="text-base font-bold ">狀態</p>
              </div>
              <div className=" flex py-1 items-center justify-center gap-8">
                <p className="text-base font-bold  ">{lineData.Shap.name} </p>
                <p className="text-base font-bold ">{lineData.Shap.rate}</p>
                <p className="text-base font-bold ">{lineData.Shap.times} </p>
                <p className="text-base font-bold ">{lineData.Shap.status}</p>
              </div>
            </div>
            <div className=" dark:text-gray-200 bg-red-600 h-44 rounded-xl lg:w-64 p-5 pt-9 m-3  bg-center">
              <div className="-mt-2">
                <p className="text-2xl font-bold ">最適機台數據</p>
              </div>

              <div className="mt-2">
                <p>轉速：{lineData.BestRate}</p>
              </div>
              <div className="mt-2">
                <p>狀態：{lineData.BestStatus}</p>
              </div>
              <div className="mt-2">
                <p>每秒沖壓次數：{lineData.BestTimes}</p>
              </div>
            </div>
          </div>
          <div className=" dark:text-gray-200 bg-white h-[352px] rounded-xl lg:w-[300px] p-5   bg-center">
            <div className=" flex py-4 items-center justify-center gap-2 text-sm bg-red-600 rounded-xl p-3">
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
