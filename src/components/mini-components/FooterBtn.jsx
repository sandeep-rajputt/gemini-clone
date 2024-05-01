import Tooltip from "@mui/material/Tooltip";

const FooterBtn = ({ children, title, clickHandler }) => {
  return (
    <Tooltip title={title}>
      <button
        className="text-white hover:bg-light-dark-4 p-2 rounded-full"
        onClick={clickHandler}
      >
        {children}
      </button>
    </Tooltip>
  );
};

export default FooterBtn;
