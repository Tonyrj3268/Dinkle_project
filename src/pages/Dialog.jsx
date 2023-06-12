import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DoubleLineChart } from "../components";
import { DetailChart } from "../components";
import Tr from "../components/Tr";
import { useStateContext } from "../contexts/ContextProvider";
import { compose } from "@mui/system";
import axios from "axios";

const DiaLog = (props) => {
  const { currentMode } = useStateContext();
  const [open, setOpen] = React.useState(true);
  const [details, setDetails] = React.useState([]);
  const [page, setPage] = React.useState("選擇畫面");
  const {
    activeMenu,
    lineData,
    setLineData,
    test,
    setTest,
    doubleLineData,
    detailData,
    setIsTrClicked,
    isTrClicked,
  } = useStateContext();
  useEffect(() => {
    var tem = [];
    for (
      let i = 1;
      i <= Object.keys(lineData[props.location].pred_avg_detail).length;
      i++
    ) {
      if (
        lineData[props.location].standard_detail_name[
          `standard_detail_name_${i}`
        ].length > 3
      ) {
        tem.push({
          name: lineData[props.location].standard_detail_name[
            `standard_detail_name_${i}`
          ],
          details:
            lineData[props.location].pred_avg_detail[`pred_avg_detail_${i}`],
          details_max:
            lineData[props.location].pred_max_detail[`pred_max_detail_${i}`],
          details_min:
            lineData[props.location].pred_min_detail[`pred_min_detail_${i}`],
          max: lineData[props.location].standard_max_detail[
            `standard_max_detail_${i}`
          ],
          min: lineData[props.location].standard_min_detail[
            `standard_min_detail_${i}`
          ],
          location: props.location,
          detail_i: i,
        });
      }
    }
    console.log("updeate detail");
    setDetails(tem);
  }, [test, page]);

  const handleClose = () => {
    setPage("選擇畫面");
    setDetails([]);
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
          {lineData[props.location].time.length > 0
            ? new Date(
                lineData[props.location].time[
                  lineData[props.location].time.length - 1
                ]
              ).getFullYear() +
              "年" +
              (new Date(
                lineData[props.location].time[
                  lineData[props.location].time.length - 1
                ]
              ).getMonth() +
                1) +
              "月" +
              new Date(
                lineData[props.location].time[
                  lineData[props.location].time.length - 1
                ]
              ).getDate() +
              "日"
            : "等待更新"}
        </h1>
        <DialogContent>
          <div className=" flex flex-row px-5 gap-10 ">
            <DoubleLineChart location={props.location}></DoubleLineChart>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col p-5 w-[340px] h-[400px]  bg-slate-500 rounded-xl justify-start items-start text-white ">
                <p className=" text-2xl p-2">機台料號：{props.product}</p>
                <p className=" text-2xl p-2">機台名稱：{props.machine}</p>
                <div className="p-2 flex items-center gap-2">
                  <p className=" text-2xl">
                    當下轉速：
                    {
                      lineData[props.location].Speed[
                        lineData[props.location].Speed.length - 1
                      ]
                    }
                  </p>
                </div>
                <div className="p-2 flex items-center gap-2">
                  <p className=" text-2xl">
                    當下頻率：
                    {
                      lineData[props.location].frequency[
                        lineData[props.location].Status.length - 1
                      ]
                    }
                  </p>
                </div>
                <div className="p-2 flex items-center gap-2">
                  <p className=" text-2xl">
                    當下狀態：
                    {
                      lineData[props.location].Status[
                        lineData[props.location].Status.length - 1
                      ]
                    }
                  </p>
                </div>
                {lineData[props.location].have_vibration == 1 ? (
                  <div className="p-2 flex items-center gap-2">
                    <p className=" text-2xl">
                      當下G合力：
                      {
                        lineData[props.location].g_change[
                          lineData[props.location].g_change.length - 1
                        ]
                      }
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}

                <button
                  className="px-8 py-4 bg-green-400 text-xl cursor-pointer hover:bg-green-500 text-white"
                  onClick={(e) => handlePage("Detail")}
                >
                  查看Detail
                </button>
              </div>
              <div className="flex flex-col p-5 w-[340px] h-[250px]  bg-slate-500 rounded-xl justify-start items-start text-white ">
                <p className=" text-2xl p-1">未來四分鐘推薦參數：</p>
                <div className="  p-1 flex gap-1 text-center justify-center">
                  <p className=" text-l ">頻率:</p>
                  {lineData[props.location].recommand_frequency.map((d, i) => (
                    <p key={i + d + "fre"} className=" text-l">
                      {d},
                    </p>
                  ))}
                </div>
                <div className="  p-1 flex gap-1 text-center justify-center">
                  <p className=" text-l ">轉速:</p>
                  {lineData[props.location].recommand_speed.map((d, i) => (
                    <p key={i + d + "speed"} className=" text-l">
                      {d},
                    </p>
                  ))}
                </div>
                {lineData[props.location].have_vibration == 1 ? (
                  <div></div>
                ) : (
                  <div className="  p-1 flex gap-1 text-center justify-center">
                    <p className=" text-l ">狀態:</p>
                    {lineData[props.location].recommand_status.map((d, i) => (
                      <p key={i + d + "state"} className=" text-l">
                        {d},
                      </p>
                    ))}
                  </div>
                )}

                {lineData[props.location].have_vibration == 0 ? (
                  <div></div>
                ) : (
                  <div className=" p-1 flex gap-1 text-left ">
                    <p className=" text-l ">G合力:</p>
                    <div className="flex-col">
                      {lineData[props.location].recommand_g_change.map(
                        (d, i) => (
                          <p key={i + d + "g"} className=" text-l break-words">
                            {d},
                          </p>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
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
                <p className="text-3xl font-extrabold tracking-tight dark:text-gray-200 text-slate-900 p-4"></p>
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
              {detailData.detail_i == 0 ? (
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
                  <div className=" text-xl font-semibold px-3">
                    {isTrClicked}
                  </div>
                  {activeMenu ? (
                    <DetailChart
                      height={"350px"}
                      width={"700px"}
                      bg={"#33373E"}
                      type={"Detail"}
                    />
                  ) : (
                    <DetailChart
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
                  <p className="font-bold ">預測值 </p>
                  <p className="font-bold ">目前狀態</p>
                </div>
                {details.map((d, id) => (
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
