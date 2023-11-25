import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/Pages/Welcome";
import Sigin from "./components/Pages/Sigin";
import Signout from "./components/Pages/Signout";
import Home from "./components/Pages/Home";
import Navbar from "./components/layout/Navbar";
import Signup from "./components/Pages/Signup";
import Profile from "./components/Pages/Profile";
import PrivateLayout from "./components/layout/PrivateLayout";
import Note from "./components/Pages/Note";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route path="" element={<Home />} />
          {/* <Route path="/welcome" element={<Welcome />} /> */}
          <Route path="/signin" element={<Sigin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signout" element={<Signout />} />
          <Route element={<PrivateLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="note/:id" element={<Note />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
