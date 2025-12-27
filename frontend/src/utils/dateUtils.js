// Format date to readable string
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN");
};

// Add days to a date
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
