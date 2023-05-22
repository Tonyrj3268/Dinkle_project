import React, { useState, useEffect } from "react";
import { Header } from "../components";
import axios from "axios";

const Cause = () => {
  const [inputFixTimeValue, setInputFixTimeValue] = useState("預測成本統計");
  const [causeData, setCauseData] = useState([]);
  useEffect(() => {
    const formData = new URLSearchParams();
    formData.append("username", process.env.REACT_APP_extra_predict_username);
    formData.append("password", process.env.REACT_APP_extra_predict_password);
    let url = process.env.REACT_APP_extract_taguchi_result_data;
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data);
        setCauseData(res.data);
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
