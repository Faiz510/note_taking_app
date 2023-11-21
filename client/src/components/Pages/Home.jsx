import React, { useState } from "react";
import SidebarProject from "../layout/SidebarProject";
import AddProjectSection from "../layout/AddProjectSection";
import CreateNoteSections from "../layout/CreateNoteSections";

const Home = () => {
  const [showAddNotes, setShowAddNotes] = useState(false);
  const [notes, setNotes] = useState({
    user: {
      notes: [],
    },
  });

  const addNotesHandler = () => {
    setShowAddNotes(() => !showAddNotes);
  };

  return (
    <main className="flex">
      <SidebarProject showAddNotes={setShowAddNotes} />

      {showAddNotes ? (
        <CreateNoteSections showAddNotes={addNotesHandler} />
      ) : (
        <AddProjectSection showAddNotes={addNotesHandler} />
      )}
    </main>
  );
};

export default Home;
