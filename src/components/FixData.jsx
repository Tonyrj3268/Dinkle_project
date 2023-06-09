import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useStateContext } from ".././contexts/ContextProvider";
import axios from "axios";
const FixData = ({ props }) => {
  const { setRepairData } = useStateContext();
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
    console.log(all_repair);
  };
  const formatTime = (date) => {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");
    let seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
  const CallUpdateAlarmStampersDataApi = (status) => {
    const formData = new URLSearchParams();
    formData.append("username", process.env.REACT_APP_extra_predict_username);
    formData.append("password", process.env.REACT_APP_extra_predict_password);
    let now = new Date(); // 取得現在的時間
    //check if props.machine、product、pred_time is undefined
    if (
      props.machine === undefined ||
      props.product === undefined ||
      props.pred_time === undefined
    ) {
      console.log("props.machine、product、pred_time is undefined");
      return;
    }
    const params = {
      Machine: props.machine,
      Product: props.product,
      Pred_time: props.pred_time,
      Alarm_status_time: formatTime(now),
      Alarm_status: status,
    };

    let url = process.env.REACT_APP_update_alarm_stampers_data;
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: params,
      })
      .then((res) => {
        if (res.data == "update success") {
          CallAlarmStampersDataApi();
        } else {
          console.log("更新維修項目API問題");
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
  var click = (status) => {
    CallUpdateAlarmStampersDataApi(status);
  };

  if (props.alarm_status === undefined) {
    return (
      <div className=" flex flex-row justify-between  p-4 border-1 hover:bg-slate-600 bg-slate-500 rounded-xl">
        <div className="flex flex-col  ">
          <div className="flex text-sm gap-4">
            <p>{props.pred_time}</p>
            <p>預測規格異常</p>
          </div>
          <div className="flex gap-4">
            <div className="flex ">
              <p>料號:{props.product}</p>
              <p>機器:{props.machine}</p>
            </div>
            <div className="flex">
              <p>規格示警:{props.detail_name}</p>
              <p className="ml-9">未處理</p>
            </div>
          </div>

          <dialog id="infoModal"></dialog>
        </div>
        <div className="flex px-4 justify-center gap-4">
          <button
            onClick={(e) => click("已處理")}
            className="px-6 py-2 bg-black hover:bg-green-400 text-white rounded-full"
          >
            已處理
          </button>

          <button
            onClick={(e) => click("不處理")}
            className="px-6 py-2 bg-black hover:bg-red-600 text-white rounded-full"
          >
            不處理
          </button>
        </div>
      </div>
    );
  } else if (props.alarm_status === "不處理") {
    return (
      <div
        onClick={(e) => {
          click();
        }}
        className=" p-4 border-1 cursor-pointer flex flex-col rounded-xl hover:bg-red-600 bg-red-500 "
      >
        <div className="flex text-sm gap-4">
          <p>{props.pred_time}</p>
          <p>預測規格異常</p>
        </div>
        <div className="flex gap-4">
          <div className="flex ">
            <p>料號:{props.product}</p>
            <p>機器:{props.machine}</p>
          </div>
          <div className="flex">
            <p>規格示警:{props.detail_name}</p>
            <p className="ml-9">不處理</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={(e) => {
          click();
        }}
        className=" p-4 border-1 cursor-pointer flex flex-col rounded-xl hover:bg-green-600 bg-green-500  "
      >
        <div className="flex text-sm gap-4">
          <p>{props.pred_time}</p>
          <p>預測規格異常</p>
        </div>
        <div className="flex gap-4">
          <div className="flex ">
            <p>料號:{props.product}</p>
            <p>機器:{props.machine}</p>
          </div>
          <div className="flex">
            <p>規格示警:{props.detail_name}</p>
            <p className="ml-9">已處理</p>
          </div>
        </div>
        <dialog id="123"></dialog>
      </div>
    );
  }
};

export default FixData;
