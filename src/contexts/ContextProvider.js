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
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [lineData, setLineData] = useState({
    Detail: "Detail5",
    CorrectRange: "2.1~4.75",
    RealRange: "3.0~3.3",
    Status: "合格",
    lineChartData: [
      { x: new Date(2023, 0, 1, 0, 0, 0), y: 42 },
      { x: new Date(2023, 0, 1, 0, 0, 10), y: 25 },
      { x: new Date(2023, 0, 1, 0, 0, 20), y: 35 },
      { x: new Date(2023, 0, 1, 0, 0, 30), y: 30 },
      { x: new Date(2023, 0, 1, 0, 0, 40), y: 45 },
      { x: new Date(2023, 0, 1, 0, 0, 50), y: 48 },
      { x: new Date(2023, 0, 1, 0, 0, 60), y: 20 },
    ],
    BestRate: "不需調整",
    BestStatus: "不需調整",
    BestTimes: "不需調整",
    Shap: {
      name: "0",
      rate: "281",
      times: "6.2",
      status: 2,
    },
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
