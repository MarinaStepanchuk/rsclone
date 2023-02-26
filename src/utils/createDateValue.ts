export default function createDateValue(date: Date): string {
  const currDate = new Date(date).toISOString().split('T')[0];

  return currDate;
}
