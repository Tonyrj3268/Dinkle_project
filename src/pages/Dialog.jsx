import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { LineChart } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
const DiaLog = (props) => {
  const { currentMode } = useStateContext();
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = (res) => {
    console.log(res);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(props);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="lg"
    >
      <h1 className=" p-7 text-3xl font-semibold">Line Chart</h1>
      <DialogContent>
        <div className=" flex flex-row px-5 gap-10">
          <LineChart
            height={"450px"}
            width={"600px"}
            lineChartData={props.lineChartData}
          />
          <div className="flex flex-col p-5 w-[450px] h-[450px] bg-red-600 rounded-xl justify-start items-start text-white ">
            <p className=" text-2xl p-2">機台ID：{props.ID}</p>
            <p className=" text-2xl p-2">機台名稱：{props.Name}</p>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiaLog;
