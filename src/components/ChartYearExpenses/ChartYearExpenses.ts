import './ChartYearExpenses.scss';
import Highcharts from 'highcharts';
import createElement from '../../utils/createElement';
import { ClassMap, Id } from '../../constants/htmlConstants';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { IExpense } from '../../types/interfaces';
import { LocalStorageKey } from '../../constants/common';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';

interface IСhartLine {
  date: Date,
  sum: number,
}

class ChartYearExpenses {
  private schedule: HTMLElement | null = null;

  private coordinatesExpenses: number[][] = [];

  private lang: LANG;

  private modeValue: MODE;

  constructor() {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
  }

  public async render() {
    const container = createElement({
      tag: 'div',
      classList: [ClassMap.analytic.chartYearExpenses.container],
    });

    const sheduleTitle = createElement({
      tag: 'span',
      classList: [ClassMap.analytic.title, ClassMap.mode[this.modeValue].title],
      key: DictionaryKeys.chartYearExpensesTitle,
      content: Dictionary[this.lang].chartYearExpensesTitle,
    });

    this.schedule = createElement({
      tag: 'div',
      id: Id.chartYearExpenses,
    });

    container.append(sheduleTitle, this.schedule);

    const allExpenses = await this.getAllExpenses();

    const endTime = new Date();
    const startTime = new Date(new Date().setFullYear(endTime.getFullYear() - 1));

    const expenses = allExpenses.filter((item) => new Date(item.date).getTime() >= startTime.getTime() && new Date(item.date).getTime() <= endTime.getTime());
    expenses.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const unitedExpenses: IСhartLine[] = [];
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

    unitedExpenses.forEach((item: IСhartLine) => {
      const day = item.date.getDate();
      const month = item.date.getMonth();
      const year = item.date.getFullYear();
      this.coordinatesExpenses.push([Date.UTC(year, month, day), item.sum]);
    });

    return container;
  }

  public addChart() {
    Highcharts.chart(Id.chartYearExpenses, {
      title: {
        text: undefined;
      },
      xAxis: {
        type: 'datetime',
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
        },
      },
      series: [{
        type: 'line',
        name: 'Expenses',
        data: this.coordinatesExpenses,
      }],
    }, () => {});
  }

  private async getAllExpenses() {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const expensesData: IExpense[] = await RequestApi.getAll(Endpoint.EXPENSE, userToken);

    return expensesData;
  }
}

export default ChartYearExpenses;
