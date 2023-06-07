import React, { useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { Link, NavLink } from "react-router-dom";

import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  earningData,
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
} from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import product9 from "../data/product9.jpg";
import { useNavigate } from "react-router-dom";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Admin = () => {
  const { currentColor, currentMode } = useStateContext();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  var verlified = true;
  var query = JSON.parse(process.env.REACT_APP_extra_query);
  var ans_query = JSON.parse(process.env.REACT_APP_extra_query_ans);
  console.log(query);
  console.log(ans_query);
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

    return; // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [verlified]);

  return (
    <div className="mt-24">
      {verlified ? (
        <div className="flex flex-wrap lg:flex-nowrap ml-20 ">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3  bg-center">
            <div className="flex justify-between items-cente ">
              <div>
                <p className="font-bold text-gray-400">Settings</p>
                <p className="text-2xl font-bold ">即時監控分析</p>
              </div>
              <button
                type="button"
                style={{ backgroundColor: currentColor }}
                className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
              >
                <BsCurrencyDollar />
              </button>
            </div>
            <div className="mt-8">
              <Link
                to={"/realtime"}
                className=" rounded-xl text-white px-[14px] py-[14px]"
                style={{ backgroundColor: currentColor }}
              >
                Check
              </Link>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3  bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-400">Settings</p>
                <p className="text-2xl font-bold ">Detail預測分析</p>
              </div>
              <button
                type="button"
                style={{ backgroundColor: currentColor }}
                className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
              >
                <BsCurrencyDollar />
              </button>
            </div>
            <div className="mt-8">
              <Link
                to={"/realtime"}
                className=" rounded-xl text-white px-[14px] py-[14px]"
                style={{ backgroundColor: currentColor }}
              >
                Check
              </Link>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3  bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-400">Settings</p>
                <p className="text-2xl font-bold ">維修項目</p>
              </div>

              <button
                type="button"
                style={{ backgroundColor: currentColor }}
                className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
              >
                <BsCurrencyDollar />
              </button>
            </div>
            <div className="mt-8">
              <Link
                to={"/fix"}
                className=" rounded-xl text-white px-[14px] py-[14px]"
                style={{ backgroundColor: currentColor }}
              >
                Check
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>false</div>
      )}
    </div>
  );
};

export default Admin;
