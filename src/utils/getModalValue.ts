import { ClassMap, IdMap } from '../constants/htmlConstants';

export function getSelectedValue(id: string): string {
  const selectElem = document.querySelector(`#${id}`) as HTMLSelectElement;
  return selectElem.value;
}

export function getDateValue(): Date {
  const dateElem = document.querySelector(`#${IdMap.dateValue}`) as HTMLInputElement;
  const date = dateElem.value ? new Date(dateElem.value) : new Date();
  date.setHours(new Date().getHours());
  date.setMinutes(new Date().getMinutes());
  date.setSeconds(new Date().getSeconds());

  return date;
}

export function getSum(): number {
  const sumInput = document.querySelector(`#${IdMap.sumInput}`) as HTMLInputElement;
  return Number(sumInput.value);
}

export function getComment(): string {
  const commentElem = document.querySelector(`.${ClassMap.dashboard.formTextarea}`) as HTMLTextAreaElement;
  const commentText = commentElem?.value;

  return commentText;
}
