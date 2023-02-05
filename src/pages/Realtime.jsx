import React from "react";
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

import { realtimeData, contextMenuItems, realtimeGrid } from "../data/dummy";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import DiaLog from "./Dialog";
const Realtime = () => {
  function dialogTemplete(props) {
    return <DiaLog {...props} />;
  }
  const editing = {
    mode: "Normal",
    allowEditing: true,
    template: dialogTemplete,
  };
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-y-hidden">
      <Header category="Page" title="即時監控" />
      <div className="flex  ">
        <div className=" dark:text-gray-200 bg-red-600 h-44 rounded-xl lg:w-56 p-5 pt-9 m-3  bg-center">
          <div className="flex justify-between items-center ">
            <div>
              <p className="text-2xl font-bold ">預測品質狀況</p>
            </div>
          </div>
          <div className="mt-6">
            <p>合格</p>
          </div>
        </div>
        <div className=" dark:text-gray-200 bg-red-600 h-44 rounded-xl lg:w-56 p-5 pt-9 m-3  bg-center">
          <div className="flex justify-between items-center ">
            <div>
              <p className="text-2xl font-bold ">不合格</p>
            </div>
          </div>
          <div className="mt-6">
            <p>detail 2,5,7</p>
          </div>
        </div>
        <div className=" dark:text-gray-200 bg-red-600 h-44 rounded-xl lg:w-56 p-5 pt-9 m-3  bg-center">
          <div className="flex justify-between items-center ">
            <div>
              <p className="text-2xl font-bold ">需調整機台</p>
            </div>
          </div>
          <div className="mt-6">
            <p>機台一,機台二</p>
          </div>
        </div>
        <div className=" dark:text-gray-200 bg-red-600 h-44 rounded-xl lg:w-56 p-5 pt-9 m-3  bg-center">
          <div className="flex justify-between items-center ">
            <div>
              <p className="font-bold ">預測良率：98%</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="font-bold ">預測不良率：2%</p>
          </div>
        </div>
      </div>
      <GridComponent
        id="gridcomp"
        dataSource={realtimeData}
        allowSorting
        contextMenuItems={contextMenuItems}
        editSettings={editing}
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
  );
};
export default Realtime;
