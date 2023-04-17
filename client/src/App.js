import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Message from "./components/util/Alert/Message";
import Subscribe from "./components/Home/Subscribe/Subscribe";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { JobContext } from "./Context/Context";
import { Suspense, lazy } from "react";
import Contact from "./Pages/Contact Us/Contact";

const Home = lazy(() => import("./components/Home/Home"));
const JobPost = lazy(() => import("./Pages/AddJobPost/JobPost"));
const AllJobs = lazy(() => import("./Pages/AllJob/AllJobs"));
const DisplayJob = lazy(() => import("./Pages/DisplayJob/DisplayJob"));
const Profile = lazy(() => import("./Pages/Profile/Employer/Profile"));

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
          {user && <Route path="/profile/:id" element={<Profile />} />}
          {<Route path="/contact" element={<Contact />} />}
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
  const route = window.location.pathname.split("/")[1];
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      {route !== "profile" && (
        <>
          <Subscribe />
          <Footer />
        </>
      )}
    </>
  );
};
