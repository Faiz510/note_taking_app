import React, { useState } from "react";
import SidebarProject from "../layout/SidebarProject";
import AddProjectSection from "../layout/AddProjectSection";
import CreateNoteSections from "../layout/CreateNoteSections";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Welcome from "./Welcome";

const Home = () => {
  const [showAddNotes, setShowAddNotes] = useState(false);
  const navigate = useNavigate();
  // show notes edit page
  const addNotesHandler = () => setShowAddNotes(() => !showAddNotes);
  // current state
  const currentUser = useSelector((state) => state.user.user.currentUser);
  // if user is not logout
  // if (!currentUser) return navigate("/welcome");

  return (
    <>
      {!currentUser ? (
        <Welcome />
      ) : (
        <main className="flex">
          <SidebarProject showAddNotes={setShowAddNotes} />

          {showAddNotes ? (
            <CreateNoteSections showAddNotes={addNotesHandler} />
          ) : (
            <AddProjectSection showAddNotes={addNotesHandler} />
          )}
        </main>
      )}
    </>
  );
};

export default Home;
