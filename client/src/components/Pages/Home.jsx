import React from "react";
import SidebarProject from "../layout/SidebarProject";
import AddProjectSection from "../layout/AddProjectSection";
import CreateNoteSections from "../layout/CreateNoteSections";

const Home = () => {
  return (
    <main className="flex">
      <SidebarProject />
      <CreateNoteSections />
      {/* <AddProjectSection /> */}
    </main>
  );
};

export default Home;
