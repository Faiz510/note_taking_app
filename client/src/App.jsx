import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/Pages/Welcome";
import Sigin from "./components/Pages/Sigin";
import Signout from "./components/Pages/Signout";
import Home from "./components/Pages/Home";
import Navbar from "./components/layout/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route path="" element={<Home />}></Route>
          <Route path="/welcome" element={<Welcome />}></Route>
          <Route path="/signin" element={<Sigin />}></Route>
          <Route path="/signin" element={<Signout />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
