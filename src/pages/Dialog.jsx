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
        temp_data.lineChartData2.push(
          temp_data.selectChartData2[temp_data.lineChartData2.length]
        );
        console.log("update");
        console.log(temp_data);
        console.log(temp_data.lineChartData1);
        setLineData(temp_data);
      } else if (
        lineData.lineChartData1.length === 7 &&
        lineData.selectChartData1.length - 7 > lineData.times
      ) {
        lineData.times = lineData.times + 1;
        console.log(lineData.times);
        var temp_data = lineData;
        for (var i = 0; i < 7; i++) {
          temp_data.lineChartData1[i] =
            temp_data.selectChartData1[i + lineData.times];
          temp_data.lineMin[i].x =
            temp_data.selectChartData1[i + lineData.times].x;
          temp_data.lineMax[i].x =
            temp_data.selectChartData1[i + lineData.times].x;
          //line2
          temp_data.lineChartData2[i] =
            temp_data.selectChartData2[i + lineData.times];
        }
        console.log("update_new");
        setLineData(temp_data);
        // console.log(temp_data.lineChartData[0]);
      } else {
        lineData.times = 0;
        console.log("no");
      }
      setTest((prev) => prev + 1);
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
      <DialogContent>
        <div className=" flex flex-row px-5 gap-10">
          <DoubleLineChart bg={"white"} height={"450px"} width={"700px"} />
          <div className="flex flex-col p-5 w-[340px] h-[450px] bg-red-600 rounded-xl justify-start items-start text-white ">
            <p className=" text-2xl p-2">機台ID：{props.ID}</p>
            <p className=" text-2xl p-2">機台名稱：{props.Name}</p>
            <p className=" text-2xl p-2">轉速：5.5</p>
            <p className=" text-2xl p-2">頻率：3.1</p>
            <p className=" text-2xl p-2">狀態：1</p>
            <p className=" text-2xl p-2">G合力：1</p>
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
