import React from "react";
import { useStateContext } from ".././contexts/ContextProvider";

const Tr = ({ props }) => {
  const { lineData, setLineData, isTrClicked, setIsTrClicked, setDetailData } =
    useStateContext();
  var click = () => {
    var tem = [];
    for (var i = 0; i < props.details.length; i++) {
      tem.push({ x: lineData[props.location].time[i], y: props.details[i] });
    }
    setDetailData({
      max: props.max,
      min: props.min,
      details: props.detail_i,
      location: props.location,
    });
    setIsTrClicked(props.name);
    console.log(props);
  };

  return (
    <div>
      {isTrClicked == props.name ? (
        <div
          className=" flex py-2 items-center justify-center p-1 my-2 gap-3 text-sm cursor-pointer bg-slate-900  "
          onClick={(e) => {
            click();
          }}
        >
          <p className=" font-bold  ">{props.name} </p>
          <p className=" font-bold ">
            {props.min}-{props.max}{" "}
          </p>
          <p className=" font-bold ">
            {
              lineData[props.location].pred_min_detail[
                `pred_min_detail_${props.detail_i}`
              ][
                lineData[props.location].pred_min_detail[
                  `pred_min_detail_${props.detail_i}`
                ].length - 1
              ]
            }
            -
            {
              lineData[props.location].pred_max_detail[
                `pred_max_detail_${props.detail_i}`
              ][
                lineData[props.location].pred_max_detail[
                  `pred_max_detail_${props.detail_i}`
                ].length - 1
              ]
            }{" "}
          </p>
          {lineData[props.location].pred_max_detail[
            `pred_max_detail_${props.detail_i}`
          ][
            lineData[props.location].pred_max_detail[
              `pred_max_detail_${props.detail_i}`
            ].length - 1
          ] > props.max ||
          lineData[props.location].pred_min_detail[
            `pred_min_detail_${props.detail_i}`
          ][
            lineData[props.location].pred_min_detail[
              `pred_min_detail_${props.detail_i}`
            ].length - 1
          ] < props.min ? (
            <p className="font-bold p-1 bg-red-600 rounded-full ">不合格</p>
          ) : (
            <p className="font-bold  p-1 bg-green-400  rounded-full">合格</p>
          )}
        </div>
      ) : (
        <div
          className=" flex py-2 items-center justify-center p-1 my-2 gap-3 text-sm cursor-pointer bg-slate-800 hover:bg-slate-900"
          onClick={(e) => {
            click();
          }}
        >
          {" "}
          <p className=" font-bold  ">{props.name} </p>
          <p className=" font-bold ">
            {props.min}-{props.max}{" "}
          </p>
          <p className=" font-bold ">
            {
              lineData[props.location].pred_min_detail[
                `pred_min_detail_${props.detail_i}`
              ][
                lineData[props.location].pred_min_detail[
                  `pred_min_detail_${props.detail_i}`
                ].length - 1
              ]
            }
            -
            {
              lineData[props.location].pred_max_detail[
                `pred_max_detail_${props.detail_i}`
              ][
                lineData[props.location].pred_max_detail[
                  `pred_max_detail_${props.detail_i}`
                ].length - 1
              ]
            }{" "}
          </p>
          {lineData[props.location].pred_max_detail[
            `pred_max_detail_${props.detail_i}`
          ][
            lineData[props.location].pred_max_detail[
              `pred_max_detail_${props.detail_i}`
            ].length - 1
          ] > props.max ||
          lineData[props.location].pred_min_detail[
            `pred_min_detail_${props.detail_i}`
          ][
            lineData[props.location].pred_min_detail[
              `pred_min_detail_${props.detail_i}`
            ].length - 1
          ] < props.min ? (
            <p className="font-bold p-1 bg-red-600 rounded-full ">不合格</p>
          ) : (
            <p className="font-bold  p-1 bg-green-400  rounded-full">合格</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Tr;
