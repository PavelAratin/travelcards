export const choiceBudget = (budgetLevel: string) => {
  if (budgetLevel === "low") return "Низкий";
  if (budgetLevel === "middle") return "Cредний";
  if (budgetLevel === "higher") return "Высокий";
};