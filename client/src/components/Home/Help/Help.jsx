import React from "react";
import Card from "../../util/Card/Card";
import Heading from "../../util/Heading/Heading";
import { help } from "./data";

const Help = () => {
  return (
    <div className="size pb-16">
      <Heading
        tag="Business Help Service"
        title="Need Any Help?"
        shadow="Business Help Service"
        desc="Lorem Ipsum is simply dummy text printing and type setting industry 
        Lorem Ipsum been industry standard dummy text ever since when unknown printer took a galley."
      />

      <div className="grid grid-cols-cart gap-8">
        {help.map((item, i) => (
          <Card item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Help;
