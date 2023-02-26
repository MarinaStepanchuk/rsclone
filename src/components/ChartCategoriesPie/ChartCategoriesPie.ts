import Highcharts, { Color } from 'highcharts';
import createElement from '../../utils/createElement';
import { chartColor, IdMap } from '../../constants/htmlConstants';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { IExpense, IFilterParams } from '../../types/interfaces';
import { LocalStorageKey } from '../../constants/common';
import { LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';

interface ICartLine {
  name: string,
  y: number,
}

class ChartCategoriesPie {
  private schedule: HTMLElement | null = null;

  private lang: LANG;

  private modeValue: MODE;

  private expensesLine: ICartLine[] = [];

  constructor(private startDate: Date, private endDate: Date) {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
  }

  public async render() {
    this.schedule = createElement({
      tag: 'div',
      id: IdMap.chartCategoriesPie,
    });

    const allExpenses = await this.getExpenses();

    const categoriesCollection: Set<string> = new Set();

    allExpenses.forEach((expense) => {
      categoriesCollection.add(expense.category);
    });

    const categories = Array.from(categoriesCollection);

    this.expensesLine = categories.map((category) => {
      let sum = 0;
      allExpenses.forEach((expenses) => {
        if (expenses.category === category) {
          sum += expenses.expense;
        }
      });
      return {
        name: category,
        y: sum,
      };
    });

    return this.schedule;
  }

  public addChart() {
    const pieColors = (function () {
      const colors = [];
      const base = chartColor.dark;
      let i;

      for (i = 0; i < 10; i += 1) {
        colors.push(new Color(base).brighten((i - 4) / 7).get());
      }
      return colors;
    }());

    Highcharts.chart(IdMap.chartCategoriesPie, {
      chart: {
        type: 'pie',
        backgroundColor: 'none',
        margin: [0, 0, 0, 0],
      },
      credits: {
        enabled: false,
      },
      title: {
        text: undefined,
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          colors: pieColors,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [{
        type: 'pie',
        data: this.expensesLine,
      }],
    }, () => {});
  }

  private async getExpenses(): Promise<IExpense[]> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;

    const params: IFilterParams = {
      startDate: this.startDate.toISOString().split('T')[0],
      endDate: this.endDate.toISOString().split('T')[0],
    };

    const expensesData: IExpense[] = await RequestApi.getFiltered(Endpoint.EXPENSE, userToken, params);

    return expensesData;
  }
}

export default ChartCategoriesPie;
