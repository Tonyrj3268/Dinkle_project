import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DoubleLineChart } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
const DiaLog = (props) => {
  const { currentMode } = useStateContext();
  const [open, setOpen] = React.useState(true);
  const { activeMenu, lineData, setLineData, test, setTest, setIsTrClicked } =
    useStateContext();

  const MINUTE_MS = 3000;
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        (lineData.lineChartData1.length === 0 &&
          lineData.selectChartData1.length === 0) ||
        props.Name !== lineData.Detail
      ) {
        var changeLineData = (props) => {
          console.log("init");
          setLineData({
            Detail: props.Name,
            CorrectRange: props.CorrectRange,
            RealRange: props.RealRange,
            Status: props.Status,
            lineChartData1: props.lineChartData1,
            selectChartData1: props.selectChartData1,
            lineChartData2: props.lineChartData2,
            selectChartData2: props.selectChartData2,
            BestRate: props.BestRate,
            BestStatus: props.BestStatus,
            BestTimes: props.BestTimes,
            times: props.times,
            Shap: props.Shap,
            lineMin: props.lineMin,
            lineMax: props.lineMax,
            lineNow: props.lineNow,
            lineFuture: props.lineFuture,
          });
        };
        changeLineData(props);
      } else if (
        lineData.lineChartData1.length < 7 &&
        lineData.selectChartData1.length > 0
      ) {
        var temp_data = lineData;
        temp_data.lineChartData1.push(
          temp_data.selectChartData1[temp_data.lineChartData1.length]
        );
        // temp_data.lineChartData2.push(
        //   temp_data.selectChartData2[temp_data.lineChartData2.length]
        // );
        var data_now = [];
        var data_future = [];
        for (var i = 0; i < temp_data.lineChartData1.length; i++) {
          if (i < 3) {
            data_now.push(temp_data.lineChartData1[i]);
          } else if (i === 3) {
            data_future.push(temp_data.lineChartData1[i]);
            data_now.push(temp_data.lineChartData1[i]);
          } else {
            data_future.push(temp_data.lineChartData1[i]);
          }
        }
        temp_data.lineNow = data_now;
        temp_data.lineFuture = data_future;

        console.log("update");
        console.log(temp_data);
        console.log(temp_data.lineChartData1);
        setLineData(temp_data);
      } else if (
        lineData.lineChartData1.length === 7 &&
        lineData.selectChartData1.length - 7 > lineData.times
      ) {
        lineData.times = lineData.times + 1;

        var temp_data = lineData;
        for (var i = 0; i < 7; i++) {
          temp_data.lineChartData1[i] =
            temp_data.selectChartData1[i + lineData.times];
          temp_data.lineMin[i].x =
            temp_data.selectChartData1[i + lineData.times].x;
          temp_data.lineMax[i].x =
            temp_data.selectChartData1[i + lineData.times].x;

          //line2
          // temp_data.lineChartData2[i] =
          //   temp_data.selectChartData2[i + lineData.times];
        }
        for (var i = 0; i < temp_data.lineChartData2.length; i++) {
          temp_data.lineChartData2[i].x = temp_data.lineChartData1[3].x;
        }
        var data_now = [];
        var data_future = [];
        for (var i = 0; i < temp_data.lineChartData1.length; i++) {
          if (i < 3) {
            data_now.push(temp_data.lineChartData1[i]);
          } else if (i === 3) {
            data_future.push(temp_data.lineChartData1[i]);
            data_now.push(temp_data.lineChartData1[i]);
          } else {
            data_future.push(temp_data.lineChartData1[i]);
          }
        }
        console.log(temp_data);
        temp_data.lineNow = data_now;
        temp_data.lineFuture = data_future;
        console.log(temp_data);
        console.log("update_new");
        setLineData(temp_data);

        // console.log(temp_data.lineChartData[0]);
      } else {
        lineData.times = 0;
        console.log("no");
      }
      setTest((prev) => prev + 1);
      console.log(lineData.lineNow[0].x.getFullYear());
      console.log("Logs every minute");
    }, MINUTE_MS);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [lineData.lineChartData1, lineData.lineMax, lineData.lineMin]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="lg"
    >
      <h1 className=" p-7 text-3xl font-semibold">{props.Name}</h1>
      <h1 className=" px-7 py-2 text-xl font-semibold">
        {lineData.lineNow.length > 0
          ? lineData.lineNow[0].x.getFullYear() +
            "年" +
            lineData.lineNow[0].x.getMonth() +
            "月" +
            lineData.lineNow[0].x.getDate() +
            "日"
          : "等待更新"}
      </h1>
      <DialogContent>
        <div className=" flex flex-row px-5 gap-10">
          <div className=" flex flex-col">
            <div>
              <p className="text-lg text-gray-600">轉速</p>
              <DoubleLineChart
                id={"1"}
                bg={"white"}
                height={"140px"}
                width={"700px"}
              />
            </div>
            <div>
              <p className="text-lg text-gray-600">頻率</p>
              <DoubleLineChart
                id={"2"}
                bg={"white"}
                height={"140px"}
                width={"700px"}
              />
            </div>
            <div>
              <p className="text-lg text-gray-600">狀態</p>
              <DoubleLineChart
                id={"3"}
                bg={"white"}
                height={"140px"}
                width={"700px"}
              />
            </div>
            <div>
              <p className="text-lg text-gray-600">G合力</p>
              <DoubleLineChart
                id={"4"}
                bg={"white"}
                height={"140px"}
                width={"700px"}
              />
            </div>
          </div>

          <div className="flex flex-col p-5 w-[340px] h-full bg-red-600 rounded-xl justify-start items-start text-white ">
            <p className=" text-2xl p-2">機台ID：{props.ID}</p>
            <p className=" text-2xl p-2">機台名稱：{props.Name}</p>
            <div className="p-2 flex items-center gap-2">
              <p className=" text-2xl">轉速：5.5</p>
            </div>
            <div className="p-2 flex items-center gap-2">
              <p className=" text-2xl">頻率：3.1</p>
            </div>
            <div className="p-2 flex items-center gap-2">
              <p className=" text-2xl">狀態：1</p>
            </div>
            <div className="p-2 flex items-center gap-2">
              <p className=" text-2xl">G合力：1</p>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiaLog;
