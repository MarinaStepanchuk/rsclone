export function createDateValue(date: Date): string {
  const currDate = new Date(date);

  const year = currDate.getFullYear();
  const month = currDate.getMonth() + 1;
  const day = currDate.getDate();
  const currFullDate = `${year}-${month.toString().padStart(2, '0')}-${day}`;

  return currFullDate;
}
