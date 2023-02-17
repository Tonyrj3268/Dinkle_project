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
  doubleLineCustomSeries,
  LinePrimaryXAxis,
  LinePrimaryYAxis,
} from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";

const DoubleLineChart = ({ height, width }) => {
  const { currentMode, lineData } = useStateContext();

  useEffect(() => {
    // console.log(lineData);
    doubleLineCustomSeries[0].dataSource = lineData.lineMax;
    doubleLineCustomSeries[1].dataSource = lineData.lineChartData1;
    doubleLineCustomSeries[2].dataSource = lineData.lineChartData2;
    doubleLineCustomSeries[3].dataSource = lineData.lineMin;
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
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
      legendSettings={{ background: "white" }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {doubleLineCustomSeries.map((item, index) => (
          <SeriesDirective fill={item.color} key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default DoubleLineChart;
