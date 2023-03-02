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

const LineChart = ({ height, width, lineChartData, bg }) => {
  const { currentMode, lineData } = useStateContext();

  useEffect(() => {
    console.log(lineData);
    lineCustomSeries[1].dataSource = lineData.lineChartData1;
    lineCustomSeries[0].dataSource = lineData.lineMax;
    lineCustomSeries[2].dataSource = lineData.lineMin;
  }, [lineData]);

  return (
    <ChartComponent
      id="line-chart"
      height={height}
      width={width}
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={bg}
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
