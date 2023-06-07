import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import dinkle_logo from "../data/dinkle_logo.jpg";
import { links } from "../data/dummy";
//{
//   title: "歷史品質分析",
//   links: [
//     {
//       name: "次數統計",
//       icon: <AiOutlineCalendar />,
//     },
//     {
//       name: "原因分析",
//       icon: <BsKanban />,
//     },
//     {
//       name: "預測趨勢",
//       icon: <FiEdit />,
//     },
//   ],
// },
// {
//   title: "Charts",
//   links: [
//     {
//       name: "line",
//       icon: <AiOutlineStock />,
//     },
//     {
//       name: "area",
//       icon: <AiOutlineAreaChart />,
//     },

//     {
//       name: "bar",
//       icon: <AiOutlineBarChart />,
//     },
//     {
//       name: "pie",
//       icon: <FiPieChart />,
//     },
//     {
//       name: "financial",
//       icon: <RiStockLine />,
//     },
//     {
//       name: "color-mapping",
//       icon: <BsBarChart />,
//     },
//     {
//       name: "pyramid",
//       icon: <GiLouvrePyramid />,
//     },
//     {
//       name: "stacked",
//       icon: <AiOutlineBarChart />,
//     },
//   ],
// },
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    screenSize,
    setIsTrClicked,
  } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }

    setIsTrClicked("");
  };
  var url = "?";
  for (
    var i = 0;
    i < JSON.parse(process.env.REACT_APP_extra_query).length;
    i++
  ) {
    url =
      url +
      JSON.parse(process.env.REACT_APP_extra_query)[i] +
      "=" +
      JSON.parse(process.env.REACT_APP_extra_query_ans)[i] +
      "&";
  }

  const linkSet = {
    後台總管理: "admin",
    即時監控: "realtime",
    line: "line",
    Detail預測: "detail",
    area: "area",
    bar: "bar",
    pie: "pie",
    financial: "financial",
    stacked: "stacked",
    維修項目: "fix",
    次數統計: "costtotal",
    歷史分析: "Cause",
    預測趨勢: "FutureAnalysis",
  };
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/?id1=1&id2=2&id3=3"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img src={dinkle_logo} className="h-10" />{" "}
              <span className="text-xl">即時監控平台</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${linkSet[link.name]}/${url}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
