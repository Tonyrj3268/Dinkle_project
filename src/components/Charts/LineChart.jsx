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
  lineCustomSeries,
  LinePrimaryXAxis,
  LinePrimaryYAxis,
} from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";

const LineChart = ({ height, width, lineChartData }) => {
  const { currentMode, lineData } = useStateContext();
  console.log(height);
  console.log(lineChartData);
  useEffect(() => {
    console.log(lineData);
    lineCustomSeries[1].dataSource = lineData;
  }, [lineData]);
  lineCustomSeries[1].dataSource = lineChartData;
  return (
    <ChartComponent
      id="line-chart"
      height={height}
      width={width}
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
      legendSettings={{ background: "white" }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {lineCustomSeries.map((item, index) => (
          <SeriesDirective fill={item.color} key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
