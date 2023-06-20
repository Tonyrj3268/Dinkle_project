import React, { useEffect } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import {
  LinePrimaryXAxis,
  doubleLineCustomSeriesSpeed,
  doubleLineCustomSeriesState,
  doubleLineCustomSeriesG,
  doubleLineCustomSeriesFre,
} from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";

// {
//   dataSource: douleLineChartData[2],
//   xName: "x",
//   yName: "y",
//   name: "現在時間",
//   width: "2",
//   type: "Line",
//   color: "black",
// },
// {
//   dataSource: douleLineChartData[3],
//   xName: "x",
//   yName: "y",
//   name: "預測資料",
//   width: "2",
//   type: "Line",
//   color: "#34ebd2",
// },
const Staus_type = JSON.parse(process.env.REACT_APP_Status_type);
console.log(Staus_type);
const DoubleLineChart = ({ height, width, bg, id, type, location }) => {
  const { currentMode, lineData, doubleLineData, setTest, test } =
    useStateContext();

  var selectType = {
    speed: {
      labelFormat: "{value}",
      rangePadding: "None",
      minimum: 0,
      maximum: 360,
      interval: 60,
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
    },
    frequency: {
      labelFormat: "{value}",
      rangePadding: "None",
      minimum: 0,
      maximum: 45,
      interval: 9,
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
    },
    state: {
      labelFormat: "{value}",
      rangePadding: "None",
      minimum: 0,
      maximum: 4,
      interval: 1,
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
    },
    G: {
      labelFormat: "{value}",
      rangePadding: "None",
      minimum: 0,
      maximum: 100000,
      interval: 20000,
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
    },
  };
  //機台
  console.log(lineData[location]);

  var temp = [];
  doubleLineCustomSeriesSpeed[0].dataSource = [];
  doubleLineCustomSeriesSpeed[1].dataSource = [];
  doubleLineCustomSeriesSpeed[2].dataSource = [];
  doubleLineCustomSeriesFre[0].dataSource = [];
  doubleLineCustomSeriesFre[1].dataSource = [];
  doubleLineCustomSeriesFre[2].dataSource = [];
  doubleLineCustomSeriesG[0].dataSource = [];
  doubleLineCustomSeriesG[1].dataSource = [];
  doubleLineCustomSeriesG[2].dataSource = [];
  var addMin = (date, min) => {
    var now = new Date(date);
    var currentMinutes = now.getMinutes();
    // 加一分鐘
    now.setMinutes(currentMinutes + min);
    if (currentMinutes + min < currentMinutes) {
      now.setHours(now.getHours() + 1);
    }
    return now;
  };
  for (var i = 4; i < lineData[location].time.length; i++) {
    temp.push({
      x: new Date(lineData[location].time[i]),
      y: lineData[location].Speed[i],
    });
  }
  doubleLineCustomSeriesSpeed[0].dataSource = temp;
  console.log(doubleLineCustomSeriesSpeed[0].dataSource);
  doubleLineCustomSeriesSpeed[1].dataSource = [
    {
      x: new Date(lineData[location].time[lineData[location].time.length - 1]),
      y: selectType.speed.maximum,
    },
    {
      x: new Date(lineData[location].time[lineData[location].time.length - 1]),
      y: selectType.speed.minimum,
    },
  ];
  var temp = [];
  for (var i = 0; i < lineData[location].recommend_speed.length; i++) {
    if (i !== 0) {
      temp.push({
        x: new Date(
          addMin(lineData[location].time[lineData[location].time.length - 1], i)
        ),
        y: lineData[location].recommend_speed[i],
      });
    } else {
      temp.push({
        x: addMin(
          lineData[location].time[lineData[location].time.length - 1],
          i
        ),
        y: lineData[location].recommend_speed[i],
      });
    }
  }
  doubleLineCustomSeriesSpeed[2].dataSource = temp;
  console.log(doubleLineCustomSeriesSpeed[2].dataSource);
  // doubleLineCustomSeriesSpeed[2].dataSource = doubleLineData.speed.lineFuture;
  //頻率

  var temp = [];
  for (var i = 4; i < lineData[location].time.length; i++) {
    temp.push({
      x: new Date(lineData[location].time[i]),
      y: lineData[location].frequency[i],
    });
  }
  doubleLineCustomSeriesFre[0].dataSource = temp;
  doubleLineCustomSeriesFre[1].dataSource = [
    {
      x: new Date(lineData[location].time[lineData[location].time.length - 1]),
      y: selectType.frequency.maximum,
    },
    {
      x: new Date(lineData[location].time[lineData[location].time.length - 1]),
      y: selectType.frequency.minimum,
    },
  ];
  var temp = [];
  for (var i = 0; i < lineData[location].recommend_frequency.length; i++) {
    if (i !== 0) {
      temp.push({
        x: addMin(
          lineData[location].time[lineData[location].time.length - 1],
          i
        ),
        y: lineData[location].recommend_frequency[i],
      });
    } else {
      temp.push({
        x: addMin(
          lineData[location].time[lineData[location].time.length - 1],
          i
        ),
        y: lineData[location].recommend_frequency[i],
      });
    }
  }
  doubleLineCustomSeriesFre[2].dataSource = temp;

  //Status

  var temp = [];
  for (var i = 4; i < lineData[location].time.length; i++) {
    temp.push({
      x: new Date(lineData[location].time[i]),
      y: lineData[location].Status[i],
    });
  }
  doubleLineCustomSeriesState[0].dataSource = temp;
  doubleLineCustomSeriesState[1].dataSource = [];
  doubleLineCustomSeriesState[2].dataSource = [];
  // recommend_status
  if (lineData[location].recommend_status[0] !== undefined) {
    doubleLineCustomSeriesState[1].dataSource = [
      {
        x: new Date(
          lineData[location].time[lineData[location].time.length - 1]
        ),
        y: selectType.state.maximum,
      },
      {
        x: new Date(
          lineData[location].time[lineData[location].time.length - 1]
        ),
        y: selectType.state.minimum,
      },
    ];
    var temp = [];
    for (var i = 0; i < lineData[location].recommend_status.length; i++) {
      if (i !== 0) {
        temp.push({
          x: addMin(
            lineData[location].time[lineData[location].time.length - 1],
            i
          ),
          y: lineData[location].recommend_status[i],
        });
      } else {
        temp.push({
          x: addMin(
            lineData[location].time[lineData[location].time.length - 1],
            i
          ),
          y: lineData[location].recommend_status[i],
        });
      }
    }
    doubleLineCustomSeriesState[2].dataSource = temp;
  }

  //G
  var temp = [];
  for (var i = 4; i < lineData[location].time.length; i++) {
    temp.push({
      x: new Date(lineData[location].time[i]),
      y: lineData[location].g_change[i],
    });
  }
  doubleLineCustomSeriesG[0].dataSource = temp;
  doubleLineCustomSeriesG[1].dataSource = [
    {
      x: new Date(lineData[location].time[lineData[location].time.length - 1]),
      y: selectType.G.maximum,
    },
    {
      x: new Date(lineData[location].time[lineData[location].time.length - 1]),
      y: selectType.G.minimum,
    },
  ];
  var temp = [];
  for (var i = 0; i < lineData[location].recommend_g_change.length; i++) {
    if (i !== 0) {
      temp.push({
        x: addMin(
          lineData[location].time[lineData[location].time.length - 1],
          i
        ),
        y: lineData[location].recommend_g_change[i],
      });
    } else {
      temp.push({
        x: addMin(
          lineData[location].time[lineData[location].time.length - 1],
          i
        ),
        y: lineData[location].recommend_g_change[i],
      });
    }
  }
  doubleLineCustomSeriesG[2].dataSource = temp;

  useEffect(() => {
    //機台
    console.log(lineData[location]);
    doubleLineCustomSeriesSpeed[0].dataSource = [];
    doubleLineCustomSeriesSpeed[1].dataSource = [];
    doubleLineCustomSeriesSpeed[2].dataSource = [];
    doubleLineCustomSeriesFre[0].dataSource = [];
    doubleLineCustomSeriesFre[1].dataSource = [];
    doubleLineCustomSeriesFre[2].dataSource = [];
    doubleLineCustomSeriesG[0].dataSource = [];
    doubleLineCustomSeriesG[1].dataSource = [];
    doubleLineCustomSeriesG[2].dataSource = [];
    var temp = [];
    for (var i = 4; i < lineData[location].time.length; i++) {
      temp.push({
        x: new Date(lineData[location].time[i]),
        y: lineData[location].Speed[i],
      });
    }
    doubleLineCustomSeriesSpeed[0].dataSource = temp;
    console.log(doubleLineCustomSeriesSpeed[0].dataSource);
    doubleLineCustomSeriesSpeed[1].dataSource = [
      {
        x: new Date(
          lineData[location].time[lineData[location].time.length - 1]
        ),
        y: selectType.speed.maximum,
      },
      {
        x: new Date(
          lineData[location].time[lineData[location].time.length - 1]
        ),
        y: selectType.speed.minimum,
      },
    ];
    var temp = [];
    for (var i = 0; i < lineData[location].recommend_speed.length; i++) {
      if (i !== 0) {
        temp.push({
          x: new Date(
            addMin(
              lineData[location].time[lineData[location].time.length - 1],
              i
            )
          ),
          y: lineData[location].recommend_speed[i],
        });
      } else {
        temp.push({
          x: addMin(
            lineData[location].time[lineData[location].time.length - 1],
            i
          ),
          y: lineData[location].recommend_speed[i],
        });
      }
    }
    doubleLineCustomSeriesSpeed[2].dataSource = temp;
    console.log(doubleLineCustomSeriesSpeed[2].dataSource);
    // doubleLineCustomSeriesSpeed[2].dataSource = doubleLineData.speed.lineFuture;
    //頻率

    var temp = [];
    for (var i = 4; i < lineData[location].time.length; i++) {
      temp.push({
        x: new Date(lineData[location].time[i]),
        y: lineData[location].frequency[i],
      });
    }
    doubleLineCustomSeriesFre[0].dataSource = temp;
    doubleLineCustomSeriesFre[1].dataSource = [
      {
        x: new Date(
          lineData[location].time[lineData[location].time.length - 1]
        ),
        y: selectType.frequency.maximum,
      },
      {
        x: new Date(
          lineData[location].time[lineData[location].time.length - 1]
        ),
        y: selectType.frequency.minimum,
      },
    ];
    var temp = [];
    for (var i = 0; i < lineData[location].recommend_frequency.length; i++) {
      if (i !== 0) {
        temp.push({
          x: addMin(
            lineData[location].time[lineData[location].time.length - 1],
            i
          ),
          y: lineData[location].recommend_frequency[i],
        });
      } else {
        temp.push({
          x: addMin(
            lineData[location].time[lineData[location].time.length - 1],
            i
          ),
          y: lineData[location].recommend_frequency[i],
        });
      }
    }
    doubleLineCustomSeriesFre[2].dataSource = temp;

    //Status

    var temp = [];
    for (var i = 4; i < lineData[location].time.length; i++) {
      temp.push({
        x: new Date(lineData[location].time[i]),
        y: lineData[location].Status[i],
      });
    }
    doubleLineCustomSeriesState[0].dataSource = temp;
    doubleLineCustomSeriesState[1].dataSource = [];
    doubleLineCustomSeriesState[2].dataSource = [];
    // recommend_status
    if (lineData[location].recommend_status[0] !== undefined) {
      doubleLineCustomSeriesState[1].dataSource = [
        {
          x: new Date(
            lineData[location].time[lineData[location].time.length - 1]
          ),
          y: selectType.state.maximum,
        },
        {
          x: new Date(
            lineData[location].time[lineData[location].time.length - 1]
          ),
          y: selectType.state.minimum,
        },
      ];
      var temp = [];
      for (var i = 0; i < lineData[location].recommend_status.length; i++) {
        if (i !== 0) {
          temp.push({
            x: addMin(
              lineData[location].time[lineData[location].time.length - 1],
              i
            ),
            y: lineData[location].recommend_status[i],
          });
        } else {
          temp.push({
            x: addMin(
              lineData[location].time[lineData[location].time.length - 1],
              i
            ),
            y: lineData[location].recommend_status[i],
          });
        }
      }
      doubleLineCustomSeriesState[2].dataSource = temp;
    }

    //G
    var temp = [];
    for (var i = 4; i < lineData[location].time.length; i++) {
      temp.push({
        x: new Date(lineData[location].time[i]),
        y: lineData[location].g_change[i],
      });
    }
    doubleLineCustomSeriesG[0].dataSource = temp;
    doubleLineCustomSeriesG[1].dataSource = [
      {
        x: new Date(
          lineData[location].time[lineData[location].time.length - 1]
        ),
        y: selectType.G.maximum,
      },
      {
        x: new Date(
          lineData[location].time[lineData[location].time.length - 1]
        ),
        y: selectType.G.minimum,
      },
    ];
    var temp = [];
    for (var i = 0; i < lineData[location].recommend_g_change.length; i++) {
      if (i !== 0) {
        temp.push({
          x: addMin(
            lineData[location].time[lineData[location].time.length - 1],
            i
          ),
          y: lineData[location].recommend_g_change[i],
        });
      } else {
        temp.push({
          x: addMin(
            lineData[location].time[lineData[location].time.length - 1],
            i
          ),
          y: lineData[location].recommend_g_change[i],
        });
      }
    }
    doubleLineCustomSeriesG[2].dataSource = temp;
  }, [lineData[location].Speed.length, test]);

  return (
    <div className=" flex flex-col">
      <div>
        <p className="text-lg text-gray-600">轉速</p>
        <ChartComponent
          id="1"
          height="140px"
          width="700px"
          primaryXAxis={LinePrimaryXAxis}
          primaryYAxis={selectType["speed"]}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          background={bg}
          legendSettings={{ background: "white" }}
        >
          <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
          <SeriesCollectionDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {doubleLineCustomSeriesSpeed.map((item, index) => (
              <SeriesDirective fill={item.color} key={index} {...item} />
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
      <div>
        <p className="text-lg text-gray-600">頻率</p>
        <ChartComponent
          id={2}
          height="140px"
          width="700px"
          primaryXAxis={LinePrimaryXAxis}
          primaryYAxis={selectType["frequency"]}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          background={bg}
          legendSettings={{ background: "white" }}
        >
          <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
          <SeriesCollectionDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {doubleLineCustomSeriesFre.map((item, index) => (
              <SeriesDirective fill={item.color} key={index} {...item} />
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
      <div>
        <p className="text-lg text-gray-600">狀態</p>
        <ChartComponent
          id="3"
          height="140px"
          width="700px"
          primaryXAxis={LinePrimaryXAxis}
          primaryYAxis={selectType["state"]}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          background={bg}
          legendSettings={{ background: "white" }}
        >
          <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
          <SeriesCollectionDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {doubleLineCustomSeriesState.map((item, index) => (
              <SeriesDirective fill={item.color} key={index} {...item} />
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
      {lineData[location].have_vibration == 0 ? (
        <div></div>
      ) : (
        <div>
          <p className="text-lg text-gray-600">G合力</p>
          <ChartComponent
            id="4"
            height="140px"
            width="700px"
            primaryXAxis={LinePrimaryXAxis}
            primaryYAxis={selectType["G"]}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            background={bg}
            legendSettings={{ background: "white" }}
          >
            <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
            <SeriesCollectionDirective>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              {doubleLineCustomSeriesG.map((item, index) => (
                <SeriesDirective fill={item.color} key={index} {...item} />
              ))}
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      )}
    </div>
  );
};

export default DoubleLineChart;
