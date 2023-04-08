import React from "react";
import { useStateContext } from ".././contexts/ContextProvider";

const Tr = ({ props }) => {
  const { setLineData, lineDat, isTrClicked, setIsTrClicked } =
    useStateContext();
  var click = () => {
    setLineData(props);
    setIsTrClicked(props.Detail);
    console.log(props);
  };

  return (
    <div>
      {isTrClicked == props.Detail ? (
        <div
          className=" flex py-2 items-center justify-center p-1 my-2 gap-3 text-sm cursor-pointer bg-slate-900  "
          onClick={(e) => {
            click();
          }}
        >
          <p className=" font-bold  ">{props.Detail} </p>
          <p className=" font-bold ">{props.CorrectRange}</p>
          <p className="font-bold ">{props.RealRange} </p>
          {props.Status == "合格" ? (
            <p className="font-bold p-1 bg-green-400 rounded-full ">
              {props.Status}
            </p>
          ) : (
            <p className="font-bold  p-1 bg-red-600  rounded-full">
              {props.Status}
            </p>
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
          <p className=" font-bold  ">{props.Detail} </p>
          <p className=" font-bold ">{props.CorrectRange}</p>
          <p className="font-bold ">{props.RealRange} </p>
          {props.Status == "合格" ? (
            <p className="font-bold p-1 bg-green-400 rounded-full ">
              {props.Status}
            </p>
          ) : (
            <p className="font-bold  p-1 bg-red-600  rounded-full">
              {props.Status}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Tr;
