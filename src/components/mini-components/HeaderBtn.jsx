import reactUniqueIds from "react-unique-ids";

const HeaderBtn = ({ icon, handleClick, zIndex }) => {
  return (
    <button
      onClick={() => {
        if (handleClick) {
          handleClick();
        }
      }}
      id={reactUniqueIds()}
      className={`text-white p-2  hover:bg-light-dark-4 rounded-full hidden 2xl:flex ${
        zIndex && zIndex
      }`}
    >
      {icon}
    </button>
  );
};

export default HeaderBtn;
