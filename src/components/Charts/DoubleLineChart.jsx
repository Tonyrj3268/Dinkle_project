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

const DoubleLineChart = ({ height, width, bg, id, type }) => {
  const { currentMode, lineData, doubleLineData, setTest, test } =
    useStateContext();

  var selectType = {
    speed: {
      labelFormat: "{value}",
      rangePadding: "None",
      minimum: 0,
      maximum: 355,
      interval: 51,
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
      maximum: 7500,
      interval: 1500,
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
    },
  };

  useEffect(() => {
    // console.log(lineData);
    //機台
    doubleLineCustomSeriesSpeed[0].dataSource = doubleLineData.speed.lineNow;
    doubleLineCustomSeriesSpeed[1].dataSource =
      doubleLineData.speed.lineChartData2;
    doubleLineCustomSeriesSpeed[2].dataSource = doubleLineData.speed.lineFuture;
    //頻率
    doubleLineCustomSeriesFre[0].dataSource = doubleLineData.frequency.lineNow;
    doubleLineCustomSeriesFre[1].dataSource =
      doubleLineData.frequency.lineChartData2;
    doubleLineCustomSeriesFre[2].dataSource =
      doubleLineData.frequency.lineFuture;
    //狀態
    doubleLineCustomSeriesState[0].dataSource = doubleLineData.state.lineNow;
    doubleLineCustomSeriesState[1].dataSource =
      doubleLineData.state.lineChartData2;
    doubleLineCustomSeriesState[2].dataSource = doubleLineData.state.lineFuture;
    //G
    doubleLineCustomSeriesG[0].dataSource = doubleLineData.G.lineNow;
    doubleLineCustomSeriesG[1].dataSource = doubleLineData.G.lineChartData2;
    doubleLineCustomSeriesG[2].dataSource = doubleLineData.G.lineFuture;
    console.log(doubleLineCustomSeriesState[0].dataSource);
    setTest((prev) => prev + 1);
  }, [doubleLineData.state.lineNow]);

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
    </div>
  );
};

export default DoubleLineChart;
