import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Message from "./components/util/Alert/Message";
import { Routes, Route } from "react-router-dom";
import JobPost from "./Pages/JobPost/JobPost";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobpost" element={<JobPost />} />
      </Routes>
      <Footer />
      <Message />
    </>
  );
}

export default App;
