import { useParams } from 'react-router-dom';
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DoubleLineChart } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
function MachineDetailPage() {
  let { id } = useParams();
  const [data, setData] = useState([]);
  const {
    lineData,
  } = useStateContext();
  React.useEffect(() => {
    fetchMachineData(id);
  }, [id]);

  const fetchMachineData = async (id) => {
    // fetch data using id
  };

  return (
    <div>
      Machine Detail Page for ID: {id}
      {/* Display machine data here */}
      <Dialog
    open={true}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    fullWidth
    maxWidth="lg"
  >
    <h1 className=" p-3 text-3xl font-semibold">{data.machine}</h1>
    <h1 className=" px-7 py-1 text-xl font-semibold">
      {lineData[data.location].time.length > 0
        ? new Date(
            lineData[data.location].time[
              lineData[data.location].time.length - 1
            ]
          ).getFullYear() +
          "年" +
          (new Date(
            lineData[data.location].time[
              lineData[data.location].time.length - 1
            ]
          ).getMonth() +
            1) +
          "月" +
          new Date(
            lineData[data.location].time[
              lineData[data.location].time.length - 1
            ]
          ).getDate() +
          "日"
        : "等待更新"}
    </h1>
    <DialogContent>
      <div className=" flex flex-row px-5 gap-10 ">
        <DoubleLineChart location={data.location}></DoubleLineChart>
        <div className="flex flex-col">
          <div className="flex flex-col p-5 w-full h-full mb-2  bg-slate-500 rounded-xl justify-start items-start text-white ">
            <p className=" text-2xl p-2">機台料號：{data.product}</p>
            <p className=" text-2xl p-2">機台名稱：{data.machine}</p>
            <div className="p-2 flex items-center gap-2">
              <p className=" text-2xl">
                當下轉速：
                {
                  lineData[data.location].Speed[
                    lineData[data.location].Speed.length - 1
                  ]
                }
              </p>
            </div>
            <div className="p-2 flex items-center gap-2">
              <p className=" text-2xl">
                當下頻率：
                {
                  lineData[data.location].frequency[
                    lineData[data.location].frequency.length - 1
                  ]
                }
              </p>
            </div>
            <div className="p-2 flex items-center gap-2">
              <p className=" text-2xl">
                當下狀態：
                {
                  lineData[data.location].status_type[
                    lineData[data.location].status_type.length - 1
                  ]
                }
              </p>
            </div>
            {lineData[data.location].have_vibration == 1 ? (
              <div className="p-2 flex items-center gap-2">
                <p className=" text-2xl">
                  當下G合力：
                  {
                    lineData[data.location].g_change[
                      lineData[data.location].g_change.length - 1
                    ]
                  }
                </p>
              </div>
            ) : (
              <div></div>
            )}

          </div>
          <div className="flex flex-col items-center p-5 w-full  bg-slate-500   text-white border-b-1 border-gray-200 rounded-t-xl ">
            <p className=" text-xl p-1 text-center ">未來四分鐘推薦參數</p>
          </div>
          {lineData[data.location].recommend_frequency.length < 4 ? (
            <div></div>
          ) : (
            <div className="container mx-auto">
              <table className="min-w-full divide-y divide-gray-200 text-white ">
                <thead className="bg-slate-500">
                  <tr>
                    <th className="py-3 px-6 text-center ">分鐘</th>
                    <th className="py-3 px-6">頻率</th>
                    <th className="py-3 px-6">轉速</th>

                    {lineData[data.location].have_vibration == 0 ? (
                      <td className=""></td>
                    ) : (
                      <td className="py-3 px-6">G合力</td>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-slate-500 divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-6 text-center">1</td>
                    <td className="py-3 px-6">
                      {lineData[
                        data.location
                      ].recommend_frequency[0].toFixed(2)}
                    </td>
                    <td className="py-3 px-6">
                      {lineData[data.location].recommend_speed[0]}
                    </td>

                    {lineData[data.location].have_vibration == 0 ? (
                      <td className=""></td>
                    ) : (
                      <td className="py-3 px-6">
                        {Math.round(
                          lineData[data.location].recommend_g_change[0],
                          3
                        )}
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-center">2</td>
                    <td className="py-3 px-6">
                      {lineData[
                        data.location
                      ].recommend_frequency[1].toFixed(2)}
                    </td>
                    <td className="py-3 px-6">
                      {lineData[data.location].recommend_speed[1]}
                    </td>
                    {lineData[data.location].have_vibration == 0 ? (
                      <td className=""></td>
                    ) : (
                      <td className="py-3 px-6">
                        {Math.round(
                          lineData[data.location].recommend_g_change[1],
                          3
                        )}
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-center">3</td>
                    <td className="py-3 px-6">
                      {lineData[
                        data.location
                      ].recommend_frequency[2].toFixed(2)}
                    </td>
                    <td className="py-3 px-6">
                      {lineData[data.location].recommend_speed[2]}
                    </td>
                    {lineData[data.location].have_vibration == 0 ? (
                      <td className=""></td>
                    ) : (
                      <td className="py-3 px-6">
                        {Math.round(
                          lineData[data.location].recommend_g_change[2],
                          3
                        )}
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-center">4</td>
                    <td className="py-3 px-6 ">
                      {lineData[
                        data.location
                      ].recommend_frequency[3].toFixed(2)}
                    </td>
                    <td className="py-3 px-6 ">
                      {lineData[data.location].recommend_speed[3]}
                    </td>
                    {lineData[data.location].have_vibration == 0 ? (
                      <td className=""></td>
                    ) : (
                      <td className="py-3 px-6">
                        {Math.round(
                          lineData[data.location].recommend_g_change[3],
                          1
                        )}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-col items-center p-2 w-full  bg-slate-500   text-white border-b-1 border-gray-200 rounded-b-xl border-t-1 "></div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
    </div>
    
    
  );
}

export default MachineDetailPage;
