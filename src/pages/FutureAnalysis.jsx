import React, { useState, useEffect } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  HiloSeries,
  Tooltip,
  DateTime,
  Zoom,
  Logarithmic,
  Crosshair,
} from "@syncfusion/ej2-react-charts";

import {
  financialChartData,
  FinancialPrimaryXAxis,
  FinancialPrimaryYAxis,
} from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { ChartsHeader } from "../components";
const date1 = new Date("2017, 1, 1");

// eslint-disable-next-line consistent-return
function filterValue(value) {
  if (value.x >= date1) {
    // eslint-disable-next-line no-sequences
    return value.x, value.high, value.low;
  }
}
var data = [];
function filldata() {
  for (var i = 1; i <= 400; i++) {
    var index1 = Math.random() / 5;
    data[i - 1] = {
      x: i,
      high: 3.2 + index1,
      low: 3.2 - index1,
    };
  }
}

filldata();
const returnValue = data;

const FutureAnalysis = () => {
  const [inputFixTimeValue, setInputFixTimeValue] = useState("預測成本統計");
  const [inputChartTitleValue, setInputChartTitleValue] =
    useState("Upper_limit預測趨勢折線圖");
  const { currentMode } = useStateContext();
  var changeChart = (value) => {
    console.log(value);
    setInputChartTitleValue(value);
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl space-y-5 overflow-autox">
      <div className="">
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          預測趨勢
        </p>
      </div>
      <select
        value={inputFixTimeValue}
        onChange={(e) => {
          setInputFixTimeValue(e.target.value);
        }}
        className=" border-1 w-full text-center h-10 rounded-full bg-white font-semibold p-2"
        placeholder="Detail1"
      >
        <option value="Detail1">Detail1</option>
        <option value="Detail2">Detail2</option>
        <option value="Detail3">Detail3</option>
      </select>
      <div className="w-full flex flex-row items-center justify-center gap-5 p-2 font-semibold">
        <button
          onClick={(e) => changeChart("Upper_limit預測趨勢折線圖")}
          className=" px-5 py-2 bg-black text-white rounded-full hover:bg-emerald-400"
        >
          Upper_limit預測趨勢折線圖
        </button>
        <button
          onClick={(e) => changeChart("Lower_limit預測趨勢折線圖")}
          className=" px-5 py-2 bg-black text-white rounded-full hover:bg-emerald-400"
        >
          Lower_limit預測趨勢折線圖
        </button>
      </div>
      <div className="w-full text-center font-semibold text-lg">
        <p>{inputChartTitleValue}</p>
      </div>
      <div className="w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={FinancialPrimaryXAxis}
          primaryYAxis={FinancialPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true, shared: true }}
          crosshair={{ enable: true, lineType: "Vertical", line: { width: 0 } }}
          background={currentMode === "Dark" ? "#33373E" : "#fff"}
        >
          <Inject services={[HiloSeries, Tooltip, DateTime, Crosshair, Zoom]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={returnValue}
              xName="x"
              yName="low"
              name="Apple Inc"
              type="Hilo"
              low="low"
              high="high"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default FutureAnalysis;
