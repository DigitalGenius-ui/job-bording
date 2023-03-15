import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Message from "./components/util/Alert/Message";
import { Routes, Route } from "react-router-dom";
import JobPost from "./Pages/AddJobPost/JobPost";
import Auth from "./components/Auth/Auth";
import AllJobs from "./Pages/DisplayJob/AllJobs";
import DisplayJob from "./Pages/DisplayJob/DisplayJob";
import { JobContext } from "./Context/Context";

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
      </Routes>
      <Footer />
      <Auth />
      <Message />
    </>
  );
}

export default App;
