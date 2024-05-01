/* eslint-disable react/prop-types */
import Tooltip from "@mui/material/Tooltip";

const Button = ({ children, title, clickHandler, cls }) => {
  return (
    <Tooltip title={title}>
      <button
        className={` ${
          cls && cls
        } text-white flex hover:bg-light-dark-4 p-2 rounded-full`}
        onClick={clickHandler}
      >
        {children}
      </button>
    </Tooltip>
  );
};

export default Button;
