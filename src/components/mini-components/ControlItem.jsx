import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";

const ControlItem = ({ icon, text, title }) => {
  const { isNav } = useSelector((state) => state.main);
  return (
    <Tooltip title={title} placement="right">
      <div
        className={`flex text-white cursor-pointer items-center gap-2 rounded-full w-full hover:bg-light-dark-4 p-2 px-3 ${
          isNav ? "" : ""
        } `}
      >
        {icon}
        <p className={`text-sm ${isNav ? "block" : "hidden 2xl:block"}`}>
          {text}
        </p>
      </div>
    </Tooltip>
  );
};

export default ControlItem;
