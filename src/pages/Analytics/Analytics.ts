import '../../styles/main.scss';
import './Analytics.scss';
import Highcharts from 'highcharts';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import RequestApi from '../../Api/RequestsApi';
import { Endpoint } from '../../Api/serverConstants';
import { IExpense, IIncome } from '../../types/interfaces';
import { LocalStorageKey } from '../../constants/common';
import ChartYearExpenses from '../../components/ChartYearExpenses/ChartYearExpenses';
import ChartYearIncomes from '../../components/ChartYearIncomes/ChartYearIncomes';

interface IСhartLine {
  type?: string
  date: Date,
  sum: number,
}

class Analytics extends BasePage {
  private chartYearExpenses: ChartYearExpenses;

  private chartYearIncomes: ChartYearIncomes;

  constructor() {
    super();
    this.chartYearExpenses = new ChartYearExpenses();
    this.chartYearIncomes = new ChartYearIncomes();
  }

  public async render(): Promise<void> {
    this.createPageStructure(Route.ANALYTICS);

    const mainContent = document.querySelector(`.${ClassMap.mainContent}`);

    const yearExpenses = await this.chartYearExpenses.render();
    const yearIncomes = await this.chartYearIncomes.render();

    mainContent?.replaceChildren(yearExpenses, yearIncomes);

    this.chartYearExpenses.addChart();
    this.chartYearIncomes.addChart();
  }
}

export default Analytics;
