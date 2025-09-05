export function getNextDate(current, frequency) {
  const newDueDate = new Date(current);
  if (frequency === "daily") newDueDate.setDate(newDueDate.getDate() + 1);
  if (frequency === "weekly") newDueDate.setDate(newDueDate.getDate() + 7);
  if (frequency === "monthly") newDueDate.setDate(newDueDate.getDate() + 28);
  return newDueDate;
}

export function getNextAssignee(currentAssignee) {
  const assigneesList = ["Leeza", "Amanda", "Josh", "Sesame"];
  const idx = assigneesList.indexOf(currentAssignee);

  if (idx === -1) return assigneesList[0];

  return assigneesList[(idx + 1) % assigneesList.length];
}
