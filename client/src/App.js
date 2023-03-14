import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Message from "./components/util/Alert/Message";
import { Routes, Route } from "react-router-dom";
import JobPost from "./Pages/AddJobPost/JobPost";
import Auth from "./components/Auth/Auth";
import DisplayJob from "./Pages/DisplayJob/DisplayJob";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addJob" element={<JobPost />} />
        <Route path="/jobPosts" element={<DisplayJob />} />
      </Routes>
      <Footer />
      <Auth />
      <Message />
    </>
  );
}

export default App;
