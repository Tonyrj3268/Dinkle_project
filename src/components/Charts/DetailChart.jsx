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

const DetailChart = ({ height, width, bg, type }) => {
  const { lineData, test, setTest, location, setLocation, detailData } =
    useStateContext();
  var data = [
    {
      dataSource: [],
      xName: "x",
      yName: "y",
      name: "Maximum",
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
      color: "red",
    },

    {
      dataSource: [],
      xName: "x",
      yName: "y",
      name: "PredictLine",
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
      color: "#34ebd2",
    },
    {
      dataSource: [],
      xName: "x",
      yName: "y",
      name: "Mimimum",
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
      color: "red",
    },
  ];

  var tem1 = [];
  var tem2 = [];
  var tem3 = [];
  if (detailData.details !== 0) {
    for (
      var i = 0;
      i <
      lineData[detailData.location].pred_avg_detail[
        `pred_avg_detail_${detailData.details}`
      ].length;
      i++
    ) {
      tem1.push({
        x: lineData[detailData.location].time[i],
        y: lineData[detailData.location].standard_max_detail[
          `standard_max_detail_${detailData.details}`
        ],
      });
      tem2.push({
        x: lineData[detailData.location].time[i],
        y: lineData[detailData.location].standard_min_detail[
          `standard_min_detail_${detailData.details}`
        ],
      });
      tem3.push({
        x: lineData[detailData.location].time[i],
        y: lineData[detailData.location].pred_avg_detail[
          `pred_avg_detail_${detailData.details}`
        ][i],
      });
    }
    lineCustomSeries[0].dataSource = tem1;
    lineCustomSeries[1].dataSource = tem3;
    lineCustomSeries[2].dataSource = tem2;
    console.log("update detail");
  }
  useEffect(() => {
    var tem1 = [];
    var tem2 = [];
    var tem3 = [];
    console.log(
      lineData[detailData.location].pred_avg_detail[
        `pred_avg_detail_${detailData.details}`
      ]
    );
    if (detailData.details !== 0) {
      for (
        var i = 0;
        i <
        lineData[detailData.location].pred_avg_detail[
          `pred_avg_detail_${detailData.details}`
        ].length;
        i++
      ) {
        tem1.push({
          x: lineData[detailData.location].time[i],
          y: lineData[detailData.location].standard_max_detail[
            `standard_max_detail_${detailData.details}`
          ],
        });
        tem2.push({
          x: lineData[detailData.location].time[i],
          y: lineData[detailData.location].standard_min_detail[
            `standard_min_detail_${detailData.details}`
          ],
        });
        tem3.push({
          x: lineData[detailData.location].time[i],
          y: lineData[detailData.location].pred_avg_detail[
            `pred_avg_detail_${detailData.details}`
          ][i],
        });
      }
      lineCustomSeries[0].dataSource = tem1;
      lineCustomSeries[1].dataSource = tem3;
      lineCustomSeries[2].dataSource = tem2;
      console.log(lineData[detailData.location]);
      console.log("update detail");
    }
  }, [test, lineData[detailData.location].time[i]]);

  return (
    <ChartComponent
      id="line-chart"
      height={height}
      width={width}
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={{
        labelFormat: "{value}",
        rangePadding: "None",
        minimum: detailData.min,
        maximum: detailData.max,
        interval: (detailData.max - detailData.min) / 4,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
      }}
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

export default DetailChart;
