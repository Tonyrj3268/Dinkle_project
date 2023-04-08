import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Dark");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [test, setTest] = useState(1);
  const [isClicked, setIsClicked] = useState(initialState);
  const [isTrClicked, setIsTrClicked] = useState(false);

  const [lineData, setLineData] = useState({
    Detail: "Detail預測",
    CorrectRange: "",
    RealRange: "",
    Status: "",
    lineChartData1: [],
    selectChartData1: [],
    lineChartData2: [],
    selectChartData2: [],
    lineNow: [],
    lineFuture: [],
    BestRate: "",
    BestStatus: "",
    BestTimes: "",
    times: 0,
    Shap: {
      name: "",
      rate: "",
      times: "",
      status: "",
    },
    times: 0,

    lineMin: [
      { x: new Date(2023, 0, 1, 0, 0, 0), y: 10 },
      { x: new Date(2023, 0, 1, 0, 0, 10), y: 10 },
      { x: new Date(2023, 0, 1, 0, 0, 20), y: 10 },
      { x: new Date(2023, 0, 1, 0, 0, 30), y: 10 },
      { x: new Date(2023, 0, 1, 0, 0, 40), y: 10 },
      { x: new Date(2023, 0, 1, 0, 0, 50), y: 10 },
      { x: new Date(2023, 0, 1, 0, 0, 60), y: 10 },
    ],
    lineMax: [
      { x: new Date(2023, 0, 1, 0, 0, 0), y: 90 },
      { x: new Date(2023, 0, 1, 0, 0, 10), y: 90 },
      { x: new Date(2023, 0, 1, 0, 0, 20), y: 90 },
      { x: new Date(2023, 0, 1, 0, 0, 30), y: 90 },
      { x: new Date(2023, 0, 1, 0, 0, 40), y: 90 },
      { x: new Date(2023, 0, 1, 0, 0, 50), y: 90 },
      { x: new Date(2023, 0, 1, 0, 0, 60), y: 90 },
    ],
  });
  const [doubleLineData, setDoubleLineData] = useState({
    Detail: "Detail預測",
    CorrectRange: "",
    RealRange: "",
    Status: "",
    speed: {
      lineChartData1: [],
      selectChartData1: [],
      lineChartData2: [],
      selectChartData2: [],

      times: 0,
      lineMin: [],
      lineNow: [],
      lineFuture: [],
    },
    frequency: {
      lineChartData1: [],
      selectChartData1: [],
      lineChartData2: [],
      selectChartData2: [],

      times: 0,
      lineMin: [],
      lineNow: [],
      lineFuture: [],
    },
    state: {
      lineChartData1: [],
      selectChartData1: [],
      lineChartData2: [],
      selectChartData2: [],

      times: 0,
      lineMin: [],
      lineNow: [],
      lineFuture: [],
    },
    G: {
      lineChartData1: [],
      selectChartData1: [],
      lineChartData2: [],
      selectChartData2: [],

      times: 0,
      lineMin: [],
      lineNow: [],
      lineFuture: [],
    },

    times: 0,
  });

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        lineData,
        setLineData,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        test,
        setTest,
        isTrClicked,
        setIsTrClicked,
        doubleLineData,
        setDoubleLineData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
