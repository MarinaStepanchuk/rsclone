import Highcharts from 'highcharts';
import createElement from '../../utils/createElement';
import { chartColor, ClassMap, IdMap } from '../../constants/htmlConstants';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { IExpense, IFilterParams, IIncome } from '../../types/interfaces';
import { LocalStorageKey } from '../../constants/common';
import { Dictionary, DictionaryKeys } from '../../constants/dictionary';
import { LANG, MODE } from '../../types/types';
import AppState from '../../constants/appState';

interface IChartLine {
  x: number,
  y: number,
}

class ChartMonthlyExpIncom {
  private schedule: HTMLElement | null = null;

  private lang: LANG;

  private modeValue: MODE;

  private expensesLine: IChartLine[] = [];

  private incomesLine: IChartLine[] = [];

  constructor(private startDate: Date, private endDate: Date) {
    this.modeValue = AppState.modeValue;
    this.lang = AppState.lang;
  }

  public async render() {
    const container = createElement({
      tag: 'div',
      classList: [ClassMap.analytic.chartMonthlyExpIncom.container, ClassMap.mode[this.modeValue].backgroundSection],
    });

    const sheduleTitle = createElement({
      tag: 'span',
      classList: [ClassMap.analytic.title, ClassMap.mode[this.modeValue].title],
      key: DictionaryKeys.chartMonthlyExpensesTitle,
      content: Dictionary[this.lang].chartMonthlyExpensesTitle,
    });

    this.schedule = createElement({
      tag: 'div',
      id: IdMap.chartMonthlyExpIncom,
    });

    container.append(sheduleTitle, this.schedule);

    const months = [];
    let time = new Date(this.startDate);
    while (time.getTime() < this.endDate.getTime()) {
      months.push(new Date(time.setDate(1)));
      time = new Date(time.setMonth(time.getMonth() + 1));
    }

    const allExpenses = await this.getExpenses();

    this.expensesLine = months.map((date) => {
      let sum = 0;
      allExpenses.forEach((expenses) => {
        if (new Date(expenses.date).getFullYear() === date.getFullYear() && new Date(expenses.date).getMonth() === date.getMonth()) {
          sum += expenses.expense;
        }
      });
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      return {
        x: Date.UTC(year, month, day),
        y: sum,
      };
    });

    const allIncomes = await this.getIncomes();

    this.incomesLine = months.map((date) => {
      let sum = 0;
      allIncomes.forEach((income) => {
        if (new Date(income.date).getFullYear() === date.getFullYear() && new Date(income.date).getMonth() === date.getMonth()) {
          sum += income.income;
        }
      });
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      return {
        x: Date.UTC(year, month, day),
        y: sum,
      };
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

    Highcharts.chart(IdMap.chartMonthlyExpIncom, {
      title: {
        text: undefined,
      },
      chart: {
        type: 'column',
        backgroundColor: 'none',
        margin: [20, 40, 100, 80],
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        type: 'datetime',
        labels: {
          style: {
            color: chartColor.text,
          },
        },
        tickInterval: 2592000000,
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
      legend: {
        itemStyle: {
          color: chartColor.text,
          fontWeight: 'normal',
        },
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
      }, {
        type: 'column',
        name: 'Incomes',
        borderColor: chartColor.light,
        color: chartColor.light,
        borderRadius: 5,
        data: this.incomesLine,
      }],
    }, () => {});
  }

  private async getExpenses(): Promise<IExpense[]> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;
    console.log(this.startDate)
    const params: IFilterParams = {
      startDate: this.startDate.toISOString().split('T')[0],
      endDate: this.endDate.toISOString().split('T')[0],
    };

    const expensesData: IExpense[] = await RequestApi.getFiltered(Endpoint.EXPENSE, userToken, params);

    return expensesData;
  }

  private async getIncomes(): Promise<IIncome[]> {
    const userToken = JSON.parse(localStorage.getItem(LocalStorageKey.auth) as string).token;

    const params: IFilterParams = {
      startDate: this.startDate.toISOString().split('T')[0],
      endDate: this.endDate.toISOString().split('T')[0],
    };

    const incomesData: IIncome[] = await RequestApi.getFiltered(Endpoint.INCOME, userToken, params);

    return incomesData;
  }
}

export default ChartMonthlyExpIncom;
