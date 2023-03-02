import React, { useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { Pie as PieChart, LineChart } from "../components";

import { realtimeData, contextMenuItems, realtimeGrid } from "../data/dummy";
// import { useStateContext } from "../contexts/ContextProvider";
import DiaLog from "./Dialog";
import { HiVariable } from "react-icons/hi";

const Realtime = () => {
  // const { currentColor, currentMod } = useStateContext();
  const [page, setPage] = useState("");
  function dialogTemplete(props) {
    return <DiaLog {...props} />;
  }
  var changePage = (value) => {
    setPage(value);
  };

  const editing = {
    mode: "Normal",
    allowEditing: true,
    template: dialogTemplete,
  };

  var pieChartData = [
    { x: "預防成本", y: 20, text: "20%" },
    { x: "鑑定成本", y: 9.8, text: "9.8%" },
    { x: "內部失敗成本", y: 66.2, text: "66.2%" },
    { x: "外部失敗成本", y: 11, text: "3%" },
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  overflow-y-auto">
      <div className=" mb-5">
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          即時監控
        </p>
      </div>
      <div className=" flex flex-row gap-4 text-white font-bold">
        <button
          onClick={(e) => {
            changePage("即時監控");
          }}
          className=" w-1/2 h-12 bg-red-600 rounded-full hover:bg-red-700"
        >
          即時監控
        </button>
        <button
          onClick={(e) => {
            changePage("成本");
          }}
          className=" w-1/2 h-12 bg-green-500 rounded-full hover:bg-green-600"
        >
          成本
        </button>
      </div>
      {page === "即時監控" ? (
        <div>
          <div className="flex w-full">
            <div className=" dark:text-gray-200 bg-red-600 h-44 rounded-xl w-1/4 p-5 pt-9 m-3  bg-center">
              <div className="flex justify-between items-center ">
                <div>
                  <p className="text-2xl font-bold ">預測品質狀況</p>
                </div>
              </div>
              <div className="mt-6">
                <p>合格</p>
              </div>
            </div>
            <div className=" dark:text-gray-200 bg-red-600 h-44 rounded-xl w-1/4 p-5 pt-9 m-3  bg-center">
              <div className="flex justify-between items-center ">
                <div>
                  <p className="text-2xl font-bold ">不合格</p>
                </div>
              </div>
              <div className="mt-6">
                <p>detail 2,5,7</p>
              </div>
            </div>
            <div className=" dark:text-gray-200 bg-red-600 h-44 rounded-xl w-1/4  p-5 pt-9 m-3  bg-center">
              <div className="flex justify-between items-center ">
                <div>
                  <p className="text-2xl font-bold ">需調整機台</p>
                </div>
              </div>
              <div className="mt-6">
                <p>機台一,機台二</p>
              </div>
            </div>
            <div className=" dark:text-gray-200 bg-red-600 h-44 rounded-xl w-1/4 p-5 pt-9 m-3  bg-center">
              <div className="flex justify-between items-center ">
                <div>
                  <p className="font-bold ">預測良率：98%</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="font-bold ">預測不良率：2%</p>
              </div>
            </div>
          </div>
          <GridComponent
            id="gridcomp"
            dataSource={realtimeData}
            allowSorting
            contextMenuItems={contextMenuItems}
            editSettings={editing}
          >
            <ColumnsDirective>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              {realtimeGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject
              services={[
                Resize,
                Sort,
                ContextMenu,
                Filter,
                Page,
                ExcelExport,
                Edit,
                PdfExport,
              ]}
            />
          </GridComponent>
        </div>
      ) : (
        <div>
          <div className="flex w-full  h-full">
            <div className=" dark:text-gray-200 bg-green-500 h-44 rounded-xl w-1/3 p-5 pt-9 m-3  bg-center">
              <div className="flex justify-between items-center ">
                <div>
                  <p>總預測損失成本</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-3xl font-bold ">32.45萬</p>
              </div>
            </div>
            <div className=" dark:text-gray-200 bg-green-500 h-44 rounded-xl w-1/3 p-5 pt-9 m-3  bg-center">
              <div className="flex flex-col gap-3 -mt-4 ">
                <div className="">
                  <p className=" items-baseline">預防成本</p>

                  <p className="text-2xl font-bold ">6.5萬</p>
                </div>
                <div>
                  <p>鑑定成本</p>
                  <p className="text-2xl font-bold ">3.45萬</p>
                </div>
              </div>
            </div>
            <div className=" dark:text-gray-200 bg-green-500 h-44 rounded-xl w-1/3 p-5 pt-9 m-3  bg-center">
              <div className="flex flex-col gap-3 -mt-4 ">
                <div className="">
                  <p className=" items-baseline">內部失敗成本</p>

                  <p className="text-2xl font-bold ">21.5萬</p>
                </div>
                <div>
                  <p>外部失敗成本</p>
                  <p className="text-2xl font-bold ">1萬</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex gap-4">
            <div className=" dark:text-gray-200 rounded-xl w-1/2 ">
              <PieChart
                id="chart-pie"
                data={pieChartData}
                legendVisiblity
                height="100%"
                width="100%"
                bg="white"
              />
            </div>
            <div className=" w-1/2">
              <LineChart
                height={"100%"}
                width={"100%"}
                bg={"white"}
              ></LineChart>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Realtime;
