/**
 * Add a number of days to a given date.
 * @param daysToAdd
 * @param startDate
 */
export const addDays = (
  daysToAdd: number,
  startDate: Date = new Date(),
): Date => {
  const result = new Date(startDate);
  result.setDate(result.getDate() + daysToAdd);
  return result;
};
