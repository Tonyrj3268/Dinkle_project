import React, { useEffect, useState } from "react";
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
function initializeEmptyDataSeries() {
  return Array.from({ length: 15 }).map(() => []);
}

const AllDetailChart = ({ height, width }) => {
  const { lineData, test, setTest, location, setLocation, allDetailData } =
    useStateContext();
  const [lineCustomSeriesArray, setLineCustomSeriesArray] = useState(
    initializeEmptyDataSeries()
  );
  var data = [
    {
      dataSource: [],
      xName: "x",
      yName: "y",
      name: "Max",
      width: "2",
      type: "Line",
      color: "red",
    },

    {
      dataSource: [],
      xName: "x",
      yName: "y",
      name: "Predict_Avg",
      width: "2",
      type: "Line",
      color: "#34ebd2",
    },
    {
      dataSource: [],
      xName: "x",
      yName: "y",
      name: "Mim",
      width: "2",
      type: "Line",
      color: "red",
    },
  ];
  useEffect(() => {
    const newLineCustomSeriesArray = initializeEmptyDataSeries();

    for (let i = 0; i < allDetailData.length; i++) {
      let tem1 = [];
      let tem2 = [];
      let tem3 = [];
      // let lineCustomSeriesCopy = data;
      let lineCustomSeriesCopy = JSON.parse(JSON.stringify(data));

      for (let j = 0; j < allDetailData[i].time.length; j++) {
        tem1.push({
          x: allDetailData[i].time[j],
          y: allDetailData[i].details_max[j],
        });
        tem2.push({
          x: allDetailData[i].time[j],
          y: allDetailData[i].details[j],
        });
        tem3.push({
          x: allDetailData[i].time[j],
          y: allDetailData[i].details_min[j],
        });
      }
      lineCustomSeriesCopy[0].dataSource = tem1;
      lineCustomSeriesCopy[0].name = "Max";
      lineCustomSeriesCopy[1].dataSource = tem2;
      lineCustomSeriesCopy[1].marker = undefined;
      lineCustomSeriesCopy[1].name = "Predict_Avg";
      lineCustomSeriesCopy[2].dataSource = tem3;
      lineCustomSeriesCopy[2].name = "Min";
      newLineCustomSeriesArray[i] = lineCustomSeriesCopy;
    }

    setLineCustomSeriesArray(newLineCustomSeriesArray);
  }, [allDetailData]);
  if (allDetailData) {
    return (
      <div className="grid grid-cols-3 grid-rows-5">
        {allDetailData.map((allDetail, index) => (
          <div className="chart-item" key={index}>
            <ChartComponent
              id={`line-chart-${index + 1}`}
              height={height}
              width={width}
              primaryXAxis={LinePrimaryXAxis}
              primaryYAxis={{
                labelFormat: "{value}",
                rangePadding: "None",
                minimum: allDetail.min,
                maximum: allDetail.max,
                interval: (allDetail.max - allDetail.min) / 4,
                lineStyle: { width: 0 },
                majorTickLines: { width: 0 },
                minorTickLines: { width: 0 },
              }}
            >
              <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
              <SeriesCollectionDirective>
                {lineCustomSeriesArray[index].map((item, seriesIndex) => (
                  <SeriesDirective
                    fill={item.color}
                    key={seriesIndex}
                    {...item}
                  />
                ))}
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-3 grid-rows-4 gap-4">
        {lineCustomSeriesArray.map((lineCustomSeries, index) => (
          <div className="chart-item" key={index}>
            <ChartComponent
              id={`line-chart-${index + 1}`}
              height={height}
              width={width}
              primaryXAxis={LinePrimaryXAxis}
              // ... (其他屬性)
            >
              <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
              <SeriesCollectionDirective>
                {lineCustomSeries.map((item, seriesIndex) => (
                  <SeriesDirective
                    fill={item.color}
                    key={seriesIndex}
                    {...item}
                  />
                ))}
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        ))}
      </div>
    );
  }
};

export default AllDetailChart;
