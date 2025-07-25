// import { useState } from "react";
// import AddChore from "../components/AddChore/AddChore";

// function AddChorePage() {
//   const [chores, setChores] = useState([]);

//   const handleAddChore = (newChore) => {
//     setChores([...chores, newChore]);
//   };

//   return (
//     <div>
//       <AddChore onAddChore={handleAddChore} />
//       <ul>
//         {chores.map((chore, index) => (
//           <li key={index}>
//             {chore.choreName} - {chore.dueDate} - {chore.assignee}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default AddChorePage;
