import Auth from "./components/Auth/Auth";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Message from "./components/util/Alert/Message";

function App() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
      <Auth />
      <Message />
    </>
  );
}

export default App;
