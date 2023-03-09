import React from "react";

// this card comp has been used in help comp and reward
const Card = (props) => {
  const { icon, title, desc, btn } = props.item;
  const isNumber = typeof title === "number";

  return (
    <div
      className={`shadowCard2 text-center p-6 ${
        !isNumber && "hover:scale-110"
      } transition-all duration-500`}
    >
      <span
        className="bg-gray-100 rounded-full p-3 text-orang h-[5rem] w-[5rem] 
        grid place-items-center mx-auto"
      >
        {icon}
      </span>
      <div className="mt-8">
        <h1
          className={`font-semibold ${
            isNumber ? "text-4xl font-extrabold text-gray-600" : "text-xl"
          }`}
        >
          {title}
        </h1>
        <p className="text-gray-500 py-3">{desc}</p>
        {btn && (
          <button
            className="bg-orang mt-2 py-3 px-8 rounded-md hover:bg-orange-200 transition-all
          duration-500 text-white"
          >
            {btn}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
