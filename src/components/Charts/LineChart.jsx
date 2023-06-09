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
  passRateLineCustomSeries,
  LinePrimaryXAxis,
  LinePrimaryYAxis,
} from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";

const LineChart = ({ height, width, bg, type }) => {
  const { test, lineData, setTest, passRate } = useStateContext();
  var selectType = {
    Detail: {
      labelFormat: "{value}",
      rangePadding: "None",
      minimum: 0,
      maximum: 4,
      interval: 1,
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
    },
    Yield: {
      labelFormat: "{value}%",
      rangePadding: "None",
      minimum: 0,
      maximum: 100,
      interval: 20,
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      minorTickLines: { width: 0 },
    },
  };
  passRateLineCustomSeries[0].dataSource = passRate;

  useEffect(() => {
    passRateLineCustomSeries[0].dataSource = passRate;
  }, [passRate]);

  return (
    <ChartComponent
      id="line-chart"
      height={height}
      width={width}
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={selectType[type]}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={bg}
      legendSettings={{ background: "white" }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {passRateLineCustomSeries.map((item, index) => (
          <SeriesDirective fill={item.color} key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
