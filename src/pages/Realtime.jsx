import React, { useState, useEffect } from "react";
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
import { useStateContext } from "../contexts/ContextProvider";

const Realtime = () => {
  // const { currentColor, currentMod } = useStateContext();
  const [page, setPage] = useState("即時監控");
  function dialogTemplete(props) {
    setLineData({
      Detail: "Detail預測",
      CorrectRange: "",
      RealRange: "",
      Status: "",
      lineChartData1: [],
      selectChartData1: [],
      lineChartData2: [],
      selectChartData2: [],
      lineNow: [],
      lineFuture: [],
      times: 0,
      lineMin: [
        { x: new Date(2023, 0, 1, 0, 0, 0), y: 10 },
        { x: new Date(2023, 0, 1, 0, 0, 10), y: 10 },
        { x: new Date(2023, 0, 1, 0, 0, 20), y: 10 },
        { x: new Date(2023, 0, 1, 0, 0, 30), y: 10 },
        { x: new Date(2023, 0, 1, 0, 0, 40), y: 10 },
        { x: new Date(2023, 0, 1, 0, 0, 50), y: 10 },
        { x: new Date(2023, 0, 1, 0, 0, 60), y: 10 },
      ],
      lineMax: [
        { x: new Date(2023, 0, 1, 0, 0, 0), y: 90 },
        { x: new Date(2023, 0, 1, 0, 0, 10), y: 90 },
        { x: new Date(2023, 0, 1, 0, 0, 20), y: 90 },
        { x: new Date(2023, 0, 1, 0, 0, 30), y: 90 },
        { x: new Date(2023, 0, 1, 0, 0, 40), y: 90 },
        { x: new Date(2023, 0, 1, 0, 0, 50), y: 90 },
        { x: new Date(2023, 0, 1, 0, 0, 60), y: 90 },
      ],
    });
    return <DiaLog {...props} />;
  }
  const { setLineData, setTest, lineData } = useStateContext();
  const MINUTE_MS = 3000;
  useEffect(() => {
    if (page === "成本") {
      const interval = setInterval(() => {
        // var request = {
        //   Start_date: "2022-01",
        //   End_date: "2022-06",
        // };
        // axios
        //   .post(
        //     "http://192.168.83.203:8081/AVM20_V2/api/MachineCostDate",
        //     request
        //   )
        //   .then((res) => {
        //     console.log(res.data);
        //   });
        if (lineData.lineChartData1.length < 7) {
          var temp_data = lineData;
          temp_data.lineChartData1.push(
            temp_data.selectChartData1[temp_data.lineChartData1.length]
          );
          console.log("update");
          setLineData(temp_data);
        } else if (
          lineData.lineChartData1.length === 7 &&
          lineData.selectChartData1.length - 7 > lineData.times
        ) {
          lineData.times = lineData.times + 1;
          console.log(lineData.times);
          var temp_data = lineData;
          for (var i = 0; i < 7; i++) {
            temp_data.lineChartData1[i] =
              temp_data.selectChartData1[i + lineData.times];
          }
          console.log("update_new");
          // console.log(temp_data.lineChartData[0]);
          console.log(temp_data.lineMax[0]);
          setLineData(temp_data);
        } else {
          lineData.times = 0;
          console.log("no");
        }
        setTest((prev) => prev + 1);
        console.log("良率");
      }, MINUTE_MS);
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }
  }, [lineData.lineChartData1, lineData.lineMax, lineData.lineMin]);
  var changePage = (value) => {
    if (value === "成本") {
      console.log("成本");
      setLineData({
        Detail: "Detail1",
        CorrectRange: "3.1~3.75",
        RealRange: "2.2~3.3",
        Status: "不合格",
        lineChartData1: [],
        selectChartData1: [
          { x: new Date(2023, 1, 1, 0, 0, 0), y: 82 },
          { x: new Date(2023, 1, 1, 0, 0, 10), y: 93 },
          { x: new Date(2023, 1, 1, 0, 0, 20), y: 74 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 77 },
          { x: new Date(2023, 1, 1, 0, 0, 40), y: 83 },
          { x: new Date(2023, 1, 1, 0, 0, 50), y: 84 },
          { x: new Date(2023, 1, 1, 0, 0, 60), y: 91 },

          { x: new Date(2023, 1, 1, 0, 1, 10), y: 91 },
          { x: new Date(2023, 1, 1, 0, 1, 20), y: 85 },
          { x: new Date(2023, 1, 1, 0, 1, 30), y: 85 },
          { x: new Date(2023, 1, 1, 0, 1, 40), y: 91 },
          { x: new Date(2023, 1, 1, 0, 1, 50), y: 72 },
          { x: new Date(2023, 1, 1, 0, 1, 60), y: 84 },
        ],
        times: 0,
        lineMin: [],
        lineMax: [],
      });
    }
    for (var i = 1; i < 99999; i++) window.clearInterval(i);
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
          良率
        </button>
      </div>
      {page === "即時監控" ? (
        <div>
          <div className="flex w-full p-5"></div>
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
                  <p>不良數總數</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-3xl font-bold ">32</p>
              </div>
            </div>
            <div className=" dark:text-gray-200 bg-green-500 h-44 rounded-xl w-1/3 p-5 pt-9 m-3  bg-center">
              <div className="flex flex-col gap-3 -mt-4 ">
                <div className="">
                  <p className=" items-baseline">過去一百分鐘不良總數</p>

                  <p className="text-2xl font-bold ">3</p>
                </div>
                <div>
                  <p>過去一百分鐘不良率</p>
                  <p className="text-2xl font-bold ">3%</p>
                </div>
              </div>
            </div>
            <div className=" dark:text-gray-200 bg-green-500 h-44 rounded-xl w-1/3 p-5 pt-9 m-3  bg-center">
              <div className="flex flex-col gap-3 -mt-4 ">
                <div className="">
                  <p className=" items-baseline">過去一百分鐘不良機台</p>

                  <p className="text-2xl font-bold ">1,3,6</p>
                </div>
                <div>
                  <p>過去一百分鐘不良機台率</p>
                  <p className="text-2xl font-bold ">38%</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex gap-4">
            <div className=" w-full">
              <LineChart
                height={"100%"}
                width={"100%"}
                bg={"white"}
                type={"Yield"}
              ></LineChart>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Realtime;
