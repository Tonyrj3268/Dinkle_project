import React, { useState, useEffect } from "react";
import { Header } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const [inputProduct, setInputProductValue] = useState([]);
  const [causeData, setCauseData] = useState([]);
  const [presentData, setPresentData] = useState([]);
  const [totalData, setTotalData] = useState({
    不處理數量: 0,
    空白數量: 0,
    處理數量: 0,
  });
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
  var setProductData = (props) => {
    var temp = [];
    for (var i = 0; i < causeData.length; i++) {
      if (causeData[i].product == props) {
        temp.push(causeData[i]);
      }
    }
    console.log(temp);
    console.log(props);
    setPresentData(temp);
  };
  getQuery();
  useEffect(() => {
    console.log("The verlified is " + verlified);
    if (verlified === false) {
      navigate("/404");
    }
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
        setPresentData(firstResponse.data);
        setCauseData(firstResponse.data);
        setTotalData(secondResponse.data[0]);
        var inputProduct = [];
        for (var i = 0; i < firstResponse.data.length; i++) {
          if (!inputProduct.includes(firstResponse.data[i].product)) {
            inputProduct.push(firstResponse.data[i].product);
          }
        }
        setInputProductValue(inputProduct);
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
        <div className="flex gap-2">
          <div className=" dark:text-gray-200 bg-green-500 h-32 rounded-xl w-1/3 px-4 py-5 m-1  bg-center">
            <div className="flex justify-between items-center ">
              <div>
                <p>處理總數</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold ">{totalData.處理數量}</p>
            </div>
          </div>
          <div className=" dark:text-gray-200 bg-green-500 h-32 rounded-xl w-1/3 px-4 py-5 m-1  bg-center">
            <div className="flex justify-between items-center ">
              <div>
                <p>不處理總數</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold ">{totalData.不處理數量}</p>
            </div>
          </div>
          <div className=" dark:text-gray-200 bg-green-500 h-32 rounded-xl w-1/3 px-4 py-5 m-1  bg-center">
            <div className="flex justify-between items-center ">
              <div>
                <p>尚未處理總數</p>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-3xl font-bold ">{totalData.空白數量}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-4">
          <p className=" text-white w-1/4 p-2 bg-green-500 text-center rounded-full ">
            選擇料號：
          </p>
          <select
            onChange={(e) => {
              setProductData(e.target.value);
            }}
            className=" border-1 w-3/4 text-black text-center rounded-full"
            placeholder="料號選擇"
          >
            {inputProduct.map((d, i) => (
              <option id={i + d} value={d}>
                {d}
              </option>
            ))}
            <option id="123" value="123">
              測試完全沒有的料號
            </option>
          </select>
        </div>

        {presentData.map((d, i) => (
          <div
            key={i}
            className=" flex flex-col gap-2 text-white p-4  rounded-2xl bg-slate-500 "
          >
            {" "}
            <p className="text-xl font-bold  ">Detail : {d.detail_name}</p>
            <p className="text-l font-bold  ">料號 : {d.product}</p>
            <p className="text-l font-bold ">
              重要因子 :{" "}
              {d.influence_mode == "Status"
                ? "Status是否正常"
                : `${d.influence_mode}誤差是否在一個標準差內`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cause;
