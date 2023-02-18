import './ChartYearIncomes.scss';
import Highcharts from 'highcharts';
import createElement from '../../utils/createElement';
import { ClassMap, } from '../../constants/htmlConstants';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { IExpense, IIncome } from '../../types/interfaces';
import { LocalStorageKey } from '../../constants/common';
import { LANG } from '../../types/types';
import AppState from '../../constants/appState';
import { Dictionary } from '../../constants/dictionary';

interface IСhartLine {
  type?: string
  date: Date,
  sum: number,
}

class ChartYearIncomes {
  private schedule: HTMLElement | null = null;

  private coordinatesIncomes: number[][] = [];

  private lang: LANG;

  constructor() {
    this.lang = AppState.lang;
  }

  public async render() {
    const container = createElement({
      tag: 'div',
      classList: [ClassMap.analytic.chartYearExpenses.container]
    });

    this.schedule = createElement({
      tag: 'div',
      id: Id.chartYearIncomes,
    });

    container.append(this.schedule);

    this.schedule.style.width = '100%';
    this.schedule.style.height = '100%';

    this.getAllIncomes();
    this.getAllExpenses();
    const allIncomes = await this.getAllIncomes();
    const allExpenses = await this.getAllExpenses();

    const end = new Date();
    const start = new Date(new Date().setFullYear(end.getFullYear() - 1));

    const expenses = allExpenses.filter((item) => new Date(item.date).getTime() >= start.getTime() && new Date(item.date).getTime() <= end.getTime());
    expenses.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const filterExpenses: IСhartLine[] = [];
    expenses.forEach((item) => {
      const coincidence = filterExpenses.find((element) => element.date.getDate() === new Date(item.date).getDate() && element.date.getMonth() === new Date(item.date).getMonth() && element.date.getFullYear() === new Date(item.date).getFullYear());
      if (coincidence) {
        coincidence.sum += item.expense;
      } else {
        filterExpenses.push({
          type: 'expense',
          date: new Date(item.date),
          sum: item.expense,
        });
      }
    });

    const incomes = allIncomes.filter((item) => new Date(item.date).getTime() >= start.getTime() && new Date(item.date).getTime() <= end.getTime());
    incomes.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const filterIncomes: IСhartLine[] = [];
    incomes.forEach((item) => {
      const coincidence = filterIncomes.find((element) => element.date.getDate() === new Date(item.date).getDate() && element.date.getMonth() === new Date(item.date).getMonth() && element.date.getFullYear() === new Date(item.date).getFullYear());
      if (coincidence) {
        coincidence.sum += item.income;
      } else {
        filterIncomes.push({
          type: 'income',
          date: new Date(item.date),
          sum: item.income,
        });
      }
    });

    // const coordinatesIncomes: number[][] = [];
    // const coordinatesExpenses: number[][] = [];

    // filterExpenses.forEach((item: IСhartLine) => {
    //   const day = item.date.getDate();
    //   const month = item.date.getMonth();
    //   const year = item.date.getFullYear();
    //   this.coordinatesExpenses.push([Date.UTC(year, month, day), item.sum]);
    // });

    filterIncomes.forEach((item: IСhartLine) => {
      const day = item.date.getDate();
      const month = item.date.getMonth();
      const year = item.date.getFullYear();
      this.coordinatesIncomes.push([Date.UTC(year, month, day), item.sum]);
    });

    return container;
  }

  public addChart() {
    Highcharts.chart(Id.chartYearIncomes, {
      title: {
        text: 'Schedule of expenses and income for the entire period',
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
        name: Dictionary[this.lang].expenses,
        data: this.coordinatesIncomes,
      }],
    }, () => {});
  }

  private async getAllIncomes() {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const incomesData: IIncome[] = await RequestApi.getAll(Endpoint.INCOME, userToken as string);

    return incomesData;
  }

  private async getAllExpenses() {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    const expensesData: IExpense[] = await RequestApi.getAll(Endpoint.EXPENSE, userToken);

    return expensesData;
  }
}

export default ChartYearIncomes;
