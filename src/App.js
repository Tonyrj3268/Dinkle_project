import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import axios from "axios";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Admin,
  Realtime,
  Calendar,
  Fix,
  Stacked,
  Pyramid,
  Detail,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
  FixDetail,
  CostTotal,
  Cause,
  FutureAnalysis,
  NotFoundPage,
} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

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
const App = () => {
  const [data, setData] = useState([]);
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    setLineData,
    lineData,
    passRate,
    setPassRate,
    passRateProps,
    setPassRateProps,
  } = useStateContext();
  var pathname = window.location.pathname;
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
        ProcessData(res);
      })
      .catch(consoleError);
  };
  const formData = new URLSearchParams();
  formData.append("username", process.env.REACT_APP_extra_predict_username);
  formData.append("password", process.env.REACT_APP_extra_predict_password);
  const consoleError = (error) => {
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
  };
  const CallInsertAlarmStampersDataApi = (InsertData) => {
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
      .catch(consoleError);
  };
  const ProcessData = (res) => {
    console.log(res.data);
    if (typeof res.data === "string") {
      return;
    }
    let all_machine = lineData.slice();
    console.log("process data");
    console.log(all_machine);
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
      unpass_rate_20_min_total += obj.accumulativeMin;
      unpass_rate_20_min_times = 20;

      let good_rate = (
        1 -
        unpass_rate_20_min / unpass_rate_20_min_times
      ).toFixed(2);
      obj.good_rate = good_rate;
      all_good_rate += parseFloat(good_rate);
    });
    let accumulativePassRateIn20 =
      ((all_good_rate * 100) / all_machine.length).toFixed(2) + "%";
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
    console.log(tempassRate);
    setPassRate(() => tempassRate);
    console.log(all_machine);
    setLineData(() => all_machine);
    let dataArray = [];
    for (let i = 0; i < all_machine.length; i++) {
      dataArray.push(all_machine[i]);
    }

    setData(dataArray);
    setPassRateProps({
      accumulativeMin: unpass_total_minute,
      accumulativeMinIn20: unpass_rate_20_min_total,
      accumulativePassRateIn20: accumulativePassRateIn20,
    });
  };
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  const AddDataInMachine = (machine, json, unpass_predict_name) => {
    machine.time.push(json.time);
    machine.frequency.push(getRandomNumber(10, 22).toFixed(2));
    // machine.frequency.push(json.frequency + getRandomNumber(10, 22));
    // machine.Speed.push(json.Speed + getRandomNumber(0, json.Speed) / 2);
    machine.Speed.push(getRandomNumber(100, 300).toFixed(2));
    machine.Status.push(json.Status);
    machine.status_type.push(json.status_type);
    // machine.g_change.push(json.g_change + getRandomNumber(10000, 20000));
    machine.g_change.push(getRandomNumber(10000, 20000).toFixed(2));
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

    if (unpass_predict_name !== undefined) {
      if (!is_qualified) {
        // 找出符合條件的資料
        unpass_predict_name = unpass_predict_name.slice(
          0,
          unpass_predict_name.length - 1
        );
        let InsertData = {
          machine: json.machine,
          product: json.product,
          Pred_time: json.time,
          Detail_name: unpass_predict_name,
        };
        //CallInsertAlarmStampersDataApi(InsertData);
      }
    }
    return machine;
  };
  const MINUTE_MS = 60000;
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("call api");
      CallApi(1);
    }, MINUTE_MS);
    return () => {
      clearInterval(interval);
    };
  }, [passRateProps]);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {pathname !== "/404" ? (
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: "50%" }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
          ) : (
            <div className=""></div>
          )}

          {activeMenu && pathname !== "/404" ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div></div>
          )}

          <div
            className={
              activeMenu && pathname !== "/404"
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            {pathname !== "/404" ? (
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
            ) : (
              <div className="w-0"></div>
            )}

            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={<Realtime />} />

                {/* pages  */}
                <Route path="/Realtime" element={<Realtime />} />
                <Route path="/fix" element={<Fix />} />
                <Route path="/fixDetail" element={<FixDetail />} />

                <Route path="/cause" element={<Cause />} />
                <Route path="/futureanalysis" element={<FutureAnalysis />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/404" element={<NotFoundPage />} />
                {/* apps  */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
