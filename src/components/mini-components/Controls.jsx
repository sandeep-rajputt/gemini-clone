import ControlItem from "./ControlItem";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { LuHistory } from "react-icons/lu";
import { IoSettingsSharp } from "react-icons/io5";
const Controls = () => {
  return (
    <div>
      <ControlItem
        icon={<IoMdHelpCircleOutline size={"1.3em"} />}
        text={"Help"}
        title={"Help"}
      />
      <ControlItem
        icon={<LuHistory size={"1.3em"} />}
        text={"Activity"}
        title={"Activity"}
      />
      <ControlItem
        icon={<IoSettingsSharp size={"1.3em"} />}
        text={"Setting"}
        title={"Setting"}
      />
    </div>
  );
};

export default Controls;
