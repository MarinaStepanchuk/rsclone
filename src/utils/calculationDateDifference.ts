function calculationDateDifferense(day: Date, days: number): Date {
  const date = new Date();
  date.setDate(day.getDate() - days);
  return date;
}

export default calculationDateDifferense;
