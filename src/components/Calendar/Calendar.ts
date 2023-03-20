import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import AppState from '../../constants/appState';
import { initStartDate, todayDate, minRangeDate } from '../../constants/common';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { ClassMap } from '../../constants/htmlConstants';
import { FormatDateString, LANG } from '../../types/types';
import createElement from '../../utils/createElement';
import calculationDateDifferense from '../../utils/calculationDateDifference';
import './Calendar.scss';

class Calendar {
  private lang: LANG;

  private calendarEl: HTMLElement | null = null;

  public calendarInput: HTMLInputElement | null = null;

  private buttons: HTMLElement | null = null;

  private parentElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.lang = AppState.lang;
  }

  public init() {
    this.calendarInput = createElement({
      tag: 'input',
      classList: [
        ClassMap.calendar.input,
      ],
    }) as HTMLInputElement;
    this.calendarInput.placeholder = Dictionary[this.lang].calendarInput;

    this.calendarInput.value = `${initStartDate} : ${todayDate}`;
    this.calendarInput.disabled = true;

    this.calendarEl = createElement({
      tag: 'div',
      classList: [
        ClassMap.calendar.body,
      ],
    });

    this.buttons = createElement({
      tag: 'div',
      classList: [
        ClassMap.calendar.buttons,
      ],
    });

    this.parentElement.append(this.calendarInput);
    this.parentElement.append(this.calendarEl);

    this.renderCalendar(this.calendarEl);

    this.parentElement.append(this.buttons);
    this.renderButtons(this.buttons);
  }

  public renderCalendar(parentElement: HTMLElement): void {
    const { calendarInput } = this;

    const calendar = new VanillaCalendar(parentElement, {
      date: {
        min: minRangeDate,
        max: todayDate,
      },
      settings: {
        lang: this.lang,
        selection: {
          day: 'multiple-ranged',
        },
      },
      actions: {
        clickDay(event, dates) {
          if (calendarInput && dates) {
            const d = dates.sort();
            AppState.startDate = d[0] as FormatDateString;
            AppState.endDate = (d[0] === d[d.length - 1] ? d[0] : d[d.length - 1]) as FormatDateString;

            calendarInput.value = (d[0] === d[d.length - 1]) ? d[0] : `${d[0]} : ${d[d.length - 1]}`;
            calendarInput.dispatchEvent(new Event('input'));
          }
        },
        clickMonth(event, month) {
          const monthInput = month + 1;

          const year = document.querySelector('.vanilla-calendar-year')?.getAttribute('data-calendar-selected-year');

          if (year) {
            switch (monthInput) {
              case 1:
              case 3:
              case 5:
              case 7:
              case 8:
                AppState.endDate = `${year}-0${monthInput}-31` as FormatDateString;
                break;

              case 10:
              case 12:
                AppState.endDate = `${year}-${monthInput}-31` as FormatDateString;
                break;

              case 2:
                AppState.endDate = (+year % 4 === 0 ? `${year}-0${monthInput}-29` : `${year}-0${monthInput}-28`) as FormatDateString;
                break;

              case 4:
              case 6:
              case 9:
                AppState.endDate = `${year}-0${monthInput}-30` as FormatDateString;
                break;

              case 11:
                AppState.endDate = `${year}-${monthInput}-30` as FormatDateString;
                break;

              default:
                // do nothing
            }
          }

          if (calendarInput && year && monthInput < 10) {
            AppState.startDate = `${year}-0${monthInput}-01` as FormatDateString;
            calendarInput.value = `${year}-0${monthInput}`;
            calendarInput.dispatchEvent(new Event('input'));
          } else if (calendarInput && year) {
            AppState.startDate = `${year}-${monthInput}-01` as FormatDateString;
            calendarInput.value = `${year}-${monthInput}`;
            calendarInput.dispatchEvent(new Event('input'));
          }
        },
        clickYear(event, year) {
          AppState.startDate = `${year}-01-01`;
          AppState.endDate = `${year}-12-31`;

          if (calendarInput) {
            calendarInput.value = `${year}`;
            calendarInput.dispatchEvent(new Event('input'));
          }
        },
      },
    });

    calendar.init();
  }

  private renderButtons(parentElement: HTMLElement) {
    const { calendarInput } = this;

    const lastYearButton = createElement({
      tag: 'button',
      classList: [ClassMap.calendar.button],
      key: DictionaryKeys.lastYear,
      content: Dictionary[this.lang].lastYear,
    }) as HTMLButtonElement;

    lastYearButton.addEventListener('click', () => {
      const startDate = calculationDateDifferense(new Date(), 365).toISOString().split('T')[0] as FormatDateString;

      AppState.startDate = startDate;
      AppState.endDate = todayDate;

      if (calendarInput) {
        calendarInput.value = `${startDate} : ${todayDate}`;
        calendarInput.dispatchEvent(new Event('input'));
      }
    });

    const lastThirtyDaysButton = createElement({
      tag: 'button',
      classList: [ClassMap.calendar.button],
      key: DictionaryKeys.lastThirtyDays,
      content: Dictionary[this.lang].lastThirtyDays,
    }) as HTMLButtonElement;

    lastThirtyDaysButton.addEventListener('click', () => {
      const startDate = calculationDateDifferense(new Date(), 30).toISOString().split('T')[0] as FormatDateString;

      AppState.startDate = startDate;
      AppState.endDate = todayDate;

      if (calendarInput) {
        calendarInput.value = `${startDate} : ${todayDate}`;
        calendarInput.dispatchEvent(new Event('input'));
      }
    });

    const currentMonthButton = createElement({
      tag: 'button',
      classList: [ClassMap.calendar.button],
      key: DictionaryKeys.currentMonth,
      content: Dictionary[this.lang].currentMonth,
    }) as HTMLButtonElement;

    const currentMonth = (`0${new Date().getMonth() + 1}`).slice(-2);

    currentMonthButton.addEventListener('click', () => {
      AppState.startDate = `${new Date().getFullYear()}-${currentMonth}-01` as FormatDateString;
      AppState.endDate = todayDate;

      if (calendarInput) {
        calendarInput.value = `${new Date().getFullYear()}-${currentMonth}-01 : ${todayDate}`;
        calendarInput.dispatchEvent(new Event('input'));
      }
    });

    const currentYearButton = createElement({
      tag: 'button',
      classList: [ClassMap.calendar.button],
      key: DictionaryKeys.currentYear,
      content: Dictionary[this.lang].currentYear,
    }) as HTMLButtonElement;

    currentYearButton.addEventListener('click', () => {
      AppState.startDate = `${new Date().getFullYear()}-01-01`;
      AppState.endDate = todayDate;

      if (calendarInput) {
        calendarInput.value = `${new Date().getFullYear()}-01-01 : ${todayDate}`;
        calendarInput.dispatchEvent(new Event('input'));
      }
    });

    const allTimeButton = createElement({
      tag: 'button',
      classList: [ClassMap.calendar.button],
      key: DictionaryKeys.allTime,
      content: Dictionary[this.lang].allTime,
    }) as HTMLButtonElement;

    allTimeButton.addEventListener('click', () => {
      AppState.startDate = minRangeDate;
      AppState.endDate = todayDate;

      if (calendarInput) {
        calendarInput.value = allTimeButton.innerText;
        calendarInput.dispatchEvent(new Event('input'));
      }
    });

    parentElement.append(allTimeButton);
    parentElement.append(lastThirtyDaysButton);
    parentElement.append(lastYearButton);
    parentElement.append(currentMonthButton);
    parentElement.append(currentYearButton);
  }
}

export default Calendar;
