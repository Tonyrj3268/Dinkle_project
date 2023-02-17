import React, { useState, useEffect } from "react";

import {
  ChartsHeader,
  Stacked as StackedChart,
  Bar as BarChart,
} from "../components";

const CostTotal = () => {
  const [inputFixTimeValue, setInputFixTimeValue] = useState("預測成本統計");
  const [stackedCustomSeries, setStackedCustomSeries] = useState([
    {
      dataSource: [
        { x: "功能性", y: 485, color: "red" },
        { x: "非功能性", y: 575, color: "yellow" },
        { x: "功能性與非功能性", y: 1060, color: "blue" },
      ],
      xName: "x",
      yName: "y",
      name: "成本（台幣千元為單位）",
      type: "StackingColumn",
      background: "blue",
    },
  ]);
  const [stackedPrimaryXAxis, setStackedPrimaryXAxis] = useState({
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: "Rotate45",
    valueType: "Category",
  });
  const [stackedPrimaryYAxis, setStackedPrimaryYAxis] = useState({
    lineStyle: { width: 0 },
    minimum: 250,
    maximum: 1250,
    interval: 250,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: "{value}",
  });
  useEffect(() => {
    console.log(inputFixTimeValue);
    if (inputFixTimeValue === "預測成本統計") {
      setStackedCustomSeries([
        {
          dataSource: [
            { x: "功能性", y: 485, color: "red" },
            { x: "非功能性", y: 575, color: "yellow" },
            { x: "功能性與非功能性", y: 1060, color: "blue" },
          ],
          xName: "x",
          yName: "y",
          name: "成本（台幣千元為單位）",
          type: "StackingColumn",
          background: "blue",
        },
      ]);
      setStackedPrimaryYAxis({
        lineStyle: { width: 0 },
        minimum: 250,
        maximum: 1250,
        interval: 250,
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        labelFormat: "{value}",
      });
    } else if (inputFixTimeValue === "良品率統計") {
      setStackedCustomSeries([
        {
          dataSource: [
            { x: "預測", y: 3045 },
            { x: "實際", y: 3195 },
          ],
          xName: "x",
          yName: "y",
          name: "良品數",
          type: "StackingColumn",
          background: "blue",
        },
        {
          dataSource: [
            { x: "預測", y: 212, color: "red" },
            { x: "實際", y: 62, color: "red" },
          ],
          xName: "x",
          yName: "y",
          name: "功能不良品數",
          type: "StackingColumn",
          background: "red",
        },
      ]);
      setStackedPrimaryYAxis({
        lineStyle: { width: 0 },
        minimum: 0,
        maximum: 3500,
        interval: 500,
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        labelFormat: "{value}",
      });
    }
  }, [inputFixTimeValue]);
  var LabelArray = { 良品率統計: "良品率統計", 預測成本統計: "預測不良品成本" };

  return (
    <div className=" flex flex-col space-y-5">
      <div className="m-4 md:m-5 mt-12 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <select
          value={inputFixTimeValue}
          onChange={(e) => {
            setInputFixTimeValue(e.target.value);
          }}
          className=" border-1 w-full text-center h-10 rounded-full bg-white font-semibold"
          placeholder="預測成本統計"
        >
          <option value="預測成本統計">預測成本統計</option>
          <option value="良品率統計">良品率統計</option>
          <option value="Detail預測不良次數">Detail預測不良次數</option>
        </select>
      </div>
      {inputFixTimeValue === "Detail預測不良次數" ? (
        <div className="m-4 md:m-5 mt-12 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
          <ChartsHeader category="預測各規格超過上下界次數" />
          <div className="w-full">
            <BarChart></BarChart>
          </div>
        </div>
      ) : (
        <div className="m-4 md:m-5 mt-12 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
          <ChartsHeader category={LabelArray[inputFixTimeValue]} />
          <div className="w-full">
            <StackedChart
              stackedCustomSeries={stackedCustomSeries}
              stackedPrimaryXAxis={stackedPrimaryXAxis}
              stackedPrimaryYAxis={stackedPrimaryYAxis}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CostTotal;
