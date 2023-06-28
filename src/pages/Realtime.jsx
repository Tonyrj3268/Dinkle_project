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
  colGroup,
} from "@syncfusion/ej2-react-grids";
import Button from "@mui/material/Button";
import DiaLog from "./Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import { Pie as PieChart, LineChart } from "../components";
import axios from "axios";
import { contextMenuItems, realtimeGrid } from "../data/dummy";
// import { useStateContext } from "../contexts/ContextProvider";
import { HiVariable } from "react-icons/hi";
import { useStateContext } from "../contexts/ContextProvider";
class Machine {
  constructor(machine) {
    this.machine = machine;
    this.product = "";
    this.location = 0;
    this.time = [];
    this.frequency = [];
    this.Speed = [];
    this.Status = [];
    this.status_type = [];
    this.g_change = [];
    this.have_vibration = 0;
    this.is_qualified = [];
    this.good_rate = 100;
    this.accumulativeMin = 0;

    this.pred_max_detail = {};
    this.pred_min_detail = {};
    this.pred_avg_detail = {};
    this.standard_max_detail = {};
    this.standard_min_detail = {};
    this.standard_detail_name = {};

    this.recommend_speed = [];
    this.recommend_g_change = [];
    this.recommend_frequency = [];
    this.recommend_status = [];
  }
}
class Repair {
  constructor() {
    this.machine = "";
    this.product = "";
    this.detail_name = "";
    this.pred_time = "";
    this.alarm_status_time = "";
    this.alarm_status = "";
  }
}
const Realtime = () => {
  // const { currentColor, currentMod } = useStateContext();
  const [page, setPage] = useState("即時監控");
  const [data, setData] = useState([]);

  const [DialogData, setDialogData] = React.useState({});
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);

  const {
    setLineData,
    test,
    setTest,
    lineData,
    passRate,
    setPassRate,
    passRateProps,
    setPassRateProps,
    repairData,
    setRepairData,
  } = useStateContext();
  const formData = new URLSearchParams();
  formData.append("username", process.env.REACT_APP_extra_predict_username);
  formData.append("password", process.env.REACT_APP_extra_predict_password);
  const toolbarOptions = ["Add", "Edit", "Delete"];

  const formatTime = (date) => {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");
    let seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const GetRepairObj = (res) => {
    let all_repair = [];
    let limit = Math.min(100, res.data.length);
    for (let i = 0; i < limit; i++) {
      let obj = res.data[i];
      let repair = new Repair();
      repair.machine = obj.machine;
      repair.product = obj.product;
      repair.detail_name = obj.detail_name;
      repair.pred_time = obj.pred_time;
      repair.alarm_status = obj.alarm_status;
      repair.alarm_status_time = obj.alarm_status_time;

      all_repair.push(repair);
    }
    setRepairData(all_repair);
  };
  const CallApi = (minAgo) => {
    const params = {
      Show_type: process.env.REACT_APP_Show_type,
      Work_type: process.env.REACT_APP_Work_type,
      Min_ago: minAgo,
    };
    let url = process.env.REACT_APP_extra_predict_url;
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: params,
      })
      .then(ProcessData40)
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  const CallAlarmStampersDataApi = () => {
    let now = new Date(); // 取得現在的時間
    let oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);
    // 格式化時間為 yyyy-MM-dd HH:mm:ss 格式

    const params = {
      Start_time: formatTime(oneMonthAgo),
      End_time: formatTime(now),
    };

    let url = process.env.REACT_APP_extract_alarm_stampers_data;
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: params,
      })
      .then(GetRepairObj)
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  const AddDataInMachine = (machine, json, unpass_predict_name) => {
    machine.time.push(json.time);
    machine.frequency.push(getRandomNumber(10, 22));
    // machine.frequency.push(json.frequency + getRandomNumber(10, 22));
    // machine.Speed.push(json.Speed + getRandomNumber(0, json.Speed) / 2);
    machine.Speed.push(getRandomNumber(100, 300));
    machine.Status.push(json.Status);
    machine.status_type.push(json.status_type);
    // machine.g_change.push(json.g_change + getRandomNumber(10000, 20000));
    machine.g_change.push(getRandomNumber(10000, 20000));
    machine.have_vibration = json.have_vibration;
    let is_qualified = true;
    let num = 1;
    while (json[`standard_detail_name_${num}`] !== undefined) {
      let detailName = `detail_${num}`;
      let avg = Number(
        (
          (json[`pred_max_${detailName}`] + json[`pred_min_${detailName}`]) /
          2
        ).toFixed(4)
      );
      const rangePercentage = 0.2; // 範圍的百分比
      const range =
        (json[`pred_max_${detailName}`] - json[`pred_min_${detailName}`]) *
        rangePercentage;
      const lowerLimit = avg - range;
      const upperLimit = avg + range;

      // 產生在指定範圍內的亂數
      let randomValue = getRandomNumber(lowerLimit, upperLimit);
      machine["pred_avg_detail"].hasOwnProperty(`pred_avg_${detailName}`)
        ? machine["pred_avg_detail"][`pred_avg_${detailName}`].push(randomValue)
        : (machine["pred_avg_detail"][`pred_avg_${detailName}`] = [
            randomValue,
          ]);
      machine["pred_min_detail"].hasOwnProperty(`pred_min_${detailName}`)
        ? machine["pred_min_detail"][`pred_min_${detailName}`].push(
            json[`pred_min_${detailName}`]
          )
        : (machine["pred_min_detail"][`pred_min_${detailName}`] = [
            json[`pred_min_${detailName}`],
          ]);
      machine["pred_max_detail"].hasOwnProperty(`pred_max_${detailName}`)
        ? machine["pred_max_detail"][`pred_max_${detailName}`].push(
            json[`pred_max_${detailName}`]
          )
        : (machine["pred_max_detail"][`pred_max_${detailName}`] = [
            json[`pred_max_${detailName}`],
          ]);
      machine["standard_max_detail"][`standard_max_${detailName}`] =
        json[`standard_max_${detailName}`];
      machine["standard_min_detail"][`standard_min_${detailName}`] =
        json[`standard_min_${detailName}`];
      machine["standard_detail_name"][`standard_detail_name_${num}`] =
        json[`standard_detail_name_${num}`];
      if (
        json[`pred_max_${detailName}`] > json[`standard_max_${detailName}`] ||
        json[`pred_min_${detailName}`] < json[`standard_min_${detailName}`]
      ) {
        is_qualified = false;
        if (unpass_predict_name !== undefined) {
          unpass_predict_name += json[`standard_detail_name_${num}`] + ",";
        }
      }
      num++;
    }
    //預測值
    machine.recommend_speed = [];
    machine.recommend_g_change = [];
    machine.recommend_frequency = [];
    machine.recommend_status = [];
    num = 1;
    while (json[`recommend_speed_${num}`] !== undefined) {
      machine.recommend_speed.push(json[`recommend_speed_${num}`]);
      machine.recommend_g_change.push(json[`recommend_g_change_${num}`]);
      machine.recommend_frequency.push(json[`recommend_frequency_${num}`]);
      machine.recommend_status.push(json[`recommend_Status_${num}`]);
      num++;
    }
    machine.is_qualified.push(is_qualified);

    return machine;
  };
  const ProcessData40 = (res) => {
    console.log(res.data);
    if (typeof res.data === "string") {
      return;
    }
    let tem = lineData;
    let tem_pass_rate = [];
    let tem_unpass_rate_props = passRateProps;
    let api_data = res.data;
    let all_good_rate = 0;
    let all_machine = [];
    for (let i = api_data.length - 1; i >= 0; i--) {
      let json = api_data[i];
      let foundObject = false;
      all_machine.forEach((machine) => {
        if (machine.machine === json.machine) {
          foundObject = true;
          if (machine.product !== json.product) {
            let index = machine.location;
            machine = new Machine(json.machine);
            machine.product = json.product;
            machine.location = index;
          }
          machine = AddDataInMachine(machine, json);
        }
      });
      if (!foundObject) {
        let machine = new Machine(json.machine);
        machine.location = all_machine.length;
        machine.product = json.product;
        machine = AddDataInMachine(machine, json);
        all_machine.push(machine);
      }
    }

    let unpass_rate_20_min = 0;
    let unpass_rate_20_min_times = 0;
    let unpass_total_minute = tem_unpass_rate_props.accumulativeMin;
    let unpass_rate_20_min_total = 0;
    all_machine.forEach((obj) => {
      obj.accumulativeMin = obj.is_qualified
        .slice(-20)
        .reduce((acc, cur) => (cur === false ? acc + 1 : acc), 0);
      unpass_total_minute += obj.accumulativeMin;
      unpass_rate_20_min = obj.accumulativeMin;
      unpass_rate_20_min_total += unpass_rate_20_min;
      unpass_rate_20_min_times = 20;

      let good_rate = Number(
        (1 - unpass_rate_20_min / unpass_rate_20_min_times).toFixed(2)
      );
      obj.good_rate = good_rate;
      all_good_rate += parseFloat(good_rate);
    });
    let accumulativePassRateIn20 =
      ((all_good_rate * 100) / all_machine.length).toFixed(2) + "%";

    for (let i = 0; i < 20; i++) {
      let unpass = 0;
      let unpass_interval = 0;
      all_machine.forEach((obj) => {
        unpass += obj.is_qualified
          .slice(i, i + 20)
          .reduce((acc, cur) => (cur === false ? acc + 1 : acc), 0);
        unpass_interval += 20;
      });
      tem_pass_rate.push({
        x: all_machine[0].time[i + 20],
        y: ((1 - unpass / unpass_interval) * 100).toFixed(2),
      });
    }
    all_machine.forEach((machine) => {
      Object.keys(machine).forEach((key) => {
        if (Array.isArray(machine[key])) {
          machine[key] = machine[key].slice(-20);
        }
      });
      Object.keys(machine["pred_avg_detail"]).forEach((key) => {
        if (Array.isArray(machine["pred_avg_detail"][key])) {
          machine["pred_avg_detail"][key] =
            machine["pred_avg_detail"][key].slice(-20);
        }
      });
      Object.keys(machine["pred_max_detail"]).forEach((key) => {
        if (Array.isArray(machine["pred_max_detail"][key])) {
          machine["pred_max_detail"][key] =
            machine["pred_max_detail"][key].slice(-20);
        }
      });
      Object.keys(machine["pred_min_detail"]).forEach((key) => {
        if (Array.isArray(machine["pred_min_detail"][key])) {
          machine["pred_min_detail"][key] =
            machine["pred_min_detail"][key].slice(-20);
        }
      });
    });
    console.log(all_machine);
    setLineData(() => all_machine);
    let dataArray = [];
    for (let i = 0; i < all_machine.length; i++) {
      dataArray.push(all_machine[i]);
    }
    setData(dataArray);
    setPassRate(() => tem_pass_rate);
    setPassRateProps({
      accumulativeMin: unpass_total_minute,
      accumulativeMinIn20: unpass_rate_20_min_total,
      accumulativePassRateIn20: accumulativePassRateIn20,
    });
  };

  const MINUTE_MS = 60000;
  //query
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  var verlified = true;
  var query = JSON.parse(process.env.REACT_APP_extra_query);
  var ans_query = JSON.parse(process.env.REACT_APP_extra_query_ans);
  var getQuery = () => {
    const queryParams = new URLSearchParams(window.location.search);

    for (var i = 0; i < query.length; i++) {
      if (ans_query[i] !== queryParams.get(query[i])) {
        verlified = false;
        break;
      }
    }
  };
  getQuery();
  useEffect(() => {
    console.log("The verlified is " + verlified);
    if (verlified === false) {
      navigate("/404");
    }
    if (lineData.length === 0) {
      CallApi(40);
      CallAlarmStampersDataApi();
    }
    setData(lineData);

    return; // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     CallAlarmStampersDataApi();
  //     CallApi(1);
  //   }, MINUTE_MS);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [passRateProps]);

  var changePage = (value) => {
    setPage(value);
  };

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
          整體良率
        </button>
      </div>

      {page === "即時監控" ? (
        <div>
          <div className="flex w-full p-5"></div>

          <div className="container mx-auto ">
            <table className="min-w-full divide-y divide-gray-200 text-xs">
              <thead className="bg-gray-50 text-gray-500 border-1 border-gray-200">
                <tr>
                  <th className="py-3 px-6 text-center ">料號</th>
                  <th className="py-3 px-6 text-center">機台名稱</th>
                  <th className="py-3 px-6 text-center">狀態</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((d, i) => (
                  <tr
                    key={i}
                    onClick={(e) => {
                      setDialogData({
                        location: d.location,
                        machine: d.machine,
                        product: d.product,
                      });
                      setIsOpenDialog(true);
                    }}
                    className=" border-1 border-gray-200 cursor-pointer hover:bg-gray-200"
                  >
                    <td className="py-3 px-6 text-center">{d.product}</td>
                    <td className="py-3 px-6 text-center">{d.machine}</td>
                    <td className="py-3 px-6 text-center">
                      {!d.is_qualified[d.is_qualified.length - 1] ? (
                        <button
                          type="button"
                          style={{ background: "red" }}
                          className="text-white py-1 px-2 capitalize rounded-2xl text-md"
                        >
                          不合格
                        </button>
                      ) : (
                        <button
                          type="button"
                          style={{ background: "green" }}
                          className="text-white py-1 px-2 capitalize rounded-2xl text-md"
                        >
                          合格
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DiaLog
            isOpenDialog={isOpenDialog}
            onClose={() => {
              setIsOpenDialog(false);
            }}
            data={DialogData}
          />
        </div>
      ) : (
        <div>
          <div className="flex w-full  h-full">
            <div className=" dark:text-gray-200 bg-green-500 h-44 rounded-xl w-1/3 p-5 pt-9 m-3  bg-center">
              <div className="flex justify-between items-center ">
                <div>
                  <p>累積不良機台分鐘</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-3xl font-bold ">
                  {passRateProps.accumulativeMin}
                </p>
              </div>
            </div>
            <div className=" dark:text-gray-200 bg-green-500 h-44 rounded-xl w-2/3 p-5 pt-9 m-3  bg-center">
              <div className="flex flex-col gap-3 -mt-4 ">
                <div className="">
                  <p className=" items-baseline">過去二十分鐘機台不良分鐘</p>

                  <p className="text-2xl font-bold ">
                    {passRateProps.accumulativeMinIn20}
                  </p>
                </div>
                <div>
                  <p>過去二十分鐘機台良率</p>
                  <p className="text-2xl font-bold ">
                    {passRateProps.accumulativePassRateIn20}
                  </p>
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
