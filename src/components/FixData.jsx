import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useStateContext } from ".././contexts/ContextProvider";

const FixData = ({ props }) => {
  var click = () => {
    console.log(props);
  };

  if (props.result === "回報維修中") {
    return (
      <Link to="/fixDetail" state={props}>
        <div
          onClick={(e) => {
            click();
          }}
          className=" p-4 border-1 cursor-pointer flex flex-col rounded-xl hover:bg-slate-600 bg-slate-500 "
        >
          <div className="flex text-sm gap-4">
            <p>{props.date1}</p>
            <p>{props.cause}</p>
            <p>{props.date2}</p>
          </div>
          <div className="flex gap-4">
            <p>{props.time1}</p>
            <p>{props.time2}</p>
            <p className="ml-9">{props.result}</p>
          </div>
          <dialog id="infoModal"></dialog>
        </div>
      </Link>
    );
  } else if (props.result === "不採取維修") {
    return (
      <Link to="/fixDetail" state={props}>
        <div
          onClick={(e) => {
            click();
          }}
          className=" p-4 border-1 cursor-pointer flex flex-col rounded-xl hover:bg-red-600 bg-red-500 "
        >
          <div className="flex text-sm gap-4">
            <p>{props.date1}</p>
            <p>{props.cause}</p>
            <p>{props.date2}</p>
          </div>
          <div className="flex gap-4">
            <p>{props.time1}</p>
            <p>{props.time2}</p>
            <p className="ml-9">{props.result}</p>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link to="/fixDetail" state={props}>
        <div
          onClick={(e) => {
            click();
          }}
          className=" p-4 border-1 cursor-pointer flex flex-col rounded-xl hover:bg-green-600 bg-green-500  "
        >
          <div className="flex text-sm gap-4">
            <p>{props.date1}</p>
            <p>{props.cause}</p>
            <p>{props.date2}</p>
          </div>
          <div className="flex gap-4">
            <p>{props.time1}</p>
            <p>{props.time2}</p>
            <p className="ml-9">{props.result}</p>
          </div>
          <dialog id="123"></dialog>
        </div>
      </Link>
    );
  }
};

export default FixData;
