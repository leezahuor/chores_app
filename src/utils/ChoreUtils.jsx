// Helper function used in ChoreItem.jsx to calculate a new date.
// Used to find a new due date and reminder date for a reoccurring chore.
export function getNextDate(current, frequency) {
  const newDueDate = new Date(current);

  if (frequency === "daily") newDueDate.setDate(newDueDate.getDate() + 1);
  if (frequency === "weekly") newDueDate.setDate(newDueDate.getDate() + 7);
  if (frequency === "monthly") newDueDate.setDate(newDueDate.getDate() + 28);

  return newDueDate.toISOString().split("T")[0];
}

// Helper function used in ChoreItem.jsx to assign new assignee for a chore item.
export function getNextAssignee(currentAssignee) {
  const assigneesList = ["Leeza", "Amanda", "Josh", "Sesame"];
  const idx = assigneesList.indexOf(currentAssignee);

  if (idx === -1) return assigneesList[0];

  return assigneesList[(idx + 1) % assigneesList.length];
}

// Helper function used to reformat date as a MM/DD/YYYY string to keep dates consistent
export function formatDisplayDate(dateString) {
  if (!dateString || typeof dateString !== "string") {
    console.warn("Date must be a string", dateString);
    return "";
  }
  const [year, month, day] = dateString.split("-");
  return `${month}/${day}/${year}`;
}

// Helper function to get late chores by comparing their due dates with current due date
export function getLateChores(chores = []) {
  const today = new Date();
  return chores.map((chore) => {
    let dueDate = chore.dueDate ? new Date(chore.dueDate) : null;
    return {
      ...chore,
      isLate: dueDate ? dueDate < today : false,
    };
  });
}

// Helper function to push late chores to top of list
export function sortLateChoresFirst(chores = []) {
  return [...chores].sort((a, b) => {
    if (a.isLate && !b.isLate) return -1;
    if (!a.isLate && b.isLate) return 1;
    return 0;
  });
}

// Helper function to assign chores as late
export function isChoreLate(chore) {
  if (!chore.dueDate) return false;
  const today = new Date();
  const due = new Date(chore.dueDate);
  return due < today;
}
