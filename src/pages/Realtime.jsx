import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  
} from "@syncfusion/ej2-react-grids";

import { Pie as PieChart, LineChart } from "../components";
import axios from "axios";
import { realtimeData, contextMenuItems, realtimeGrid } from "../data/dummy";
// import { useStateContext } from "../contexts/ContextProvider";
import DiaLog from "./Dialog";
import { HiVariable } from "react-icons/hi";
import { useStateContext } from "../contexts/ContextProvider";
class Machine {
  constructor(machine) {
    this.machine = machine;
    this.product = "";
    this.location = 0
    this.time = [];
    this.frequency = [];
    this.Speed = [];
    this.Status = [];
    this.g_change = [];
    this.have_vibration = 0;
    this.is_qualified = [];
    this.good_rate = 100;
    this.pred_avg_detail_1 = [];
    this.pred_avg_detail_2 = [];
    this.pred_avg_detail_3 = [];
    this.pred_avg_detail_4 = [];
    this.pred_avg_detail_5 = [];
    this.pred_avg_detail_6 = [];
    this.pred_avg_detail_7 = [];
    this.pred_avg_detail_8 = [];
    this.pred_avg_detail_9 = [];
    this.pred_avg_detail_10 = [];
    this.pred_avg_detail_11 = [];
    this.pred_avg_detail_12 = [];
    this.pred_avg_detail_13 = [];
    this.standard_max_detail_1 = 0;
    this.standard_max_detail_2 = 0;
    this.standard_max_detail_3 = 0;
    this.standard_max_detail_4 = 0;
    this.standard_max_detail_5 = 0;
    this.standard_max_detail_6 = 0;
    this.standard_max_detail_7 = 0;
    this.standard_max_detail_8 = 0;
    this.standard_max_detail_9 = 0;
    this.standard_max_detail_10 = 0;
    this.standard_max_detail_11 = 0;
    this.standard_max_detail_12 = 0;
    this.standard_max_detail_13 = 0;
    this.standard_min_detail_1 = 3;
    this.standard_min_detail_2 = 2;
    this.standard_min_detail_3 = 6;
    this.standard_min_detail_4 = 2;
    this.standard_min_detail_5 = 2;
    this.standard_min_detail_6 = 3;
    this.standard_min_detail_7 = 2;
    this.standard_min_detail_8 = 0;
    this.standard_min_detail_9 = 0;
    this.standard_min_detail_10 = 0;
    this.standard_min_detail_11 = 0;
    this.standard_min_detail_12 = 0;
    this.standard_min_detail_13 = 0;
    this.standard_detail_name_1 = "";
    this.standard_detail_name_2 = "";
    this.standard_detail_name_3 = "";
    this.standard_detail_name_4 = "";
    this.standard_detail_name_5 = "";
    this.standard_detail_name_6 = "";
    this.standard_detail_name_7 = "";
    this.standard_detail_name_8 = "";
    this.standard_detail_name_9 = "";
    this.standard_detail_name_10 = "";
    this.standard_detail_name_11 = "";
    this.standard_detail_name_12 = "";
    this.standard_detail_name_13 = "";
  }
}
const Realtime = () => {
  // const { currentColor, currentMod } = useStateContext();
  const [page, setPage] = useState("即時監控");
  const [data, setData] = useState([]);
  function dialogTemplete(props) {
    
    return <DiaLog {...props} />;
  }
  const { setLineData,test, setTest, lineData,passRate, setPassRate,passRateProps, setPassRateProps } = useStateContext();
  const MINUTE_MS = 10000;
  useEffect(() => {
   
      const interval = setInterval(() => {
       
        const formData = new URLSearchParams();
        formData.append('username', process.env.REACT_APP_extra_predict_username);
        formData.append('password', process.env.REACT_APP_extra_predict_password);
        const params = {
          Show_type : 'test',
          Work_type: 'Stampers'
        };
        axios
          .post(
            process.env.REACT_APP_extra_predict_url,
            formData,
            {headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: params}
          )
          .then((res) => {
            console.log(res.data)
            
            if (typeof res.data === 'string'){
              return
            }
            let tem = lineData
            let tem_pass_rate = passRate
            let tem_unpass_rate_props = passRateProps
            let api_data = res.data;
            let all_good_rate = 0
            let unpass_rate_this_minute = 0
            let unpass_rate_20_min = 0
            let unpass_rate_20_min_times = 0
            for (let i = 0; i < api_data.length; i++) {
                
                let json = api_data[i];
                let foundObject = false;
            
                tem.forEach(obj => {
                    if (obj.machine === json.machine) {
                        foundObject = true;
                        if (obj.product != json.product){
                            let index = obj.location; 
                            obj = new Machine(json.machine);
                            obj.product = json.product
                            obj.location = index
                        }

                        if (obj.Status.length > 20) {
                            Object.keys(obj).forEach(key => {
                                if (Array.isArray(obj[key])) {
                                    obj[key].shift();
                                }
                              });
                        }
                        obj.time.push(json.time)
                        obj.frequency.push(json.frequency);
                        obj.Speed.push(json.Speed);
                        obj.Status.push(json.Status);
                        obj.g_change.push(json.g_change);
                        obj.have_vibration=(json.have_vibration);
                        let is_qualified = true
                        for (let i = 1; i <= 13; i++) {
                            let detailName = `detail_${i}`;
                            obj[`pred_avg_${detailName}`].push(Number(((json[`standard_max_${detailName}`]+json[`standard_min_${detailName}`])/2).toFixed(2)));
                            obj[`standard_max_${detailName}`] = json[`standard_max_${detailName}`];
                            obj[`standard_min_${detailName}`] = json[`standard_min_${detailName}`]; 
                            obj[`standard_detail_name_${i}`] = json[`standard_detail_name_${i}`]; 

                            if (obj[`pred_avg_${detailName}`] > obj[`standard_max_${detailName}`] || obj[`pred_avg_${detailName}`] < obj[`standard_min_${detailName}`]){
                                is_qualified = false
                                unpass_rate_this_minute += 1
                            }
                        }
                        obj.is_qualified.push(is_qualified);
                        let good= obj.is_qualified.reduce((acc, cur) => acc + (cur ? 1 : 0), 0)
                        unpass_rate_20_min += obj.is_qualified.length - good
                        unpass_rate_20_min_times += obj.is_qualified.length
                        let good_rate = Number((good / obj.is_qualified.length).toFixed(2));
                        obj.good_rate = good_rate;
                        all_good_rate += good_rate;
                    
                  }
                })

                if(!foundObject){
                    let is_qualified = true
                    let machine = new Machine(json.machine);
                    machine.location = tem.length;
                    machine.product = json.product
                    machine.time.push(json.time)
                    machine.frequency.push(json.frequency);
                    machine.Speed.push(json.Speed);
                    machine.Status.push(json.Status);
                    machine.g_change.push(json.g_change);
                    machine.have_vibration=(json.have_vibration);
                    for (let i = 1; i <= 13; i++) {
                        let detailName = `detail_${i}`;
                        machine[`pred_avg_${detailName}`].push(Number(((json[`standard_max_${detailName}`]+json[`standard_min_${detailName}`])/2).toFixed(2)));
                        machine[`standard_max_${detailName}`] = json[`standard_max_${detailName}`];
                        machine[`standard_min_${detailName}`] = json[`standard_min_${detailName}`];
                        machine[`standard_detail_name_${i}`] = json[`standard_detail_name_${i}`]; 

                        if (machine[`pred_avg_${detailName}`] > machine[`standard_max_${detailName}`] || machine[`pred_avg_${detailName}`] < machine[`standard_min_${detailName}`]){
                            is_qualified = false
                            unpass_rate_this_minute += 1
                        }
                    }
                    machine.is_qualified.push(is_qualified);
                    let good= machine.is_qualified.reduce((acc, cur) => acc + (cur ? 1 : 0), 0)
                    unpass_rate_20_min += machine.is_qualified.length - good
                    unpass_rate_20_min_times += machine.is_qualified.length
                    let good_rate = Number((good / machine.is_qualified.length).toFixed(2));
                    machine.good_rate = good_rate;
                    all_good_rate += good_rate;

                    tem.push(machine);
                    
                }
            }
            tem_pass_rate.push({x:api_data[0].time,y:all_good_rate/api_data.length*100})
            setLineData(()=>tem);
            var dataArray=[]
            for(var i=0;i<lineData.length;i++){
              dataArray.push(lineData[i])
            }
            setData(dataArray)
            setPassRate(()=>tem_pass_rate)
            
            setPassRateProps({
              accumulativeMin:tem_unpass_rate_props.accumulativeMin + unpass_rate_this_minute,
              accumulativeMinIn20:unpass_rate_20_min,
              accumulativePassRateIn20:unpass_rate_20_min/unpass_rate_20_min_times,
            })
            console.log(passRate)
            console.log(lineData)
            console.log(passRateProps)
            
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
          
          setTest((prev) => prev + 1);
      
      }, MINUTE_MS);
      
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    
  }, [test,lineData.length]);
  var changePage = (value) => {
    setPage(value)
  };

  const editing = {
    mode: "Normal",
    allowEditing: true,
    template: dialogTemplete,
  };

  var pieChartData = [
    { x: "預防成本", y: 20, text: "20%" },
    { x: "鑑定成本", y: 9.8, text: "9.8%" },
    { x: "內部失敗成本", y: 66.2, text: "66.2%" },
    { x: "外部失敗成本", y: 11, text: "3%" },
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  overflow-y-auto">
      <div className=" mb-5">
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          即時監控 {test}
        </p>
      </div>
      <div className=" flex flex-row gap-4 text-white font-bold">
        <button
          onClick={(e) => {
            changePage("即時監控");
          }}
          className=" w-1/2 h-12 bg-red-600 rounded-full hover:bg-red-700"
        >
          即時監控
        </button>
        <button
          onClick={(e) => {
            changePage("成本");
          }}
          className=" w-1/2 h-12 bg-green-500 rounded-full hover:bg-green-600"
        >
          整體良率
        </button>

      </div>
      
      {page === "即時監控" ? (
        <div>
          <div className="flex w-full p-5"></div>
        
          <GridComponent
            id="gridcomp"
            dataSource={data}
            allowSorting
            contextMenuItems={contextMenuItems}
            editSettings={editing}
            enablePersistence={false}
          
          >
            <ColumnsDirective>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              {realtimeGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject
              services={[
                Resize,
                Sort,
                ContextMenu,
                Filter,
                Page,
                ExcelExport,
                Edit,
                PdfExport,
              ]}
            />
          </GridComponent>
        </div>
      ) : (
        <div>
          <div className="flex w-full  h-full">
            <div className=" dark:text-gray-200 bg-green-500 h-44 rounded-xl w-1/3 p-5 pt-9 m-3  bg-center">
              <div className="flex justify-between items-center ">
                <div>
                  <p>累積不良機台分鐘</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-3xl font-bold ">{passRateProps.accumulativeMin}</p>
              </div>
            </div>
            <div className=" dark:text-gray-200 bg-green-500 h-44 rounded-xl w-2/3 p-5 pt-9 m-3  bg-center">
              <div className="flex flex-col gap-3 -mt-4 ">
                <div className="">
                  <p className=" items-baseline">過去二十分鐘機台不良分鐘</p>

                  <p className="text-2xl font-bold ">{passRateProps.accumulativeMinIn20}</p>
                </div>
                <div>
                  <p>過去二十分鐘機台不良率</p>
                  <p className="text-2xl font-bold ">{passRateProps.accumulativePassRateIn20}</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex gap-4">
            <div className=" w-full">
              <LineChart
                height={"100%"}
                width={"100%"}
                bg={"white"}
                type={"Yield"}
              ></LineChart>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Realtime;
