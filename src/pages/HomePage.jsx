import ChoreList from "../components/ChoreList/ChoreList";

function HomePage({ chores, onShowModal }) {
  return (
    <div className="home-container">
      <button onClick={onShowModal}>Add Chore</button>
      <ChoreList chores={chores} />
    </div>
  );
}

export default HomePage;
