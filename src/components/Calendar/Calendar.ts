import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import createElement from '../../utils/createElement';
import './Calendar.scss';

type OneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type ZeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type MM = `0${OneToNine}` | `1${0 | 1 | 2}`;
type DD = `${0}${OneToNine}` | `${1 | 2}${ZeroToNine}` | `3${0 | 1}`;
type FormatDateString = `${number}-${MM}-${DD}`;

const minRangeDate: FormatDateString = '2000-01-01';
const maxRangeDate: FormatDateString = new Date().toISOString().split('T')[0] as FormatDateString;

class Calendar {
  private calendarEl: HTMLElement | null = null;

  public render(parentElement: HTMLElement): void {
    const calendarInput = createElement({
      tag: 'input',
      classList: [
        'calendar__input',
      ],
    }) as HTMLInputElement;

    this.calendarEl = createElement({
      tag: 'div',
      classList: [
        'calendar__body',
      ],
    });

    parentElement.append(calendarInput);
    parentElement.append(this.calendarEl);

    const calendar = new VanillaCalendar(this.calendarEl, {
      date: {
        min: minRangeDate,
        max: maxRangeDate,
      },
      actions: {
        clickDay(event, dates) {
          if (dates) {
            const d = dates.sort();
            const datesRange = (d[0] === d.at(-1)) ? d[0] : `${d[0]} - ${d.at(-1)}`;
            calendarInput.value = datesRange;
          }
        },
        clickMonth() {
          const monthValue = document.querySelector('.vanilla-calendar-month')?.textContent;
          const year = document.querySelector('.vanilla-calendar-year')?.getAttribute('data-calendar-selected-year');
          calendarInput.value = `${monthValue} ${year}`;
        },
        clickYear(event, year) {
          calendarInput.value = `${year}`;
        },
      },
      settings: {
        selection: {
          day: 'multiple-ranged',
        },
      },
    });
    calendar.init();

    const nodes = this.calendarEl.children;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].classList.add('111');
    }
  }
}

export default Calendar;
