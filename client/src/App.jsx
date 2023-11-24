import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/Pages/Welcome";
import Sigin from "./components/Pages/Sigin";
import Signout from "./components/Pages/Signout";
import Home from "./components/Pages/Home";
import Navbar from "./components/layout/Navbar";
import Signup from "./components/Pages/Signup";
import Profile from "./components/Pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route path="" element={<Home />}></Route>
          <Route path="/welcome" element={<Welcome />}></Route>
          <Route path="/signin" element={<Sigin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signout" element={<Signout />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
