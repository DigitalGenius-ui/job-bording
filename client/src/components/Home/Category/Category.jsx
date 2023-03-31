import React from "react";
import Heading from "../../util/Heading/Heading";
import { category } from "./data";
import SingleCategory from "./SingleCategory";

const Category = () => {
  return (
    <div className="size">
      <Heading
        tag="Jobs Category"
        title="Top Trending Categories"
        shadow="Job Categories"
        desc="Lorem Ipsum is simply dummy text printing and type setting industry
        Lorem Ipsum been industry standard dummy text ever since when unknown
        printer took a galley"
      />
      <div className="w-full grid grid-cols-cart text-right mb-5">
        {category.map((cat, i) => (
          <SingleCategory key={i} cat={cat} />
        ))}
      </div>

      <div className="mb-16">
        <button
          className="bg-orang py-2 px-5 rounded-md text-white shadow-lg shadow-orange-100
          flex items-center gap-1 justify-center mx-auto transition-all duration-500 border-2 
          border-orang hover:bg-transparent hover:text-orang"
        >
          View All Categories
        </button>
      </div>
    </div>
  );
};

export default Category;
