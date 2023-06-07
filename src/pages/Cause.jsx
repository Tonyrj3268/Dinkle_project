import React, { useState, useEffect } from "react";
import { Header } from "../components";
import axios from "axios";

const Cause = () => {
  const formatTime = (date) => {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");
    let seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const [inputFixTimeValue, setInputFixTimeValue] = useState("預測成本統計");
  const [causeData, setCauseData] = useState([]);
  useEffect(() => {
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
    let url = process.env.REACT_APP_extract_taguchi_result_data;
    console.log(url);
    let url2 = process.env.REACT_APP_count_alarm_stampers_data;
    console.log(url2);
    Promise.all([
      axios.post(url, formData, {}),
      axios.post(url2, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: params,
      }),
    ])
      .then((res) => {
        const [firstResponse, secondResponse] = res;
        console.log(firstResponse.data);
        console.log(secondResponse.data);
        setCauseData(firstResponse.data);
        // setCauseData(secondResponse.data)
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
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl space-y-5">
      <div className="">
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          歷史分析
        </p>
      </div>

      <div className=" w-full h-full flex flex-col gap-4 font-semibold text-white">
        {causeData.map((d, i) => (
          <div
            key={i}
            className=" flex flex-col gap-2 text-white p-4 bg-white rounded-2xl bg-slate-500 "
          >
            {" "}
            <p className="text-xl font-bold  ">Detail : {d.detail_name}</p>
            <p className="text-l font-bold  ">料號 : {d.product}</p>
            <p className="text-l font-bold  ">
              有沒有震動儀 : {d.have_vibration == 0 ? "沒有" : "有"}
            </p>
            <p className="text-l font-bold ">重要因子 : {d.influence_mode}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cause;
