import React, { useEffect } from "react";
import axios from "axios";
import { LineChart } from "../components";
import { useStateContext } from ".././contexts/ContextProvider";
import Tr from "../components/Tr";
const Detail = () => {
  const { activeMenu, lineData, setLineData, setTest } = useStateContext();
  const MINUTE_MS = 3000;

  useEffect(() => {
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
          temp_data.lineMin[i].x =
            temp_data.selectChartData1[i + lineData.times].x;
          temp_data.lineMax[i].x =
            temp_data.selectChartData1[i + lineData.times].x;
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
      // console.log("Logs every minute");
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [lineData.lineChartData1, lineData.lineMax, lineData.lineMin]);

  var data = [
    {
      Detail: "Detail1",
      CorrectRange: "3.1~3.75",
      RealRange: "2.2~3.3",
      Status: "不合格",
      lineChartData1: [],
      selectChartData1: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 12 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 25 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 3 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 5 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 45 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 98 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 9 },

        { x: new Date(2023, 1, 1, 0, 1, 10), y: 25 },
        { x: new Date(2023, 1, 1, 0, 1, 20), y: 3 },
        { x: new Date(2023, 1, 1, 0, 1, 30), y: 5 },
        { x: new Date(2023, 1, 1, 0, 1, 40), y: 45 },
        { x: new Date(2023, 1, 1, 0, 1, 50), y: 98 },
        { x: new Date(2023, 1, 1, 0, 1, 60), y: 9 },
      ],
      BestRate: "315",
      BestStatus: "3",
      BestTimes: "5.5",
      times: 0,
      Shap: {
        name: "22",
        rate: "342",
        times: "3.2",
        status: 2,
      },
      lineMin: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 10 },
      ],
      lineMax: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 90 },
      ],
    },
    {
      Detail: "Detail2",
      CorrectRange: "2.1~4.75",
      RealRange: "3.0~3.3",
      Status: "合格",
      lineChartData1: [],
      selectChartData1: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 22 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 25 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 65 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 30 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 45 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 58 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 20 },

        { x: new Date(2023, 1, 1, 0, 1, 10), y: 25 },
        { x: new Date(2023, 1, 1, 0, 1, 20), y: 65 },
        { x: new Date(2023, 1, 1, 0, 1, 30), y: 30 },
        { x: new Date(2023, 1, 1, 0, 1, 40), y: 45 },
        { x: new Date(2023, 1, 1, 0, 1, 50), y: 58 },
        { x: new Date(2023, 1, 1, 0, 1, 60), y: 20 },
      ],
      lineMin: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 10 },
      ],
      lineMax: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 90 },
      ],
      BestRate: "不需調整",
      BestStatus: "不需調整",
      BestTimes: "不需調整",
      times: 0,
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
      lineChartData1: [],
      selectChartData1: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 22 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 25 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 65 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 30 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 45 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 58 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 20 },

        { x: new Date(2023, 1, 1, 0, 1, 10), y: 25 },
        { x: new Date(2023, 1, 1, 0, 1, 20), y: 65 },
        { x: new Date(2023, 1, 1, 0, 1, 30), y: 30 },
        { x: new Date(2023, 1, 1, 0, 1, 40), y: 45 },
        { x: new Date(2023, 1, 1, 0, 1, 50), y: 58 },
        { x: new Date(2023, 1, 1, 0, 1, 60), y: 20 },
      ],
      lineMin: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 10 },
      ],
      lineMax: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 90 },
      ],
      BestRate: "不需調整",
      BestStatus: "不需調整",
      BestTimes: "不需調整",
      times: 0,
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
      lineChartData1: [],
      selectChartData1: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 32 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 25 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 55 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 30 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 45 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 48 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 20 },

        { x: new Date(2023, 1, 1, 0, 1, 10), y: 25 },
        { x: new Date(2023, 1, 1, 0, 1, 20), y: 55 },
        { x: new Date(2023, 1, 1, 0, 1, 30), y: 30 },
        { x: new Date(2023, 1, 1, 0, 1, 40), y: 45 },
        { x: new Date(2023, 1, 1, 0, 1, 50), y: 48 },
        { x: new Date(2023, 1, 1, 0, 1, 60), y: 20 },
      ],
      lineMin: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 10 },
      ],
      lineMax: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 90 },
      ],
      BestRate: "不需調整",
      BestStatus: "不需調整",
      BestTimes: "不需調整",
      times: 0,
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
      lineChartData1: [],
      selectChartData1: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 42 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 25 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 35 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 30 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 45 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 48 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 20 },

        { x: new Date(2023, 1, 1, 0, 1, 10), y: 25 },
        { x: new Date(2023, 1, 1, 0, 1, 20), y: 55 },
        { x: new Date(2023, 1, 1, 0, 1, 30), y: 30 },
        { x: new Date(2023, 1, 1, 0, 1, 40), y: 45 },
        { x: new Date(2023, 1, 1, 0, 1, 50), y: 48 },
        { x: new Date(2023, 1, 1, 0, 1, 60), y: 20 },
      ],
      lineMin: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 10 },
      ],
      lineMax: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 90 },
      ],
      BestRate: "不需調整",
      BestStatus: "不需調整",
      BestTimes: "不需調整",
      times: 0,
      Shap: {
        name: "0",
        rate: "281",
        times: "6.2",
        status: 2,
      },
    },
    {
      Detail: "Detail6",
      CorrectRange: "2.2~4.75",
      RealRange: "3.0~3.41",
      Status: "合格",
      lineChartData1: [],
      selectChartData1: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 22 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 25 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 35 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 40 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 45 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 38 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 20 },

        { x: new Date(2023, 1, 1, 0, 1, 10), y: 25 },
        { x: new Date(2023, 1, 1, 0, 1, 20), y: 35 },
        { x: new Date(2023, 1, 1, 0, 1, 30), y: 40 },
        { x: new Date(2023, 1, 1, 0, 1, 40), y: 45 },
        { x: new Date(2023, 1, 1, 0, 1, 50), y: 38 },
        { x: new Date(2023, 1, 1, 0, 1, 60), y: 20 },
      ],
      lineMin: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 10 },
      ],
      lineMax: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 90 },
      ],
      BestRate: "不需調整",
      BestStatus: "不需調整",
      BestTimes: "不需調整",
      times: 0,
      Shap: {
        name: "0",
        rate: "281",
        times: "6.2",
        status: 2,
      },
    },
    {
      Detail: "Detail7",
      CorrectRange: "1.1~3.75",
      RealRange: "2.0~2.3",
      Status: "合格",
      lineChartData1: [],
      selectChartData1: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 42 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 61 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 65 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 30 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 45 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 28 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 10 },

        { x: new Date(2023, 1, 1, 0, 1, 10), y: 61 },
        { x: new Date(2023, 1, 1, 0, 1, 20), y: 25 },
        { x: new Date(2023, 1, 1, 0, 1, 30), y: 30 },
        { x: new Date(2023, 1, 1, 0, 1, 40), y: 45 },
        { x: new Date(2023, 1, 1, 0, 1, 50), y: 28 },
        { x: new Date(2023, 1, 1, 0, 1, 60), y: 15 },
      ],
      lineMin: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 10 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 10 },
      ],
      lineMax: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 90 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 90 },
      ],
      BestRate: "不需調整",
      BestStatus: "不需調整",
      BestTimes: "不需調整",
      times: 0,
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
        <div className=" mb-10">
          <div>
            <p className="text-3xl font-extrabold tracking-tight dark:text-gray-200 text-slate-900">
              {lineData.Detail}
            </p>
          </div>
        </div>

        <div className=" flex px-10 items-center gap-5 w-full">
          {lineData.selectChartData1.length < 6 ? (
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
