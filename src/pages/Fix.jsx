import React, { useState, useEffect } from "react";
import { employeesData } from "../data/dummy";
import { Header } from "../components";
import FixData from "../components/FixData";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
const Fix = () => {
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
    if (typeof res.data === "string") {
      return;
    }
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
    console.log(all_repair);
  };
  const CallAlarmStampersDataApi = () => {
    const formData = new URLSearchParams();
    formData.append("username", process.env.REACT_APP_extra_predict_username);
    formData.append("password", process.env.REACT_APP_extra_predict_password);

    let now = new Date(); // 取得現在的時間

    // 計算一個月前的時間
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
  const { repairData, setRepairData } = useStateContext();
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
    CallAlarmStampersDataApi();
  }, []);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="維修項目" />
      <div className=" w-full h-full flex flex-col gap-4 font-semibold text-white">
        {repairData.map((d, i) => (
          <FixData props={d} key={i}></FixData>
        ))}
      </div>
    </div>
  );
};
export default Fix;
// <div className="p-4 flex justify-center gap-4 ">
// <button className="flex justify-center items-center w-8 h-8  ">
//   <img
//     src="https://cdn4.iconfinder.com/data/icons/geomicons/32/672373-chevron-left-512.png"
//     className="w-6 h-6 to-gray-800 stroke-current hover:text-indigo-600"
//   />
// </button>
// <button className="flex justify-center items-center w-8 h-8">
//   <img
//     src="https://cdn4.iconfinder.com/data/icons/geomicons/32/672374-chevron-right-512.png"
//     className="w-6 h-6 to-gray-800 stroke-current hover:text-indigo-600"
//   />
// </button>
// </div>
