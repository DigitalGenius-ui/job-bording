import React from "react";

const PostInfo = () => {
  const lists = [
    "Every 30 days, your listing will be automatically renewed.",
    "We will remove your job posting after 180 days.",
    "If you want to keep your job posting after 180 days, send us an email.",
    "If the position is not filled within 40 days, please contact us via email.",
    "techsinarif@gmail.com is our e-mail address.",
  ];
  return (
    <div className="text-center md:text-left mt-5 md:mt-0">
      <h1 className="text-3xl py-2">Disclaimer</h1>
      <ul className="md:p-3 flex flex-col gap-3 md:pl-9">
        {lists.map((list, i) => (
          <li key={i}
          className="list-none md:list-disc"
          >{list}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostInfo;
