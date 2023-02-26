import Highcharts from 'highcharts';
import createElement from '../../utils/createElement';
import { chartColor, ClassMap, IdMap } from '../../constants/htmlConstants';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { IExpense } from '../../types/interfaces';
import { LocalStorageKey } from '../../constants/common';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';
import calculateTrendline from '../../utils/calculateTrendline';

interface IChartLine {
  date: Date,
  sum: number,
}

class ChartDailyExpenses {
  private schedule: HTMLElement | null = null;

  private coordinatesExpenses: number[][] = [];

  private line: number[][] = [];

  private lang: LANG;

  private modeValue: MODE;

  constructor(private startDate: Date, private endDate: Date) {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
  }

  public async render() {
    const container = createElement({
      tag: 'div',
      classList: [ClassMap.analytic.chartYearExpenses.container, ClassMap.mode[this.modeValue].backgroundSection],
    });

    const sheduleTitle = createElement({
      tag: 'span',
      classList: [ClassMap.analytic.title, ClassMap.mode[this.modeValue].title],
      key: DictionaryKeys.chartDailyExpensesTitle,
      content: Dictionary[this.lang].chartDailyExpensesTitle,
    });

    this.schedule = createElement({
      tag: 'div',
      id: IdMap.chartDailyExpenses,
    });

    container.append(sheduleTitle, this.schedule);

    const allExpenses = await this.getAllExpenses();

    const expenses = allExpenses.filter((item) => new Date(item.date).getTime() >= this.startDate.getTime() && new Date(item.date).getTime() <= this.endDate.getTime());
    expenses.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const unitedExpenses: IChartLine[] = [];
    expenses.forEach((item) => {
      const coincidence = unitedExpenses.find((element) => element.date.getDate() === new Date(item.date).getDate() && element.date.getMonth() === new Date(item.date).getMonth() && element.date.getFullYear() === new Date(item.date).getFullYear());
      if (coincidence) {
        coincidence.sum += item.expense;
      } else {
        unitedExpenses.push({
          date: new Date(item.date),
          sum: item.expense,
        });
      }
    });

    unitedExpenses.forEach((item: IChartLine) => {
      const day = item.date.getDate();
      const month = item.date.getMonth();
      const year = item.date.getFullYear();
      this.coordinatesExpenses.push([Date.UTC(year, month, day), item.sum]);
    });

    const trendLine = calculateTrendline(this.coordinatesExpenses, 0, 1);

    this.coordinatesExpenses.forEach((item) => {
      this.line.push([item[0], trendLine.calcY(item[0])]);
    });

    return container;
  }

  public addChart() {
    if (this.lang === 'RU') {
      Highcharts.setOptions({
        lang: {
          loading: 'Загрузка...',
          months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
          shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
        },
      });
    }

    if (this.lang === 'DE') {
      Highcharts.setOptions({
        lang: {
          loading: 'Daten werden geladen...',
          months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
          weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
          shortMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        },
      });
    }

    Highcharts.chart(IdMap.chartDailyExpenses, {
      title: {
        text: undefined,
      },
      chart: {
        backgroundColor: 'none',
        margin: [20, 40, 50, 80],
      },
      xAxis: {
        type: 'datetime',
        labels: {
          style: {
            color: chartColor.text,
          },
        },
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: null,
        },
        labels: {
          style: {
            color: chartColor.text,
          },
        },
        gridLineColor: chartColor.text,
      },
      series: [{
        type: 'area',
        name: 'Expenses',
        data: this.coordinatesExpenses,
        color: chartColor.dark,
        fillColor: {
          linearGradient: {
            x1: 0, x2: 0, y1: 0, y2: 1,
          },
          stops: [
            [0, chartColor.startGradient],
            [1, chartColor.endGradient],
          ],
        },
      },
      {
        type: 'line',
        name: 'Trend Line',
        data: this.line,
      }],
    }, () => {});
  }

  private async getAllExpenses() {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const expensesData: IExpense[] = await RequestApi.getAll(Endpoint.EXPENSE, userToken);

    return expensesData;
  }
}

export default ChartDailyExpenses;
