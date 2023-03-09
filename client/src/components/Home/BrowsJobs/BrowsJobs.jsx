import React from "react";
import Card from "./Card";

const BrowsJobs = () => {
  return (
    <div className="pt-20 mx-2 flex flex-col gap-2 md:flex-row">
      <Card
        title="Find Your Browse Companies"
        desc={`Lorem Ipsum is simply dummy text of printing and type setting 
        industry. Lorem Ipsum been industry standard dummy text ever since,
        when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries.`}
        btn="Browse Companies"
      />
      <Card
        title="Find Your Browse Jobs"
        desc={`Lorem Ipsum is simply dummy text of printing and type setting 
        industry. Lorem Ipsum been industry standard dummy text ever since,
        when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries.`}
        btn="Browse Jobs"
      />
    </div>
  );
};

export default BrowsJobs;
