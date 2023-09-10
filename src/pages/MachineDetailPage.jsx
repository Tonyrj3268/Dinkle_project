import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { DoubleLineChart } from "../components";
import { AllDetailChart } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { Machine, Repair } from "../models.js";
import axios from "axios";
const MachineDetailPage = () => {
  const formData = new URLSearchParams();
  formData.append("username", process.env.REACT_APP_extra_predict_username);
  formData.append("password", process.env.REACT_APP_extra_predict_password);

  const CallApi = (minAgo, machine_name, isCancelled) => {
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
      .then((res) => ProcessData40(res, machine_name, isCancelled))
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
    while (json[`Standard_detail_name_${num}`] !== undefined) {
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
      machine["standard_max_detail"][`Standard_max_${detailName}`] =
        json[`Standard_max_${detailName}`];
      machine["standard_min_detail"][`Standard_min_${detailName}`] =
        json[`Standard_min_${detailName}`];
      machine["standard_detail_name"][`Standard_detail_name_${num}`] =
        json[`Standard_detail_name_${num}`];
      if (
        json[`pred_max_${detailName}`] > json[`Standard_max_${detailName}`] ||
        json[`pred_min_${detailName}`] < json[`Standard_min_${detailName}`]
      ) {
        is_qualified = false;
        if (unpass_predict_name !== undefined) {
          unpass_predict_name += json[`Standard_detail_name_${num}`] + ",";
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
    while (json[`recommend_recommend_speed_${num}`] !== undefined) {
      machine.recommend_speed.push(json[`recommend_recommend_speed_${num}`]);
      machine.recommend_g_change.push(
        json[`recommend_recommend_g_change_${num}`]
      );
      machine.recommend_frequency.push(
        json[`recommend_recommend_frequency_${num}`]
      );
      machine.recommend_status.push(json[`recommend_recommend_Status_${num}`]);
      num++;
    }
    machine.is_qualified.push(is_qualified);
    return machine;
  };
  function ProcessData40(res, machine_name) {
    console.log(res);
    if (typeof res.data === "string") {
      return;
    }
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
        if (json.machine != machine_name) {
          continue;
        }
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
  }

  const {
    activeMenu,
    setLineData,
    lineData,
    passRate,
    setPassRate,
    passRateProps,
    setPassRateProps,
    repairData,
    setRepairData,
    setAllDetailData,
  } = useStateContext();
  const [data, setData] = useState([]);
  let { machine: machine_name } = useParams();
  useEffect(() => {
    if (lineData.length === 0) {
      CallApi(40, machine_name);
    }
    return () => {}; // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);
  useEffect(() => {
    if (lineData.length === 0) {
      return;
    }
    let targetMachine = lineData.find(
      (item) => item.machine && item.machine === machine_name
    );
    if (targetMachine === undefined) {
      return;
    }
    setData([targetMachine]);
    var tem = [];
    console.log(targetMachine);
    for (
      let i = 1;
      i <= Object.keys(targetMachine.pred_avg_detail).length;
      i++
    ) {
      tem.push({
        name: targetMachine.standard_detail_name[`Standard_detail_name_${i}`],
        details: targetMachine.pred_avg_detail[`pred_avg_detail_${i}`],
        details_max: targetMachine.pred_max_detail[`pred_max_detail_${i}`],
        details_min: targetMachine.pred_min_detail[`pred_min_detail_${i}`],
        max: targetMachine.standard_max_detail[`Standard_max_detail_${i}`],
        min: targetMachine.standard_min_detail[`Standard_min_detail_${i}`],
        time: targetMachine.time,
        location: targetMachine.location,
        detail_i: i,
      });
    }

    setAllDetailData(tem);
  }, [lineData]);

  if (data.length > 0) {
    return (
      <div className="flex flex-row">
        <div className="flex flex-row">
          <div className="flex-1 flex flex-col">
            <h1 className=" p-3 text-3xl font-semibold">{data[0].machine}</h1>
            <h1 className=" px-7 py-1 text-xl font-semibold">
              {data[0].time.length > 0
                ? new Date(
                    data[0].time[data[0].time.length - 1]
                  ).getFullYear() +
                  "年" +
                  (new Date(data[0].time[data[0].time.length - 1]).getMonth() +
                    1) +
                  "月" +
                  new Date(data[0].time[data[0].time.length - 1]).getDate() +
                  "日"
                : "等待更新"}
            </h1>
            <DoubleLineChart location={data[0].location}></DoubleLineChart>
          </div>
          <div className=" flex flex-row px-5 gap-10 ">
            <div className="flex flex-col">
              <div className="flex flex-col p-5 w-full mt-2 mb-2  bg-slate-500 rounded-xl justify-center text-white ">
                <p className=" text-2xl p-2">機台料號：{data[0].product}</p>
                <p className=" text-2xl p-2">機台名稱：{data[0].machine}</p>
                <div className="p-2 flex items-center gap-2">
                  <p className=" text-2xl">
                    當下轉速：
                    {data[0].Speed[data[0].Speed.length - 1]}
                  </p>
                </div>
                <div className="p-2 flex items-center gap-2">
                  <p className=" text-2xl">
                    當下頻率：
                    {data[0].frequency[data[0].frequency.length - 1]}
                  </p>
                </div>
                <div className="p-2 flex items-center gap-2">
                  <p className=" text-2xl">
                    當下狀態：
                    {data[0].status_type[data[0].status_type.length - 1]}
                  </p>
                </div>
                {data[0].have_vibration == 1 ? (
                  <div className="p-2 flex items-center gap-2">
                    <p className=" text-2xl">
                      當下G合力：
                      {data[0].g_change[data[0].g_change.length - 1]}
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="flex flex-col items-center p-5 w-full  bg-slate-500   text-white border-b-1 border-gray-200 rounded-t-xl ">
                <p className=" text-xl p-1 text-center ">未來四分鐘推薦參數</p>
              </div>
              {data[0].recommend_frequency.length < 4 ? (
                <div></div>
              ) : (
                <div className="container mx-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-white ">
                    <thead className="bg-slate-500">
                      <tr>
                        <th className="py-3 px-6 text-center ">分鐘</th>
                        <th className="py-3 px-6">頻率</th>
                        <th className="py-3 px-6">轉速</th>

                        {data[0].have_vibration == 0 ? (
                          <td className=""></td>
                        ) : (
                          <td className="py-3 px-6">G合力</td>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-slate-500 divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-6 text-center">1</td>
                        <td className="py-3 px-6">
                          {data[0].recommend_frequency[0].toFixed(2)}
                        </td>
                        <td className="py-3 px-6">
                          {data[0].recommend_speed[0]}
                        </td>

                        {data[0].have_vibration == 0 ? (
                          <td className=""></td>
                        ) : (
                          <td className="py-3 px-6">
                            {Math.round(data[0].recommend_g_change[0], 3)}
                          </td>
                        )}
                      </tr>
                      <tr>
                        <td className="py-3 px-6 text-center">2</td>
                        <td className="py-3 px-6">
                          {data[0].recommend_frequency[1].toFixed(2)}
                        </td>
                        <td className="py-3 px-6">
                          {data[0].recommend_speed[1]}
                        </td>
                        {data[0].have_vibration == 0 ? (
                          <td className=""></td>
                        ) : (
                          <td className="py-3 px-6">
                            {Math.round(data[0].recommend_g_change[1], 3)}
                          </td>
                        )}
                      </tr>
                      <tr>
                        <td className="py-3 px-6 text-center">3</td>
                        <td className="py-3 px-6">
                          {data[0].recommend_frequency[2].toFixed(2)}
                        </td>
                        <td className="py-3 px-6">
                          {data[0].recommend_speed[2]}
                        </td>
                        {data[0].have_vibration == 0 ? (
                          <td className=""></td>
                        ) : (
                          <td className="py-3 px-6">
                            {Math.round(data[0].recommend_g_change[2], 3)}
                          </td>
                        )}
                      </tr>
                      <tr>
                        <td className="py-3 px-6 text-center">4</td>
                        <td className="py-3 px-6 ">
                          {data[0].recommend_frequency[3].toFixed(2)}
                        </td>
                        <td className="py-3 px-6 ">
                          {data[0].recommend_speed[3]}
                        </td>
                        {data[0].have_vibration == 0 ? (
                          <td className=""></td>
                        ) : (
                          <td className="py-3 px-6">
                            {Math.round(data[0].recommend_g_change[3], 3)}
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex flex-col items-center p-2 w-full  bg-slate-500   text-white border-b-1 border-gray-200 rounded-b-xl border-t-1 "></div>
            </div>
          </div>
        </div>

        <div className="flex">
          <AllDetailChart height={"200px"} width={"300px"} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row">
        <div className="flex-1 flex flex-col items-start">
          <h1 className=" p-3 text-3xl font-semibold">
            {"API 未回傳該機台資料"}
          </h1>
          <h1 className=" px-7 py-1 text-xl font-semibold">
            {"等待更新或啟動機台"}
          </h1>
          <div className=" flex flex-row px-5 gap-10 ">
            <div className="flex flex-col">
              <div className="flex flex-col p-5 w-full h-full mb-2  bg-slate-500 rounded-xl justify-start items-start text-white ">
                <p className=" text-2xl p-2">機台料號：{}</p>
                <p className=" text-2xl p-2">機台名稱：{machine_name}</p>
                <div className="p-2 flex items-center gap-2">
                  <p className=" text-2xl">
                    當下轉速：
                    {}
                  </p>
                </div>
                <div className="p-2 flex items-center gap-2">
                  <p className=" text-2xl">
                    當下頻率：
                    {}
                  </p>
                </div>
                <div className="p-2 flex items-center gap-2">
                  <p className=" text-2xl">
                    當下狀態：
                    {"無資料"}
                  </p>
                </div>

                <div className="p-2 flex items-center gap-2">
                  <p className=" text-2xl">
                    當下G合力：
                    {}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center p-5 w-full  bg-slate-500   text-white border-b-1 border-gray-200 rounded-t-xl ">
                <p className=" text-xl p-1 text-center ">未來四分鐘推薦參數</p>
              </div>

              <div className="container mx-auto">
                <table className="min-w-full divide-y divide-gray-200 text-white ">
                  <thead className="bg-slate-500">
                    <tr>
                      <th className="py-3 px-6 text-center ">分鐘</th>
                      <th className="py-3 px-6">頻率</th>
                      <th className="py-3 px-6">轉速</th>
                      <td className="py-3 px-6">G合力</td>
                    </tr>
                  </thead>
                  <tbody className="bg-slate-500 divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-6 text-center">1</td>
                      <td className="py-3 px-6">{}</td>
                      <td className="py-3 px-6">{}</td>

                      <td className="py-3 px-6">{}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 text-center">2</td>
                      <td className="py-3 px-6">{}</td>
                      <td className="py-3 px-6">{}</td>
                      <td className="py-3 px-6">{}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 text-center">3</td>
                      <td className="py-3 px-6">{}</td>
                      <td className="py-3 px-6">{}</td>
                      <td className="py-3 px-6">{}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 text-center">4</td>
                      <td className="py-3 px-6 ">{}</td>
                      <td className="py-3 px-6 ">{}</td>
                      <td className="py-3 px-6">{}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col items-center p-2 w-full  bg-slate-500   text-white border-b-1 border-gray-200 rounded-b-xl border-t-1 "></div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex">
          <AllDetailChart height={"200px"} width={"300px"} />
        </div>
      </div>
    );
  }
};

export default MachineDetailPage;
