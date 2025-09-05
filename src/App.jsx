import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import AddChore from "./components/AddChore/AddChore";
import Modal from "./components/Modal/Modal";
import { useState } from "react";

function App() {
  const [chores, setChores] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddChore = (newChore) => {
    setChores([...chores, { ...newChore, completed: false }]);
    setShowModal(false);
  };

  return (
    <>
      <div>
        <HomePage
          chores={chores}
          setChores={setChores}
          onShowModal={() => setShowModal(true)}
        />

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AddChore onAddChore={handleAddChore} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
