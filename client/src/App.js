import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Message from "./components/util/Alert/Message";
import { Routes, Route, Navigate } from "react-router-dom";
import JobPost from "./Pages/AddJobPost/JobPost";
import Auth from "./components/Auth/Auth";
import AllJobs from "./Pages/AllJob/AllJobs";
import DisplayJob from "./Pages/DisplayJob/DisplayJob";
import { JobContext } from "./Context/Context";
import CompanyProfile from "./Pages/Profile/CompanyProfile";
import EditCompany from "./Pages/Profile/EditCompany";

function App() {
  const { user } = JobContext();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {user && <Route path="/addJob" element={<JobPost />} />}
        {user && <Route path="/jobPosts" element={<AllJobs />} />}
        <Route path="/jobPosts/:id" element={<DisplayJob />} />
        <Route path="/companyProf/:id" element={<CompanyProfile />} />
        <Route path="/editCompany/:id" element={<EditCompany />} />
        <Route path="*" element={<Navigate to={!user ? "/" : "/"} />} />
      </Routes>
      <Footer />
      <Auth />
      <Message />
    </>
  );
}

export default App;
