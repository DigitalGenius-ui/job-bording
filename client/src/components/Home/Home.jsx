import React, { useEffect, useState } from "react";
import Download from "./Client/Client";
import Banner from "./Banner/Banner";
import BrowsJobs from "./BrowsJobs/BrowsJobs";
import Category from "./Category/Category";
import Jobs from "./LatestJob/Jobs";
import Help from "./Help/Help";
import Award from "./Award/Award";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { PostJobContexts } from "../../Context/PostJobContext";

const Home = () => {
  const [isScroll, setIsScroll] = useState(false);
  const { refetch } = PostJobContexts();
  const scrollTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      return window.scrollY > 50 ? setIsScroll(true) : setIsScroll(false);
    });
    refetch();
  }, [isScroll, refetch]);

  return (
    <section>
      <Banner />
      <Category />
      <Jobs />
      <Download />
      <BrowsJobs />
      <Help />
      <Award />

      {/* arrow ro scroll up  */}
      <span
        onClick={scrollTop}
        className={`fixed bottom-8 right-8 w-[3rem] h-[3rem] bg-orang grid place-items-center
        rounded-full cursor-pointer text-white transition-all duration-500 ${
          isScroll
            ? "translate-x-[0] opacity-100"
            : "translate-x-[8rem] opacity-0"
        } hover:opacity-50`}>
        <ArrowUpwardOutlinedIcon />
      </span>
    </section>
  );
};

export default Home;
