import "./ChoreList.css";

// Sample data for the chore list
const sampleChores = [
  {
    name: "Take out the trash",
    dueDate: "2025-07-20",
    assignee: "Josh",
  },
  {
    name: "Vacuum living room",
    dueDate: "2025-07-18",
    assignee: "Leeza",
  },
  {
    name: "Wash dishes",
    dueDate: "2025-07-17",
    assignee: "Amanda",
  },
];

// Empty sample data to pass to test that chore empty message works
const sampleChores2 =[];

function ChoreList() {
  const chores = sampleChores;

  return (
    <div className="chore-list-container">
      <h2 className="chore-list-title">Chores</h2>
      <div className="chore-list-scroll">
        {/* If chore list is empty, display empty message, otherwise create chore cards */}
        {chores.length === 0 ? (
          <p className="chore-empty-message">No chores to display</p>
        ) : (
          chores.map((chore, index) => (
            <div className="chore-card" key={index}>
              <div className="chore-name">{chore.name}</div>
              <div className="chore-info">
                <span>Due: {new Date(chore.dueDate).toLocaleDateString()}</span>
                <span>Assigned to: {chore.assignee}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ChoreList;
