import WorkIcon from "@mui/icons-material/Work";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

export const countries = ["afghanistan", "india", "canada", "America", "Remote"];
export const categories = [
  "customer service",
  "data analytic",
  "web designing",
  "software developer",
  "networking",
];

export const totalJobs = [
  {
    title: "Live Jobs Posted",
    total: 1233,
    icon : <WorkIcon sx={{fontSize : "2.5rem"}}/>
  },
  {
    title: "Jobs Candidate",
    total: 1233,
    icon : <ArticleOutlinedIcon sx={{fontSize : "2.5rem"}}/>
  },
  {
    title: "Companies Jobs",
    total: 1233,
    icon : <ReceiptLongOutlinedIcon sx={{fontSize : "2.5rem"}}/>
  },
];
