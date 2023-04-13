import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DoubleLineChart } from "../components";
import { LineChart } from "../components";
import Tr from "../components/Tr";
import { useStateContext } from "../contexts/ContextProvider";
import { compose } from "@mui/system";
import axios from 'axios';

const DiaLog = (props) => {
  const { currentMode } = useStateContext();
  const [open, setOpen] = React.useState(true);
  const [page, setPage] = React.useState("選擇畫面");
  const {
    activeMenu,
    lineData,
    setLineData,
    test,
    setTest,
    doubleLineData,
    setDoubleLineData,
    setIsTrClicked,
  } = useStateContext();

  const MINUTE_MS = 3000;
  var intervalArray = [];
  useEffect(() => {
    if (page === "機台") {
      const interval = setInterval(() => {
        if (
          (doubleLineData.state.lineChartData1.length === 0 &&
            doubleLineData.state.selectChartData1.length === 0) ||
          props.Name !== doubleLineData.Detail
        ) {
          var changeLineData = (props) => {
            console.log("init");
            var temp = {
              Detail: props.Name,
              CorrectRange: props.CorrectRange,
              RealRange: props.RealRange,
              Status: props.Status,
              speed: props.speed,
              state: props.state,
              frequency: props.frequency,
              G: props.G,
              times: props.times,
            };
            console.log(temp);
            setDoubleLineData(temp);

            console.log(doubleLineData);
          };
          changeLineData(props);
        } else if (
          doubleLineData.state.lineChartData1.length < 7 &&
          doubleLineData.state.selectChartData1.length > 0
        ) {
          var temp_data = doubleLineData;
          //state
          temp_data.state.lineChartData1.push(
            temp_data.state.selectChartData1[
              temp_data.state.lineChartData1.length
            ]
          );
          var data_now = [];
          var data_future = [];
          for (var i = 0; i < temp_data.state.lineChartData1.length; i++) {
            if (i < 3) {
              data_now.push(temp_data.state.lineChartData1[i]);
            } else if (i === 3) {
              data_future.push(temp_data.state.lineChartData1[i]);
              data_now.push(temp_data.state.lineChartData1[i]);
            } else {
              data_future.push(temp_data.state.lineChartData1[i]);
            }
          }
          temp_data.state.lineNow = data_now;
          temp_data.state.lineFuture = data_future;
          //speed
          temp_data.speed.lineChartData1.push(
            temp_data.speed.selectChartData1[
              temp_data.speed.lineChartData1.length
            ]
          );
          var data_now = [];
          var data_future = [];
          for (var i = 0; i < temp_data.speed.lineChartData1.length; i++) {
            if (i < 3) {
              data_now.push(temp_data.speed.lineChartData1[i]);
            } else if (i === 3) {
              data_future.push(temp_data.speed.lineChartData1[i]);
              data_now.push(temp_data.speed.lineChartData1[i]);
            } else {
              data_future.push(temp_data.speed.lineChartData1[i]);
            }
          }
          temp_data.speed.lineNow = data_now;
          temp_data.speed.lineFuture = data_future;
          //fre
          temp_data.frequency.lineChartData1.push(
            temp_data.frequency.selectChartData1[
              temp_data.frequency.lineChartData1.length
            ]
          );
          var data_now = [];
          var data_future = [];
          for (var i = 0; i < temp_data.frequency.lineChartData1.length; i++) {
            if (i < 3) {
              data_now.push(temp_data.frequency.lineChartData1[i]);
            } else if (i === 3) {
              data_future.push(temp_data.frequency.lineChartData1[i]);
              data_now.push(temp_data.frequency.lineChartData1[i]);
            } else {
              data_future.push(temp_data.frequency.lineChartData1[i]);
            }
          }
          temp_data.frequency.lineNow = data_now;
          temp_data.frequency.lineFuture = data_future;
          //G
          temp_data.G.lineChartData1.push(
            temp_data.G.selectChartData1[temp_data.G.lineChartData1.length]
          );
          var data_now = [];
          var data_future = [];
          for (var i = 0; i < temp_data.G.lineChartData1.length; i++) {
            if (i < 3) {
              data_now.push(temp_data.G.lineChartData1[i]);
            } else if (i === 3) {
              data_future.push(temp_data.G.lineChartData1[i]);
              data_now.push(temp_data.G.lineChartData1[i]);
            } else {
              data_future.push(temp_data.G.lineChartData1[i]);
            }
          }
          temp_data.G.lineNow = data_now;
          temp_data.G.lineFuture = data_future;
          console.log("update");

          setDoubleLineData(temp_data);
        } else if (
          doubleLineData.state.lineChartData1.length === 7 &&
          doubleLineData.state.selectChartData1.length - 7 >
            doubleLineData.times
        ) {
          doubleLineData.times = doubleLineData.times + 1;

          var temp_data = doubleLineData;
          //state
          for (var i = 0; i < 7; i++) {
            temp_data.state.lineChartData1[i] =
              temp_data.state.selectChartData1[i + doubleLineData.times];
          }
          for (var i = 0; i < temp_data.state.lineChartData2.length; i++) {
            temp_data.state.lineChartData2[i].x =
              temp_data.state.lineChartData1[3].x;
          }
          var data_now = [];
          var data_future = [];
          for (var i = 0; i < temp_data.state.lineChartData1.length; i++) {
            if (i < 3) {
              data_now.push(temp_data.state.lineChartData1[i]);
            } else if (i === 3) {
              data_future.push(temp_data.state.lineChartData1[i]);
              data_now.push(temp_data.state.lineChartData1[i]);
            } else {
              data_future.push(temp_data.state.lineChartData1[i]);
            }
          }
          console.log(temp_data);
          temp_data.state.lineNow = data_now;
          temp_data.state.lineFuture = data_future;
          //speed
          for (var i = 0; i < 7; i++) {
            temp_data.speed.lineChartData1[i] =
              temp_data.speed.selectChartData1[i + doubleLineData.times];
          }
          for (var i = 0; i < temp_data.speed.lineChartData2.length; i++) {
            temp_data.speed.lineChartData2[i].x =
              temp_data.speed.lineChartData1[3].x;
          }
          var data_now = [];
          var data_future = [];
          for (var i = 0; i < temp_data.speed.lineChartData1.length; i++) {
            if (i < 3) {
              data_now.push(temp_data.speed.lineChartData1[i]);
            } else if (i === 3) {
              data_future.push(temp_data.speed.lineChartData1[i]);
              data_now.push(temp_data.speed.lineChartData1[i]);
            } else {
              data_future.push(temp_data.speed.lineChartData1[i]);
            }
          }

          temp_data.speed.lineNow = data_now;
          temp_data.speed.lineFuture = data_future;
          //frequency

          for (var i = 0; i < 7; i++) {
            temp_data.frequency.lineChartData1[i] =
              temp_data.frequency.selectChartData1[i + doubleLineData.times];
          }
          for (var i = 0; i < temp_data.frequency.lineChartData2.length; i++) {
            temp_data.frequency.lineChartData2[i].x =
              temp_data.frequency.lineChartData1[3].x;
          }
          var data_now = [];
          var data_future = [];
          for (var i = 0; i < temp_data.frequency.lineChartData1.length; i++) {
            if (i < 3) {
              data_now.push(temp_data.frequency.lineChartData1[i]);
            } else if (i === 3) {
              data_future.push(temp_data.frequency.lineChartData1[i]);
              data_now.push(temp_data.frequency.lineChartData1[i]);
            } else {
              data_future.push(temp_data.frequency.lineChartData1[i]);
            }
          }

          temp_data.frequency.lineNow = data_now;
          temp_data.frequency.lineFuture = data_future;
          //G
          for (var i = 0; i < 7; i++) {
            temp_data.G.lineChartData1[i] =
              temp_data.G.selectChartData1[i + doubleLineData.times];
          }
          for (var i = 0; i < temp_data.G.lineChartData2.length; i++) {
            temp_data.G.lineChartData2[i].x = temp_data.G.lineChartData1[3].x;
          }
          var data_now = [];
          var data_future = [];
          for (var i = 0; i < temp_data.G.lineChartData1.length; i++) {
            if (i < 3) {
              data_now.push(temp_data.G.lineChartData1[i]);
            } else if (i === 3) {
              data_future.push(temp_data.G.lineChartData1[i]);
              data_now.push(temp_data.G.lineChartData1[i]);
            } else {
              data_future.push(temp_data.G.lineChartData1[i]);
            }
          }

          temp_data.G.lineNow = data_now;
          temp_data.G.lineFuture = data_future;

          console.log(temp_data);
          console.log("update_new_times");
          setDoubleLineData(temp_data);
          // console.log(temp_data.lineChartData[0]);
        } else {
          doubleLineData.times = 0;
          console.log("no");
        }
        setTest((prev) => prev + 1);
        console.log("Logs every minute");
      }, MINUTE_MS);
      intervalArray.push(interval);
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    } else if (page === "Detail") {
      const interval2 = setInterval(() => {
        var body = {
          Machine: "D-005",
          Product: "0162B00100",
          Work_type: "Stampers"
        };
        var config = {
          headers: {
            username: "AirCenterQC",
            password: "@irQc12#",
          }
        };
        const formData = new URLSearchParams();
        formData.append('username', 'AirCenterQC');
        formData.append('password', '@irQc12#');
        const params = {
          Machine: 'D-005',
          Product: '0162B00100',
          Work_type: 'Stampers'
        };
        axios
          .post(
            "/api/extract_predict_data",
            formData,
            {headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: params}
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
        if (lineData.Detail === "Detail預測") return;
        if (lineData.lineChartData1.length < 7) {
          var temp_data = lineData;
          temp_data.lineChartData1.push(
            temp_data.selectChartData1[temp_data.lineChartData1.length]
          );
          console.log("update");
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
          }
          console.log("update_new");
          // console.log(temp_data.lineChartData[0]);
          console.log(temp_data.lineMax[0]);
          setLineData(temp_data);
        } else {
          lineData.times = 0;
          console.log("no");
        }
        setTest((prev) => prev + 1);
        // console.log("Logs every minute");
      }, MINUTE_MS);

      return () => clearInterval(interval2); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }
  }, [
    lineData.lineChartData1,
    doubleLineData.state.lineChartData1,
    lineData.lineMax,
    doubleLineData.state.lineMax,
    lineData.lineMin,
    page,
  ]);

  var data = [
    {
      Detail: "Detail1",
      CorrectRange: "3.1~3.75",
      RealRange: "2.2~3.3",
      Status: "不合格",
      lineChartData1: [],
      selectChartData1: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 2.2 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 2.3 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 2.4 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 2.7 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 2.3 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 3.4 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 3.1 },

        { x: new Date(2023, 1, 1, 0, 1, 10), y: 3.1 },
        { x: new Date(2023, 1, 1, 0, 1, 20), y: 3.5 },
        { x: new Date(2023, 1, 1, 0, 1, 30), y: 2.5 },
        { x: new Date(2023, 1, 1, 0, 1, 40), y: 3.1 },
        { x: new Date(2023, 1, 1, 0, 1, 50), y: 2.2 },
        { x: new Date(2023, 1, 1, 0, 1, 60), y: 2.4 },
      ],
      times: 0,
      lineMin: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 0.4 },
      ],
      lineMax: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 3.6 },
      ],
    },
    {
      Detail: "Detail2",
      CorrectRange: "2.1~4.75",
      RealRange: "3.0~3.3",
      Status: "合格",
      lineChartData1: [],
      selectChartData1: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 2.2 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 2.3 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 2.4 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 2.7 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 2.3 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 3.4 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 3.1 },

        { x: new Date(2023, 1, 1, 0, 1, 10), y: 3.1 },
        { x: new Date(2023, 1, 1, 0, 1, 20), y: 3.5 },
        { x: new Date(2023, 1, 1, 0, 1, 30), y: 2.5 },
        { x: new Date(2023, 1, 1, 0, 1, 40), y: 3.1 },
        { x: new Date(2023, 1, 1, 0, 1, 50), y: 2.2 },
        { x: new Date(2023, 1, 1, 0, 1, 60), y: 2.4 },
      ],
      times: 0,
      lineMin: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 0.4 },
      ],
      lineMax: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 3.6 },
      ],
    },
    {
      Detail: "Detail3",
      CorrectRange: "2.1~4.75",
      RealRange: "3.0~3.3",
      Status: "合格",
      lineChartData1: [],
      selectChartData1: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 2.2 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 2.3 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 2.4 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 2.7 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 2.3 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 3.4 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 3.1 },

        { x: new Date(2023, 1, 1, 0, 1, 10), y: 3.1 },
        { x: new Date(2023, 1, 1, 0, 1, 20), y: 3.5 },
        { x: new Date(2023, 1, 1, 0, 1, 30), y: 2.5 },
        { x: new Date(2023, 1, 1, 0, 1, 40), y: 3.1 },
        { x: new Date(2023, 1, 1, 0, 1, 50), y: 2.2 },
        { x: new Date(2023, 1, 1, 0, 1, 60), y: 2.4 },
      ],
      times: 0,
      lineMin: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 0.4 },
      ],
      lineMax: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 3.6 },
      ],
    },
    {
      Detail: "Detail4",
      CorrectRange: "2.1~4.75",
      RealRange: "3.0~3.3",
      Status: "合格",
      lineChartData1: [],
      selectChartData1: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 2.2 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 2.3 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 2.4 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 2.7 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 2.3 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 3.4 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 3.1 },

        { x: new Date(2023, 1, 1, 0, 1, 10), y: 3.1 },
        { x: new Date(2023, 1, 1, 0, 1, 20), y: 3.5 },
        { x: new Date(2023, 1, 1, 0, 1, 30), y: 2.5 },
        { x: new Date(2023, 1, 1, 0, 1, 40), y: 3.1 },
        { x: new Date(2023, 1, 1, 0, 1, 50), y: 2.2 },
        { x: new Date(2023, 1, 1, 0, 1, 60), y: 2.4 },
      ],
      times: 0,
      lineMin: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 0.4 },
      ],
      lineMax: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 3.6 },
      ],
    },
    {
      Detail: "Detail5",
      CorrectRange: "2.1~4.75",
      RealRange: "3.0~3.3",
      Status: "合格",
      lineChartData1: [],
      selectChartData1: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 2.2 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 2.3 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 2.4 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 2.7 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 2.3 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 3.4 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 3.1 },

        { x: new Date(2023, 1, 1, 0, 1, 10), y: 3.1 },
        { x: new Date(2023, 1, 1, 0, 1, 20), y: 3.5 },
        { x: new Date(2023, 1, 1, 0, 1, 30), y: 2.5 },
        { x: new Date(2023, 1, 1, 0, 1, 40), y: 3.1 },
        { x: new Date(2023, 1, 1, 0, 1, 50), y: 2.2 },
        { x: new Date(2023, 1, 1, 0, 1, 60), y: 2.4 },
      ],
      times: 0,
      lineMin: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 0.4 },
      ],
      lineMax: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 3.6 },
      ],
    },
    {
      Detail: "Detail6",
      CorrectRange: "2.2~4.75",
      RealRange: "3.0~3.41",
      Status: "合格",
      lineChartData1: [],
      selectChartData1: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 2.2 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 2.3 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 2.4 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 2.7 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 2.3 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 3.4 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 3.1 },

        { x: new Date(2023, 1, 1, 0, 1, 10), y: 3.1 },
        { x: new Date(2023, 1, 1, 0, 1, 20), y: 3.5 },
        { x: new Date(2023, 1, 1, 0, 1, 30), y: 2.5 },
        { x: new Date(2023, 1, 1, 0, 1, 40), y: 3.1 },
        { x: new Date(2023, 1, 1, 0, 1, 50), y: 2.2 },
        { x: new Date(2023, 1, 1, 0, 1, 60), y: 2.4 },
      ],
      times: 0,
      lineMin: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 0.4 },
      ],
      lineMax: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 3.6 },
      ],
    },
    {
      Detail: "Detail7",
      CorrectRange: "1.1~3.75",
      RealRange: "2.0~2.3",
      Status: "合格",
      lineChartData1: [],
      selectChartData1: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 2.2 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 2.3 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 2.4 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 2.7 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 2.3 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 3.4 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 3.1 },

        { x: new Date(2023, 1, 1, 0, 1, 10), y: 3.1 },
        { x: new Date(2023, 1, 1, 0, 1, 20), y: 3.5 },
        { x: new Date(2023, 1, 1, 0, 1, 30), y: 2.5 },
        { x: new Date(2023, 1, 1, 0, 1, 40), y: 3.1 },
        { x: new Date(2023, 1, 1, 0, 1, 50), y: 2.2 },
        { x: new Date(2023, 1, 1, 0, 1, 60), y: 2.4 },
      ],
      times: 0,
      lineMin: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 0.4 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 0.4 },
      ],
      lineMax: [
        { x: new Date(2023, 1, 1, 0, 0, 0), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 10), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 20), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 30), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 40), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 50), y: 3.6 },
        { x: new Date(2023, 1, 1, 0, 0, 60), y: 3.6 },
      ],
    },
  ];

  const handleClose = () => {
    setLineData({
      Detail: "Detail預測",
      CorrectRange: "",
      RealRange: "",
      Status: "",
      lineChartData1: [],
      selectChartData1: [],
      lineChartData2: [],
      selectChartData2: [],
      lineNow: [],
      lineFuture: [],
      times: 0,
      lineMin: [
        { x: new Date(2023, 0, 1, 0, 0, 0), y: 10 },
        { x: new Date(2023, 0, 1, 0, 0, 10), y: 10 },
        { x: new Date(2023, 0, 1, 0, 0, 20), y: 10 },
        { x: new Date(2023, 0, 1, 0, 0, 30), y: 10 },
        { x: new Date(2023, 0, 1, 0, 0, 40), y: 10 },
        { x: new Date(2023, 0, 1, 0, 0, 50), y: 10 },
        { x: new Date(2023, 0, 1, 0, 0, 60), y: 10 },
      ],
      lineMax: [
        { x: new Date(2023, 0, 1, 0, 0, 0), y: 90 },
        { x: new Date(2023, 0, 1, 0, 0, 10), y: 90 },
        { x: new Date(2023, 0, 1, 0, 0, 20), y: 90 },
        { x: new Date(2023, 0, 1, 0, 0, 30), y: 90 },
        { x: new Date(2023, 0, 1, 0, 0, 40), y: 90 },
        { x: new Date(2023, 0, 1, 0, 0, 50), y: 90 },
        { x: new Date(2023, 0, 1, 0, 0, 60), y: 90 },
      ],
    });
    setDoubleLineData({
      Detail: "Detail預測",
      CorrectRange: "",
      RealRange: "",
      Status: "",
      speed: {
        lineChartData1: [],
        selectChartData1: [
          { x: new Date(2023, 1, 1, 0, 0, 0), y: 12 },
          { x: new Date(2023, 1, 1, 0, 0, 10), y: 25 },
          { x: new Date(2023, 1, 1, 0, 0, 20), y: 3 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 5 },
          { x: new Date(2023, 1, 1, 0, 0, 40), y: 45 },
          { x: new Date(2023, 1, 1, 0, 0, 50), y: 98 },
          { x: new Date(2023, 1, 1, 0, 0, 60), y: 9 },

          { x: new Date(2023, 1, 1, 0, 1, 10), y: 25 },
          { x: new Date(2023, 1, 1, 0, 1, 20), y: 3 },
          { x: new Date(2023, 1, 1, 0, 1, 30), y: 5 },
          { x: new Date(2023, 1, 1, 0, 1, 40), y: 45 },
          { x: new Date(2023, 1, 1, 0, 1, 50), y: 98 },
          { x: new Date(2023, 1, 1, 0, 1, 60), y: 9 },
        ],
        lineChartData2: [
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 0 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 20 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 40 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 60 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 80 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 100 },
        ],
        selectChartData2: [
          { x: new Date(2023, 1, 1, 0, 0, 0), y: 9 },
          { x: new Date(2023, 1, 1, 0, 0, 10), y: 33 },
          { x: new Date(2023, 1, 1, 0, 0, 20), y: 31 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 53 },
          { x: new Date(2023, 1, 1, 0, 0, 40), y: 35 },
          { x: new Date(2023, 1, 1, 0, 0, 50), y: 88 },
          { x: new Date(2023, 1, 1, 0, 0, 60), y: 12 },

          { x: new Date(2023, 1, 1, 0, 1, 10), y: 33 },
          { x: new Date(2023, 1, 1, 0, 1, 20), y: 31 },
          { x: new Date(2023, 1, 1, 0, 1, 30), y: 53 },
          { x: new Date(2023, 1, 1, 0, 1, 40), y: 35 },
          { x: new Date(2023, 1, 1, 0, 1, 50), y: 88 },
          { x: new Date(2023, 1, 1, 0, 1, 60), y: 12 },
        ],

        times: 0,
        lineMin: [],
        lineNow: [],
        lineFuture: [],
      },
      frequency: {
        lineChartData1: [],
        selectChartData1: [
          { x: new Date(2023, 1, 1, 0, 0, 0), y: 12 },
          { x: new Date(2023, 1, 1, 0, 0, 10), y: 25 },
          { x: new Date(2023, 1, 1, 0, 0, 20), y: 3 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 5 },
          { x: new Date(2023, 1, 1, 0, 0, 40), y: 45 },
          { x: new Date(2023, 1, 1, 0, 0, 50), y: 98 },
          { x: new Date(2023, 1, 1, 0, 0, 60), y: 9 },

          { x: new Date(2023, 1, 1, 0, 1, 10), y: 25 },
          { x: new Date(2023, 1, 1, 0, 1, 20), y: 3 },
          { x: new Date(2023, 1, 1, 0, 1, 30), y: 5 },
          { x: new Date(2023, 1, 1, 0, 1, 40), y: 45 },
          { x: new Date(2023, 1, 1, 0, 1, 50), y: 98 },
          { x: new Date(2023, 1, 1, 0, 1, 60), y: 9 },
        ],
        lineChartData2: [
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 0 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 20 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 40 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 60 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 80 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 100 },
        ],
        selectChartData2: [
          { x: new Date(2023, 1, 1, 0, 0, 0), y: 9 },
          { x: new Date(2023, 1, 1, 0, 0, 10), y: 33 },
          { x: new Date(2023, 1, 1, 0, 0, 20), y: 31 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 53 },
          { x: new Date(2023, 1, 1, 0, 0, 40), y: 35 },
          { x: new Date(2023, 1, 1, 0, 0, 50), y: 88 },
          { x: new Date(2023, 1, 1, 0, 0, 60), y: 12 },

          { x: new Date(2023, 1, 1, 0, 1, 10), y: 33 },
          { x: new Date(2023, 1, 1, 0, 1, 20), y: 31 },
          { x: new Date(2023, 1, 1, 0, 1, 30), y: 53 },
          { x: new Date(2023, 1, 1, 0, 1, 40), y: 35 },
          { x: new Date(2023, 1, 1, 0, 1, 50), y: 88 },
          { x: new Date(2023, 1, 1, 0, 1, 60), y: 12 },
        ],

        times: 0,
        lineMin: [],
        lineNow: [],
        lineFuture: [],
      },
      state: {
        lineChartData1: [],
        selectChartData1: [
          { x: new Date(2023, 1, 1, 0, 0, 0), y: 12 },
          { x: new Date(2023, 1, 1, 0, 0, 10), y: 25 },
          { x: new Date(2023, 1, 1, 0, 0, 20), y: 3 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 5 },
          { x: new Date(2023, 1, 1, 0, 0, 40), y: 45 },
          { x: new Date(2023, 1, 1, 0, 0, 50), y: 98 },
          { x: new Date(2023, 1, 1, 0, 0, 60), y: 9 },

          { x: new Date(2023, 1, 1, 0, 1, 10), y: 25 },
          { x: new Date(2023, 1, 1, 0, 1, 20), y: 3 },
          { x: new Date(2023, 1, 1, 0, 1, 30), y: 5 },
          { x: new Date(2023, 1, 1, 0, 1, 40), y: 45 },
          { x: new Date(2023, 1, 1, 0, 1, 50), y: 98 },
          { x: new Date(2023, 1, 1, 0, 1, 60), y: 9 },
        ],
        lineChartData2: [
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 0 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 20 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 40 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 60 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 80 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 100 },
        ],
        selectChartData2: [
          { x: new Date(2023, 1, 1, 0, 0, 0), y: 9 },
          { x: new Date(2023, 1, 1, 0, 0, 10), y: 33 },
          { x: new Date(2023, 1, 1, 0, 0, 20), y: 31 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 53 },
          { x: new Date(2023, 1, 1, 0, 0, 40), y: 35 },
          { x: new Date(2023, 1, 1, 0, 0, 50), y: 88 },
          { x: new Date(2023, 1, 1, 0, 0, 60), y: 12 },

          { x: new Date(2023, 1, 1, 0, 1, 10), y: 33 },
          { x: new Date(2023, 1, 1, 0, 1, 20), y: 31 },
          { x: new Date(2023, 1, 1, 0, 1, 30), y: 53 },
          { x: new Date(2023, 1, 1, 0, 1, 40), y: 35 },
          { x: new Date(2023, 1, 1, 0, 1, 50), y: 88 },
          { x: new Date(2023, 1, 1, 0, 1, 60), y: 12 },
        ],

        times: 0,
        lineMin: [],
        lineNow: [],
        lineFuture: [],
      },
      G: {
        lineChartData1: [],
        selectChartData1: [
          { x: new Date(2023, 1, 1, 0, 0, 0), y: 12 },
          { x: new Date(2023, 1, 1, 0, 0, 10), y: 25 },
          { x: new Date(2023, 1, 1, 0, 0, 20), y: 3 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 5 },
          { x: new Date(2023, 1, 1, 0, 0, 40), y: 45 },
          { x: new Date(2023, 1, 1, 0, 0, 50), y: 98 },
          { x: new Date(2023, 1, 1, 0, 0, 60), y: 9 },

          { x: new Date(2023, 1, 1, 0, 1, 10), y: 25 },
          { x: new Date(2023, 1, 1, 0, 1, 20), y: 3 },
          { x: new Date(2023, 1, 1, 0, 1, 30), y: 5 },
          { x: new Date(2023, 1, 1, 0, 1, 40), y: 45 },
          { x: new Date(2023, 1, 1, 0, 1, 50), y: 98 },
          { x: new Date(2023, 1, 1, 0, 1, 60), y: 9 },
        ],
        lineChartData2: [
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 0 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 20 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 40 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 60 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 80 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 100 },
        ],
        selectChartData2: [
          { x: new Date(2023, 1, 1, 0, 0, 0), y: 9 },
          { x: new Date(2023, 1, 1, 0, 0, 10), y: 33 },
          { x: new Date(2023, 1, 1, 0, 0, 20), y: 31 },
          { x: new Date(2023, 1, 1, 0, 0, 30), y: 53 },
          { x: new Date(2023, 1, 1, 0, 0, 40), y: 35 },
          { x: new Date(2023, 1, 1, 0, 0, 50), y: 88 },
          { x: new Date(2023, 1, 1, 0, 0, 60), y: 12 },

          { x: new Date(2023, 1, 1, 0, 1, 10), y: 33 },
          { x: new Date(2023, 1, 1, 0, 1, 20), y: 31 },
          { x: new Date(2023, 1, 1, 0, 1, 30), y: 53 },
          { x: new Date(2023, 1, 1, 0, 1, 40), y: 35 },
          { x: new Date(2023, 1, 1, 0, 1, 50), y: 88 },
          { x: new Date(2023, 1, 1, 0, 1, 60), y: 12 },
        ],

        times: 0,
        lineMin: [],
        lineNow: [],
        lineFuture: [],
      },
      times: 0,
    });
    setPage("選擇畫面");
    setOpen(false);
  };
  const handlePage = (value) => {
    setPage(value);
    console.log(value);
  };
  if (page === "機台") {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <h1 className=" p-3 text-3xl font-semibold">{props.Name}</h1>
        <h1 className=" px-7 py-1 text-xl font-semibold">
          {doubleLineData.state.lineNow.length > 0
            ? doubleLineData.state.lineNow[0].x.getFullYear() +
              "年" +
              doubleLineData.state.lineNow[0].x.getMonth() +
              "月" +
              doubleLineData.state.lineNow[0].x.getDate() +
              "日"
            : "等待更新"}
        </h1>
        <DialogContent>
          <div className=" flex flex-row px-5 gap-10 relative">
            <DoubleLineChart></DoubleLineChart>

            <div className="flex flex-col p-5 w-[340px]  bg-slate-500 rounded-xl justify-start items-start text-white fixed top-40 right-40">
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
              <button
                className="px-8 py-4 bg-green-400 text-xl cursor-pointer hover:bg-green-500 text-white"
                onClick={(e) => handlePage("Detail")}
              >
                查看Detail
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  } else if (page === "Detail") {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <div>
          <div className="m-2  bg-white dark:bg-secondary-dark-bg rounded-3xl ">
            <div className="">
              <div>
                <p className="text-3xl font-extrabold tracking-tight dark:text-gray-200 text-slate-900 p-4">
                  {lineData.Detail}
                </p>
              </div>
            </div>
            <div className=" flex gap-5 px-5 py-1">
              <button
                className="px-8 py-4 bg-slate-500 text-xl cursor-pointer hover:bg-slate-900 text-white"
                onClick={(e) => handlePage("機台")}
              >
                查看機台狀況
              </button>
            </div>

            <div className=" flex px-2 items-center w-full mt-2">
              {lineData.selectChartData1.length < 6 ? (
                <div>
                  {activeMenu ? (
                    <div className=" w-[580px] h-[350px] p-4 bg-slate-500 rounded-2xl text-white">
                      <div className="flex flex-col gap-4">
                        <p className=" text-2xl mt-2 font-extrabold tracking-tight">
                          選擇需要查看的Detail
                        </p>
                        <p className=" text-normal mt-2 font-extrabold tracking-tight">
                          點擊右側選單即可查看即時Detail狀況
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className=" w-[580px] h-[350px] p-4  bg-slate-500 rounded-2xl text-white">
                      <div className="flex flex-col gap-4">
                        <p className=" text-2xl mt-2 font-extrabold tracking-tight">
                          選擇需要查看的Detail
                        </p>
                        <p className=" text-normal mt-2 font-extrabold tracking-tight">
                          點擊即可查看即時Detail狀況
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="">
                  {activeMenu ? (
                    <LineChart
                      height={"350px"}
                      width={"700px"}
                      bg={"#33373E"}
                      type={"Detail"}
                    />
                  ) : (
                    <LineChart
                      height={"350px"}
                      width={"700px"}
                      bg={"#33373E"}
                      type={"Detail"}
                    />
                  )}
                </div>
              )}

              <div className=" dark:text-gray-200 bg-white h-[352px]  lg:w-[500px] px-5  bg-center overflow-y-auto text-white ">
                <div className=" flex py-4 items-center justify-center gap-2 text-sm bg-slate-500  p-3 sticky top-0">
                  <p className=" font-bold  ">名稱 </p>
                  <p className=" font-bold ">合格範圍</p>
                  <p className="font-bold ">預測範圍 </p>
                  <p className="font-bold ">目前狀態</p>
                </div>
                {data.map((d, id) => (
                  <Tr key={id} props={d}></Tr>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  } else if (page === "選擇畫面") {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <div className=" flex h-72 w-full justify-center items-center">
          <div className="flex gap-5 items-center   p-5">
            <button
              className="px-8 py-4 bg-green-400 text-xl cursor-pointer hover:bg-green-500 text-white"
              onClick={(e) => handlePage("機台")}
            >
              機台狀況
            </button>
            <button
              className="px-8 py-4 bg-green-400 text-xl cursor-pointer hover:bg-green-500 text-white"
              onClick={(e) => handlePage("Detail")}
            >
              Detail預測
            </button>
            <button
              className="px-8 py-4 bg-green-400 text-xl cursor-pointer hover:bg-green-500 text-white"
              onClick={(e) => handlePage("Detail")}
            >
              機台良率
            </button>
          </div>
        </div>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default DiaLog;
