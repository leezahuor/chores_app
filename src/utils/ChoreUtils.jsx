// Helper function used in ChoreItem.jsx to calculate a new date.
// Used to find a new due date and reminder date for a reoccurring chore.
export function getNextDate(current, frequency) {
  const newDueDate = new Date(current);

  if (frequency === "daily") newDueDate.setDate(newDueDate.getDate() + 1);
  if (frequency === "weekly") newDueDate.setDate(newDueDate.getDate() + 7);
  if (frequency === "monthly") newDueDate.setDate(newDueDate.getDate() + 28);

  // ✅ Return as YYYY-MM-DD string (no timezones, no Date object)
  return newDueDate.toISOString().split("T")[0];
}

// Helper function used in ChoreItem.jsx to assign new assignee for a chore item.
export function getNextAssignee(currentAssignee) {
  const assigneesList = ["Leeza", "Amanda", "Josh", "Sesame"];
  const idx = assigneesList.indexOf(currentAssignee);

  if (idx === -1) return assigneesList[0];

  return assigneesList[(idx + 1) % assigneesList.length];
}

export function formatDisplayDate(dateString) {
  if (!dateString || typeof dateString !== "string") {
    console.warn("Date must be a string", dateString);
    return "";
  }
  const [year, month, day] = dateString.split("-");
  return `${month}/${day}/${year}`;
}
