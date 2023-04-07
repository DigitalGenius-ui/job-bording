import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Message from "./components/util/Alert/Message";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { JobContext } from "./Context/Context";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./components/Home/Home"));
const JobPost = lazy(() => import("./Pages/AddJobPost/JobPost"));
const AllJobs = lazy(() => import("./Pages/AllJob/AllJobs"));
const DisplayJob = lazy(() => import("./Pages/DisplayJob/DisplayJob"));
const CompanyProfile = lazy(() =>
  import("./Pages/Profile/Employer/CompanyProfile")
);
const EditCompany = lazy(() =>
  import("./Pages/Profile/Employer/EditProfile/EditCompany")
);

function App() {
  const { user } = JobContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<HeadWrapper />}>
          <Route path="/" element={<Home />} />
          {user && <Route path="/addJob" element={<JobPost />} />}
          {user && <Route path="/jobPosts" element={<AllJobs />} />}
          <Route path="/jobPosts/:id" element={<DisplayJob />} />
          <Route path="/companyProf/:id" element={<CompanyProfile />} />
          <Route path="/editCompany/:id" element={<EditCompany />} />
          <Route path="*" element={<Navigate to={!user ? "/" : "/"} />} />
        </Route>
      </Routes>
      <Auth />
      <Message />
    </>
  );
}

export default App;

const HeadWrapper = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};
