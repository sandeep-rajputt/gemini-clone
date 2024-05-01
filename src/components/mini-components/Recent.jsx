import { useSelector } from "react-redux";
const Recent = () => {
  const { isNav } = useSelector((state) => state.main);
  return (
    <div>
      <span
        className={`tracking-tighter text-white pl-2 ${
          isNav ? "block" : "hidden 2xl:block"
        }`}
      >
        <span className="block ">Recent</span>
        <span className="text-secondary mt-3 block">Comming Soon...</span>
      </span>
    </div>
  );
};

export default Recent;
