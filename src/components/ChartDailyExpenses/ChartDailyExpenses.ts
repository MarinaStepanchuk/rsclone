import './ChartDailyExpenses.scss';
import Highcharts from 'highcharts';
import createElement from '../../utils/createElement';
import { ClassMap, IdMap } from '../../constants/htmlConstants';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { IExpense } from '../../types/interfaces';
import { LocalStorageKey } from '../../constants/common';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';

interface IChartLine {
  date: Date,
  sum: number,
}

class ChartDailyExpenses {
  private schedule: HTMLElement | null = null;

  private coordinatesExpenses: number[][] = [];

  private lang: LANG;

  private modeValue: MODE;

  constructor(private startDate: Date, private endDate: Date) {
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

    return container;
  }

  public addChart() {
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
            color: '#ffffff',
          },
        },
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
            color: '#ffffff',
          },
        },
        gridLineColor: '#ffffff',
      },
      series: [{
        type: 'area',
        name: 'Expenses',
        data: this.coordinatesExpenses,
        color: '#5063BF',
        fillColor: {
          linearGradient: {
            x1: 0, x2: 0, y1: 0, y2: 1,
          },
          stops: [
            [0, '#6876bb'],
            [1, 'rgba(231, 235, 255, 0)'],
          ],
        },
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
