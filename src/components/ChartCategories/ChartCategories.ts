import Highcharts from 'highcharts';
import createElement from '../../utils/createElement';
import { chartColor, ClassMap, IdMap } from '../../constants/htmlConstants';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { IExpense, IFilterParams } from '../../types/interfaces';
import { LocalStorageKey } from '../../constants/common';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';

class ChartCategories {
  private schedule: HTMLElement | null = null;

  private lang: LANG;

  private modeValue: MODE;

  private categories: string[] = [];

  private expensesLine: number[] = [];

  constructor(private startDate: Date, private endDate: Date) {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
  }

  public async render() {
    const container = createElement({
      tag: 'div',
      classList: [ClassMap.analytic.chartCategoriesColumns.container, ClassMap.mode[this.modeValue].backgroundSection],
    });

    const sheduleTitle = createElement({
      tag: 'span',
      classList: [ClassMap.analytic.title, ClassMap.mode[this.modeValue].title],
      key: DictionaryKeys.chartCategoriesColumnsTitle,
      content: Dictionary[this.lang].chartCategoriesColumnsTitle,
    });

    this.schedule = createElement({
      tag: 'div',
      id: IdMap.chartCategoriesColumns,
    });

    container.append(sheduleTitle, this.schedule);

    const allExpenses = await this.getExpenses();

    const categoriesCollection: Set<string> = new Set();

    allExpenses.forEach((expense) => {
      categoriesCollection.add(expense.category);
    });

    this.categories = Array.from(categoriesCollection);

    this.expensesLine = this.categories.map((category) => {
      let sum = 0;
      allExpenses.forEach((expenses) => {
        if (expenses.category === category) {
          sum += expenses.expense;
        }
      });
      return sum;
    });

    return container;
  }

  public addChart() {
    Highcharts.chart(IdMap.chartCategoriesColumns, {
      chart: {
        type: 'column',
        backgroundColor: 'none',
        margin: [20, 40, 100, 80],
      },
      title: {
        text: undefined,
      },
      xAxis: {
        categories: this.categories,
        labels: {
          style: {
            color: chartColor.text,
          },
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
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
      plotOptions: {
        series: {
          allowPointSelect: true,
        },
      },
      series: [{
        type: 'column',
        name: 'Expenses',
        borderColor: chartColor.dark,
        color: chartColor.dark,
        borderRadius: 5,
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

export default ChartCategories;
