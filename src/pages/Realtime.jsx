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
import { useNavigate } from "react-router-dom";
import { Pie as PieChart, LineChart } from "../components";
import axios from "axios";
import { realtimeData, contextMenuItems, realtimeGrid } from "../data/dummy";
// import { useStateContext } from "../contexts/ContextProvider";
import DiaLog from "./Dialog";
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
    this.g_change = [];
    this.have_vibration = 0;
    this.is_qualified = [];
    this.good_rate = 100;
    this.accumulativeMin = 0;

    // this.pred_avg_detail_1 = [];
    // this.pred_avg_detail_2 = [];
    // this.pred_avg_detail_3 = [];
    // this.pred_avg_detail_4 = [];
    // this.pred_avg_detail_5 = [];
    // this.pred_avg_detail_6 = [];
    // this.pred_avg_detail_7 = [];
    // this.pred_avg_detail_8 = [];
    // this.pred_avg_detail_9 = [];
    // this.pred_avg_detail_10 = [];
    // this.pred_avg_detail_11 = [];
    // this.pred_avg_detail_12 = [];
    // this.pred_avg_detail_13 = [];

    // this.pred_max_detail_1 = [];
    // this.pred_max_detail_2 = [];
    // this.pred_max_detail_3 = [];
    // this.pred_max_detail_4 = [];
    // this.pred_max_detail_5 = [];
    // this.pred_max_detail_6 = [];
    // this.pred_max_detail_7 = [];
    // this.pred_max_detail_8 = [];
    // this.pred_max_detail_9 = [];
    // this.pred_max_detail_10 = [];
    // this.pred_max_detail_11 = [];
    // this.pred_max_detail_12 = [];
    // this.pred_max_detail_13 = [];
    // this.pred_min_detail_1 = [];
    // this.pred_min_detail_2 = [];
    // this.pred_min_detail_3 = [];
    // this.pred_min_detail_4 = [];
    // this.pred_min_detail_5 = [];
    // this.pred_min_detail_6 = [];
    // this.pred_min_detail_7 = [];
    // this.pred_min_detail_8 = [];
    // this.pred_min_detail_9 = [];
    // this.pred_min_detail_10 = [];
    // this.pred_min_detail_11 = [];
    // this.pred_min_detail_12 = [];
    // this.pred_min_detail_13 = [];

    // this.standard_max_detail_1 = 0;
    // this.standard_max_detail_2 = 0;
    // this.standard_max_detail_3 = 0;
    // this.standard_max_detail_4 = 0;
    // this.standard_max_detail_5 = 0;
    // this.standard_max_detail_6 = 0;
    // this.standard_max_detail_7 = 0;
    // this.standard_max_detail_8 = 0;
    // this.standard_max_detail_9 = 0;
    // this.standard_max_detail_10 = 0;
    // this.standard_max_detail_11 = 0;
    // this.standard_max_detail_12 = 0;
    // this.standard_max_detail_13 = 0;
    // this.standard_min_detail_1 = 0;
    // this.standard_min_detail_2 = 0;
    // this.standard_min_detail_3 = 0;
    // this.standard_min_detail_4 = 0;
    // this.standard_min_detail_5 = 0;
    // this.standard_min_detail_6 = 0;
    // this.standard_min_detail_7 = 0;
    // this.standard_min_detail_8 = 0;
    // this.standard_min_detail_9 = 0;
    // this.standard_min_detail_10 = 0;
    // this.standard_min_detail_11 = 0;
    // this.standard_min_detail_12 = 0;
    // this.standard_min_detail_13 = 0;
    // this.standard_detail_name_1 = "";
    // this.standard_detail_name_2 = "";
    // this.standard_detail_name_3 = "";
    // this.standard_detail_name_4 = "";
    // this.standard_detail_name_5 = "";
    // this.standard_detail_name_6 = "";
    // this.standard_detail_name_7 = "";
    // this.standard_detail_name_8 = "";
    // this.standard_detail_name_9 = "";
    // this.standard_detail_name_10 = "";
    // this.standard_detail_name_11 = "";
    // this.standard_detail_name_12 = "";
    // this.standard_detail_name_13 = "";

    this.pred_max_detail = {};
    this.pred_min_detail = {};
    this.pred_avg_detail = {};
    this.standard_max_detail = {};
    this.standard_min_detail = {};
    this.standard_detial_name = {};

    this.recommand_speed = [];
    this.recommand_g_change = [];
    this.recommand_frequency = [];
    this.recommand_status = [];
  }
}

const Realtime = () => {
  // const { currentColor, currentMod } = useStateContext();
  const [page, setPage] = useState("即時監控");
  const [data, setData] = useState([]);
  function dialogTemplete(props) {
    return <DiaLog {...props} />;
  }
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
      .then((res) => {
        if (minAgo === 1) {
          ProcessData(res);
        } else if (minAgo === 40) {
          ProcessData40(res);
        }
      })
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

  const CallInsertAlarmStampersDataApi = (InsertData) => {
    console.log(InsertData);
    if (
      InsertData.machine == undefined ||
      InsertData.product == undefined ||
      InsertData.Pred_time == undefined ||
      InsertData.Detail_name == undefined
    ) {
      alert("have undefined data");
      return;
    }
    const params = {
      Machine: InsertData.machine,
      Product: InsertData.product,
      Pred_time: InsertData.Pred_time,
      Detail_name: InsertData.Detail_name,
    };
    let url = process.env.REACT_APP_insert_alarm_stampers_data;
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: params,
      })
      .then((res) => {
        console.log(res);
      })
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

  const ProcessData = (res) => {
    console.log(res.data);
    if (typeof res.data === "string") {
      return;
    }
    let all_machine = lineData.slice();
    let api_data = res.data;
    let all_good_rate = 0;

    for (let i = 0; i < api_data.length; i++) {
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
          if (machine.Status.length >= 20) {
            Object.keys(machine).forEach((key) => {
              if (Array.isArray(machine[key])) {
                machine[key].shift();
              }
            });
            Object.keys(machine["pred_avg_detail"]).forEach((key) => {
              if (Array.isArray(machine["pred_avg_detail"][key])) {
                machine["pred_avg_detail"][key].shift();
              }
            });
            Object.keys(machine["pred_max_detail"]).forEach((key) => {
              if (Array.isArray(machine["pred_max_detail"][key])) {
                machine["pred_max_detail"][key].shift();
              }
            });
            Object.keys(machine["pred_min_detail"]).forEach((key) => {
              if (Array.isArray(machine["pred_min_detail"][key])) {
                machine["pred_min_detail"][key].shift();
              }
            });
          }
          let unpass_predict_name = "";
          machine = AddDataInMachine(machine, json, unpass_predict_name);
        }
      });
      if (!foundObject) {
        let unpass_predict_name = "";
        let machine = new Machine(json.machine);

        machine.location = all_machine.length;
        machine.product = json.product;
        machine = AddDataInMachine(machine, json, unpass_predict_name);
        all_machine.push(machine);
      }
    }
    let unpass_rate_20_min = 0;
    let unpass_rate_20_min_times = 0;
    let unpass_total_minute = 0;
    let unpass_rate_20_min_total = 0;
    all_machine.forEach((obj) => {
      obj.accumulativeMin = obj.is_qualified.reduce(
        (acc, cur) => (cur === false ? acc + 1 : acc),
        0
      );
      unpass_total_minute += obj.accumulativeMin;
      unpass_rate_20_min = obj.accumulativeMin;
      unpass_rate_20_min_total += unpass_rate_20_min;
      unpass_rate_20_min_times = 20;

      let good_rate = Number(
        (1 - unpass_rate_20_min / unpass_rate_20_min_times).toFixed(2)
      );
      obj.good_rate = good_rate;
      all_good_rate += good_rate;
    });

    all_good_rate = (all_good_rate * 100) / all_machine.length + "%";

    let unpass = 0;
    let unpass_interval = 0;
    all_machine.forEach((obj) => {
      unpass += obj.is_qualified.reduce(
        (acc, cur) => (cur === false ? acc + 1 : acc),
        0
      );
      unpass_interval += 20;
    });

    let tempassRate = passRate;
    if (tempassRate.length >= 20) {
      tempassRate.shift();
    }
    tempassRate.push({
      x: api_data[0].time,
      y: ((1 - unpass / unpass_interval) * 100).toFixed(2),
    });
    setPassRate(() => tempassRate);

    setLineData(() => all_machine);
    let dataArray = [];
    for (let i = 0; i < all_machine.length; i++) {
      dataArray.push(all_machine[i]);
    }

    setData(dataArray);
    setPassRateProps({
      accumulativeMin: unpass_total_minute,
      accumulativeMinIn20: unpass_rate_20_min_total,
      accumulativePassRateIn20: all_good_rate,
    });
  };
  const AddDataInMachine = (machine, json, unpass_predict_name) => {
    machine.time.push(json.time);
    machine.frequency.push(json.frequency);
    machine.Speed.push(json.Speed);
    machine.Status.push(json.Status);
    machine.g_change.push(json.g_change);
    machine.have_vibration = json.have_vibration;
    let is_qualified = true;
    let num = 1;
    while (json[`standard_detail_name_${num}`] !== undefined) {
      let detailName = `detail_${num}`;
      let avg = Number(
        (
          (json[`pred_max_${detailName}`] + json[`pred_min_${detailName}`]) /
          2
        ).toFixed(2)
      );
      machine["pred_avg_detail"].hasOwnProperty(`pred_avg_${detailName}`)
        ? machine["pred_avg_detail"][`pred_avg_${detailName}`].push(avg)
        : (machine["pred_avg_detail"][`pred_avg_${detailName}`] = [avg]);
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
      machine["standard_detial_name"][`standard_detail_name_${num}`] =
        json[`standard_detail_name_${num}`];
      // machine[`pred_avg_${detailName}`].push(
      //   Number(
      //     (
      //       (json[`pred_max_${detailName}`] + json[`pred_min_${detailName}`]) /
      //       2
      //     ).toFixed(2)
      //   )
      // );
      // machine[`pred_max_${detailName}`].push(
      //   json[`pred_max_${detailName}`].toFixed(3)
      // );
      // machine[`pred_min_${detailName}`].push(
      //   json[`pred_min_${detailName}`].toFixed(3)
      // );
      // machine[`standard_max_${detailName}`] =
      //   json[`standard_max_${detailName}`];
      // machine[`standard_min_${detailName}`] =
      //   json[`standard_min_${detailName}`];
      // machine[`standard_detail_name_${num}`] =
      //   json[`standard_detail_name_${num}`];

      if (
        json[`pred_max_${detailName}`] > json[`standard_max_${detailName}`] ||
        json[`pred_min_${detailName}`] < json[`standard_min_${detailName}`]
      ) {
        is_qualified = false;
      }
      num++;
    }
    //預測值
    machine.recommand_speed = [];
    machine.recommand_g_change = [];
    machine.recommand_frequency = [];
    machine.recommand_status = [];
    num = 1;
    while (json[`recommand_speed_${num}`] !== undefined) {
      machine.recommand_speed.push(json[`recommand_speed_${num}`]);
      machine.recommand_g_change.push(json[`recommand_g_change_${num}`]);
      machine.recommand_frequency.push(json[`recommand_frequency_${num}`]);
      machine.recommand_status.push(json[`recommand_Status_${num}`]);
      num++;
    }
    machine.is_qualified.push(is_qualified);

    if (unpass_predict_name !== undefined) {
      if (!is_qualified) {
        let data = repairData;
        let now = new Date(); // 取得現在的時間
        let timeThreshold = 20; // 分鐘數閾值

        // 檢查時間是否在閾值內的函式
        let isWithinTimeThreshold = (timeString, thresholdMinutes) => {
          let time = new Date(timeString);
          let diffMilliseconds = now - time;
          let diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
          return diffMinutes >= thresholdMinutes;
        };

        // 找出符合條件的資料
        let filteredData = data.filter((item) =>
          isWithinTimeThreshold(item.pred_time, timeThreshold)
        );
        for (let num = 0; num <= filteredData.length; num++) {
          if (
            filteredData.machine !== json.machine &&
            filteredData.product !== json.product
          ) {
            let InsertData = {
              machine: json.machine,
              product: json.product,
              Pred_time: json.time,
              Detail_name: unpass_predict_name.slice(
                0,
                unpass_predict_name.length - 1
              ),
            };
            // CallInsertAlarmStampersDataApi(InsertData);
          }
        }
      }
    }
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
          if (machine.Status.length >= 20) {
            Object.keys(machine).forEach((key) => {
              if (Array.isArray(machine[key])) {
                machine[key].shift();
              }
            });
            Object.keys(machine["pred_avg_detail"]).forEach((key) => {
              if (Array.isArray(machine["pred_avg_detail"][key])) {
                machine["pred_avg_detail"][key].shift();
              }
            });
            Object.keys(machine["pred_max_detail"]).forEach((key) => {
              if (Array.isArray(machine["pred_max_detail"][key])) {
                machine["pred_max_detail"][key].shift();
              }
            });
            Object.keys(machine["pred_min_detail"]).forEach((key) => {
              if (Array.isArray(machine["pred_min_detail"][key])) {
                machine["pred_min_detail"][key].shift();
              }
            });
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
      all_good_rate += good_rate;
    });
    all_good_rate =
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
        x: all_machine[0].time[i],
        y: ((1 - unpass / unpass_interval) * 100).toFixed(2),
      });
    }
    all_machine.forEach((obj) => {
      obj.is_qualified = obj.is_qualified.slice(-20);
    });
    setLineData(() => all_machine);
    let dataArray = [];
    for (let i = 0; i < all_machine.length; i++) {
      dataArray.push(all_machine[i]);
    }
    console.log("====================================");
    console.log(dataArray);
    setData(dataArray);
    setPassRate(() => tem_pass_rate);
    setPassRateProps({
      accumulativeMin: unpass_total_minute,
      accumulativeMinIn20: unpass_rate_20_min_total,
      accumulativePassRateIn20: all_good_rate,
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
    }
    setData(lineData);

    return; // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      CallApi(1);
    }, MINUTE_MS);
    return () => {
      clearInterval(interval);
    };
  }, [passRateProps]);

  var changePage = (value) => {
    setPage(value);
  };

  const editing = {
    mode: "Normal",
    allowEditing: true,
    template: dialogTemplete,
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

          <GridComponent
            id="gridcomp"
            dataSource={data}
            allowSorting
            contextMenuItems={contextMenuItems}
            editSettings={editing}
            enablePersistence={true}
          >
            <ColumnsDirective>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              {realtimeGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject services={[Sort, ContextMenu, Page, Edit]} />
          </GridComponent>
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
